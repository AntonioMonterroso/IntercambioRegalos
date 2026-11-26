create table if not exists public.intercambios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 1 and 80),
  presupuesto numeric(10,2) not null default 100 check (presupuesto > 0 and presupuesto < 100000),
  fecha timestamptz,
  lugar text check (lugar is null or char_length(lugar) <= 160),
  nota text check (nota is null or char_length(nota) <= 500),
  codigo_admin text not null unique,
  sorteado_en timestamptz,
  creado_en timestamptz not null default now()
);

create table if not exists public.participantes (
  id uuid primary key default gen_random_uuid(),
  intercambio_id uuid not null references public.intercambios(id) on delete cascade,
  nombre text not null check (char_length(nombre) between 1 and 60),
  codigo text not null unique,
  deseos text not null default '' check (char_length(deseos) <= 1500),
  ya_compro boolean not null default false,
  regala_a uuid references public.participantes(id) on delete set null,
  creado_en timestamptz not null default now()
);

create unique index if not exists participantes_nombre_unico on public.participantes (intercambio_id, lower(nombre));
create index if not exists participantes_intercambio on public.participantes (intercambio_id);

alter table public.intercambios enable row level security;
alter table public.participantes enable row level security;
revoke all on table public.intercambios from anon, authenticated;
revoke all on table public.participantes from anon, authenticated;

create or replace function public.ir_codigo(n int)
returns text
language plpgsql
volatile
set search_path = public
as $$
declare
  b bytea := decode(replace(gen_random_uuid()::text, '-', ''), 'hex');
  a text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  r text := '';
  i int;
  k int;
begin
  for i in 0..n - 1 loop
    k := case when i < 6 then i else i + 4 end;
    r := r || substr(a, 1 + (get_byte(b, k) % 31), 1);
  end loop;
  return r;
end
$$;

create or replace function public.ir_limpio(t text)
returns text
language sql
immutable
as $$
  select nullif(btrim(regexp_replace(coalesce(t, ''), '\s+', ' ', 'g')), '')
$$;

create or replace function public.ir_admin(p_codigo text)
returns public.intercambios
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.intercambios;
begin
  select * into v from public.intercambios where codigo_admin = upper(btrim(coalesce(p_codigo, '')));
  if not found then
    raise exception 'Código de organizador no válido' using errcode = 'P0001';
  end if;
  return v;
end
$$;

create or replace function public.ir_quitar_sorteo(p_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.participantes set regala_a = null, ya_compro = false where intercambio_id = p_id;
  update public.intercambios set sorteado_en = null where id = p_id;
$$;

create or replace function public.entrar(p_codigo text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c text := upper(btrim(coalesce(p_codigo, '')));
begin
  if exists (select 1 from public.intercambios where codigo_admin = c) then
    return json_build_object('tipo', 'organizador', 'codigo', c);
  end if;
  if exists (select 1 from public.participantes where codigo = c) then
    return json_build_object('tipo', 'participante', 'codigo', c);
  end if;
  raise exception 'No encontramos ese código. Revísalo letra por letra.' using errcode = 'P0001';
end
$$;

create or replace function public.crear_intercambio(p_nombre text, p_presupuesto numeric, p_fecha timestamptz, p_lugar text, p_nota text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios;
  intento int := 0;
begin
  if ir_limpio(p_nombre) is null then
    raise exception 'Escribe el nombre del intercambio' using errcode = 'P0001';
  end if;
  loop
    begin
      insert into public.intercambios (nombre, presupuesto, fecha, lugar, nota, codigo_admin)
      values (ir_limpio(p_nombre), coalesce(p_presupuesto, 100), p_fecha, ir_limpio(p_lugar), nullif(btrim(coalesce(p_nota, '')), ''), ir_codigo(8))
      returning * into v;
      exit;
    exception when unique_violation then
      intento := intento + 1;
      if intento > 5 then raise; end if;
    end;
  end loop;
  return json_build_object('id', v.id, 'codigo_admin', v.codigo_admin);
end
$$;

create or replace function public.admin_ver(p_codigo text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
begin
  return json_build_object(
    'intercambio', json_build_object(
      'id', v.id, 'nombre', v.nombre, 'presupuesto', v.presupuesto, 'fecha', v.fecha,
      'lugar', v.lugar, 'nota', v.nota, 'sorteado_en', v.sorteado_en, 'codigo_admin', v.codigo_admin
    ),
    'participantes', coalesce((
      select json_agg(json_build_object(
        'id', p.id, 'nombre', p.nombre, 'codigo', p.codigo,
        'tiene_deseos', p.deseos <> '', 'ya_compro', p.ya_compro
      ) order by lower(p.nombre))
      from public.participantes p where p.intercambio_id = v.id
    ), '[]'::json)
  );
end
$$;

create or replace function public.admin_editar(p_codigo text, p_nombre text, p_presupuesto numeric, p_fecha timestamptz, p_lugar text, p_nota text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
begin
  if ir_limpio(p_nombre) is null then
    raise exception 'Escribe el nombre del intercambio' using errcode = 'P0001';
  end if;
  update public.intercambios
  set nombre = ir_limpio(p_nombre), presupuesto = coalesce(p_presupuesto, presupuesto), fecha = p_fecha,
      lugar = ir_limpio(p_lugar), nota = nullif(btrim(coalesce(p_nota, '')), '')
  where id = v.id;
end
$$;

create or replace function public.admin_agregar(p_codigo text, p_nombres text[])
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
  n text;
  limpio text;
  agregados int := 0;
  repetidos text[] := '{}';
  intento int;
begin
  if (select count(*) from public.participantes where intercambio_id = v.id) + coalesce(array_length(p_nombres, 1), 0) > 200 then
    raise exception 'Un intercambio puede tener hasta 200 personas' using errcode = 'P0001';
  end if;
  foreach n in array coalesce(p_nombres, '{}') loop
    limpio := ir_limpio(n);
    continue when limpio is null;
    if char_length(limpio) > 60 then
      raise exception 'El nombre «%» es muy largo (máximo 60 letras)', left(limpio, 20) using errcode = 'P0001';
    end if;
    if exists (select 1 from public.participantes where intercambio_id = v.id and lower(nombre) = lower(limpio)) then
      repetidos := repetidos || limpio;
      continue;
    end if;
    intento := 0;
    loop
      begin
        insert into public.participantes (intercambio_id, nombre, codigo) values (v.id, limpio, ir_codigo(6));
        exit;
      exception when unique_violation then
        intento := intento + 1;
        if intento > 5 then raise; end if;
      end;
    end loop;
    agregados := agregados + 1;
  end loop;
  if agregados > 0 and v.sorteado_en is not null then
    perform ir_quitar_sorteo(v.id);
  end if;
  return json_build_object('agregados', agregados, 'repetidos', repetidos);
end
$$;

create or replace function public.admin_renombrar(p_codigo text, p_id uuid, p_nombre text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
  limpio text := ir_limpio(p_nombre);
begin
  if limpio is null then
    raise exception 'Escribe el nombre' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.participantes where intercambio_id = v.id and lower(nombre) = lower(limpio) and id <> p_id) then
    raise exception 'Ya hay alguien que se llama «%»', limpio using errcode = 'P0001';
  end if;
  update public.participantes set nombre = limpio where id = p_id and intercambio_id = v.id;
end
$$;

create or replace function public.admin_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
begin
  if v.sorteado_en is not null then
    perform ir_quitar_sorteo(v.id);
  end if;
  delete from public.participantes where id = p_id and intercambio_id = v.id;
end
$$;

create or replace function public.admin_nuevo_codigo(p_codigo text, p_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
  nuevo text;
  intento int := 0;
begin
  loop
    begin
      update public.participantes set codigo = ir_codigo(6) where id = p_id and intercambio_id = v.id returning codigo into nuevo;
      exit;
    exception when unique_violation then
      intento := intento + 1;
      if intento > 5 then raise; end if;
    end;
  end loop;
  return nuevo;
end
$$;

create or replace function public.admin_sortear(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
  ids uuid[];
  total int;
  i int;
begin
  select array_agg(id order by gen_random_uuid()) into ids from public.participantes where intercambio_id = v.id;
  total := coalesce(array_length(ids, 1), 0);
  if total < 3 then
    raise exception 'Se necesitan al menos 3 personas para sortear' using errcode = 'P0001';
  end if;
  update public.participantes set regala_a = null, ya_compro = false where intercambio_id = v.id;
  for i in 1..total loop
    update public.participantes set regala_a = ids[case when i = total then 1 else i + 1 end] where id = ids[i];
  end loop;
  update public.intercambios set sorteado_en = now() where id = v.id;
end
$$;

create or replace function public.admin_deshacer_sorteo(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
begin
  perform ir_quitar_sorteo(v.id);
end
$$;

create or replace function public.admin_borrar(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.intercambios := ir_admin(p_codigo);
begin
  delete from public.intercambios where id = v.id;
end
$$;

create or replace function public.yo_ver(p_codigo text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  yo public.participantes;
  v public.intercambios;
  amigo public.participantes;
begin
  select * into yo from public.participantes where codigo = upper(btrim(coalesce(p_codigo, '')));
  if not found then
    raise exception 'No encontramos ese código. Revísalo letra por letra.' using errcode = 'P0001';
  end if;
  select * into v from public.intercambios where id = yo.intercambio_id;
  if yo.regala_a is not null then
    select * into amigo from public.participantes where id = yo.regala_a;
  end if;
  return json_build_object(
    'intercambio', json_build_object(
      'nombre', v.nombre, 'presupuesto', v.presupuesto, 'fecha', v.fecha, 'lugar', v.lugar,
      'nota', v.nota, 'sorteado', v.sorteado_en is not null
    ),
    'yo', json_build_object('nombre', yo.nombre, 'deseos', yo.deseos, 'ya_compro', yo.ya_compro),
    'amigo', case when amigo.id is null then null else json_build_object('nombre', amigo.nombre, 'deseos', amigo.deseos) end,
    'total', (select count(*) from public.participantes where intercambio_id = v.id),
    'compraron', (select count(*) from public.participantes where intercambio_id = v.id and ya_compro)
  );
end
$$;

create or replace function public.yo_deseos(p_codigo text, p_deseos text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(coalesce(p_deseos, '')) > 1500 then
    raise exception 'La lista de deseos es muy larga (máximo 1,500 letras)' using errcode = 'P0001';
  end if;
  update public.participantes set deseos = btrim(coalesce(p_deseos, '')) where codigo = upper(btrim(coalesce(p_codigo, '')));
  if not found then
    raise exception 'No encontramos ese código' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.yo_compre(p_codigo text, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.participantes set ya_compro = coalesce(p_valor, false) where codigo = upper(btrim(coalesce(p_codigo, '')));
  if not found then
    raise exception 'No encontramos ese código' using errcode = 'P0001';
  end if;
end
$$;

revoke all on function public.ir_codigo(int) from public, anon, authenticated;
revoke all on function public.ir_admin(text) from public, anon, authenticated;
revoke all on function public.ir_quitar_sorteo(uuid) from public, anon, authenticated;

revoke all on function public.entrar(text) from public;
revoke all on function public.crear_intercambio(text, numeric, timestamptz, text, text) from public;
revoke all on function public.admin_ver(text) from public;
revoke all on function public.admin_editar(text, text, numeric, timestamptz, text, text) from public;
revoke all on function public.admin_agregar(text, text[]) from public;
revoke all on function public.admin_renombrar(text, uuid, text) from public;
revoke all on function public.admin_quitar(text, uuid) from public;
revoke all on function public.admin_nuevo_codigo(text, uuid) from public;
revoke all on function public.admin_sortear(text) from public;
revoke all on function public.admin_deshacer_sorteo(text) from public;
revoke all on function public.admin_borrar(text) from public;
revoke all on function public.yo_ver(text) from public;
revoke all on function public.yo_deseos(text, text) from public;
revoke all on function public.yo_compre(text, boolean) from public;

grant execute on function public.entrar(text) to anon, authenticated;
grant execute on function public.crear_intercambio(text, numeric, timestamptz, text, text) to anon, authenticated;
grant execute on function public.admin_ver(text) to anon, authenticated;
grant execute on function public.admin_editar(text, text, numeric, timestamptz, text, text) to anon, authenticated;
grant execute on function public.admin_agregar(text, text[]) to anon, authenticated;
grant execute on function public.admin_renombrar(text, uuid, text) to anon, authenticated;
grant execute on function public.admin_quitar(text, uuid) to anon, authenticated;
grant execute on function public.admin_nuevo_codigo(text, uuid) to anon, authenticated;
grant execute on function public.admin_sortear(text) to anon, authenticated;
grant execute on function public.admin_deshacer_sorteo(text) to anon, authenticated;
grant execute on function public.admin_borrar(text) to anon, authenticated;
grant execute on function public.yo_ver(text) to anon, authenticated;
grant execute on function public.yo_deseos(text, text) to anon, authenticated;
grant execute on function public.yo_compre(text, boolean) to anon, authenticated;

notify pgrst, 'reload schema';
