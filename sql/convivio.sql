drop function if exists public.admin_llevar_agregar(text, text, int);
drop function if exists public.entrar(text);
drop function if exists public.crear_intercambio(text, numeric, timestamptz, text, text);
drop function if exists public.admin_ver(text);
drop function if exists public.admin_editar(text, text, numeric, timestamptz, text, text);
drop function if exists public.admin_agregar(text, text[]);
drop function if exists public.admin_renombrar(text, uuid, text);
drop function if exists public.admin_quitar(text, uuid);
drop function if exists public.admin_nuevo_codigo(text, uuid);
drop function if exists public.admin_sortear(text);
drop function if exists public.admin_deshacer_sorteo(text);
drop function if exists public.admin_borrar(text);
drop function if exists public.yo_ver(text);
drop function if exists public.yo_deseos(text, text);
drop function if exists public.yo_compre(text, boolean);
drop function if exists public.ir_admin(text);
drop function if exists public.ir_quitar_sorteo(uuid);
drop table if exists public.participantes cascade;
drop table if exists public.intercambios cascade;

create table if not exists public.convivios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 1 and 80),
  fecha timestamptz,
  lugar text check (lugar is null or char_length(lugar) <= 160),
  nota text check (nota is null or char_length(nota) <= 800),
  tema text not null default 'navidad' check (tema in ('navidad', 'dorado', 'invierno', 'rosa', 'vino', 'bosque', 'propio')),
  color text check (color is null or color ~ '^#[0-9A-Fa-f]{6}$'),
  act_asistencia boolean not null default true,
  act_intercambio boolean not null default true,
  act_llevar boolean not null default false,
  act_cuota boolean not null default false,
  act_programa boolean not null default false,
  act_rifa boolean not null default false,
  act_votos boolean not null default false,
  act_fotos boolean not null default false,
  presupuesto numeric(10,2) not null default 100 check (presupuesto > 0 and presupuesto < 100000),
  cuota numeric(10,2) not null default 0 check (cuota >= 0 and cuota < 100000),
  codigo_admin text not null unique,
  sorteado_en timestamptz,
  creado_en timestamptz not null default now()
);

create table if not exists public.invitados (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  nombre text not null check (char_length(nombre) between 1 and 60),
  codigo text not null unique,
  asistencia text check (asistencia in ('si', 'no', 'tal_vez')),
  acompanantes int not null default 0 check (acompanantes between 0 and 20),
  en_intercambio boolean not null default true,
  deseos text not null default '' check (char_length(deseos) <= 1500),
  ya_compro boolean not null default false,
  regala_a uuid references public.invitados(id) on delete set null,
  cuota_pagada boolean not null default false,
  creado_en timestamptz not null default now()
);
create unique index if not exists invitados_nombre_unico on public.invitados (convivio_id, lower(nombre));
create index if not exists invitados_convivio on public.invitados (convivio_id);

create table if not exists public.llevar (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  que text not null check (char_length(que) between 1 and 80),
  cuantos int not null default 1 check (cuantos between 1 and 50),
  creado_en timestamptz not null default now()
);
create table if not exists public.llevar_apuntes (
  llevar_id uuid not null references public.llevar(id) on delete cascade,
  invitado_id uuid not null references public.invitados(id) on delete cascade,
  primary key (llevar_id, invitado_id)
);

create table if not exists public.programa (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  orden int not null default 0,
  hora text check (hora is null or char_length(hora) <= 20),
  titulo text not null check (char_length(titulo) between 1 and 80),
  detalle text check (detalle is null or char_length(detalle) <= 200)
);

create table if not exists public.premios (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  premio text not null check (char_length(premio) between 1 and 80),
  ganador_id uuid references public.invitados(id) on delete set null,
  rifado_en timestamptz,
  creado_en timestamptz not null default now()
);

create table if not exists public.votaciones (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  titulo text not null check (char_length(titulo) between 1 and 80),
  estado text not null default 'abierta' check (estado in ('abierta', 'cerrada')),
  creado_en timestamptz not null default now()
);
create table if not exists public.votos (
  votacion_id uuid not null references public.votaciones(id) on delete cascade,
  votante_id uuid not null references public.invitados(id) on delete cascade,
  elegido_id uuid not null references public.invitados(id) on delete cascade,
  primary key (votacion_id, votante_id)
);

create table if not exists public.fotos (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  invitado_id uuid references public.invitados(id) on delete set null,
  ruta text not null unique check (char_length(ruta) <= 200),
  creado_en timestamptz not null default now()
);
create index if not exists fotos_convivio on public.fotos (convivio_id, creado_en desc);

alter table public.convivios add column if not exists act_restaurante boolean not null default false;
alter table public.convivios add column if not exists precio_plato numeric(10,2) check (precio_plato is null or (precio_plato > 0 and precio_plato < 100000));
alter table public.invitados add column if not exists es_organizador boolean not null default false;
alter table public.convivios add column if not exists act_encuestas boolean not null default false;
alter table public.convivios add column if not exists act_menu boolean not null default false;
alter table public.convivios add column if not exists act_tareas boolean not null default false;
alter table public.convivios add column if not exists act_transporte boolean not null default false;
alter table public.convivios add column if not exists act_canciones boolean not null default false;
alter table public.convivios add column if not exists act_mensajes boolean not null default false;
alter table public.convivios add column if not exists act_dieta boolean not null default false;
alter table public.convivios add column if not exists act_vestimenta boolean not null default false;
alter table public.convivios add column if not exists vestimenta text check (vestimenta is null or char_length(vestimenta) <= 80);
alter table public.convivios add column if not exists sorteo_programado timestamptz;
alter table public.llevar add column if not exists tipo text not null default 'llevar' check (tipo in ('llevar', 'tarea'));
alter table public.invitados add column if not exists dieta text not null default '' check (char_length(dieta) <= 200);

create table if not exists public.menu (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  plato text not null check (char_length(plato) between 1 and 80),
  precio numeric(10,2) check (precio is null or (precio > 0 and precio < 100000)),
  creado_en timestamptz not null default now()
);
alter table public.invitados add column if not exists plato_id uuid references public.menu(id) on delete set null;

create table if not exists public.encuestas (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  pregunta text not null check (char_length(pregunta) between 1 and 120),
  opciones text[] not null check (array_length(opciones, 1) between 2 and 10),
  estado text not null default 'abierta' check (estado in ('abierta', 'cerrada')),
  creado_en timestamptz not null default now()
);
create table if not exists public.encuesta_votos (
  encuesta_id uuid not null references public.encuestas(id) on delete cascade,
  invitado_id uuid not null references public.invitados(id) on delete cascade,
  opcion int not null check (opcion >= 0),
  primary key (encuesta_id, invitado_id)
);

create table if not exists public.viajes (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  conductor_id uuid not null unique references public.invitados(id) on delete cascade,
  lugares int not null check (lugares between 1 and 12),
  salida text check (salida is null or char_length(salida) <= 120),
  creado_en timestamptz not null default now()
);
create table if not exists public.viaje_pasajeros (
  viaje_id uuid not null references public.viajes(id) on delete cascade,
  invitado_id uuid not null unique references public.invitados(id) on delete cascade,
  primary key (viaje_id, invitado_id)
);

create table if not exists public.canciones (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  invitado_id uuid references public.invitados(id) on delete cascade,
  cancion text not null check (char_length(cancion) between 1 and 120),
  creado_en timestamptz not null default now()
);

create table if not exists public.mensajes (
  id uuid primary key default gen_random_uuid(),
  convivio_id uuid not null references public.convivios(id) on delete cascade,
  invitado_id uuid references public.invitados(id) on delete set null,
  texto text not null check (char_length(texto) between 1 and 500),
  creado_en timestamptz not null default now()
);
create index if not exists mensajes_convivio on public.mensajes (convivio_id, creado_en desc);
alter table public.llevar_apuntes add column if not exists asignado boolean not null default false;

do $$
declare t text;
begin
  foreach t in array array['convivios', 'invitados', 'llevar', 'llevar_apuntes', 'programa', 'premios', 'votaciones', 'votos', 'fotos', 'menu', 'encuestas', 'encuesta_votos', 'viajes', 'viaje_pasajeros', 'canciones', 'mensajes'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
  end loop;
end
$$;

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

create or replace function public.cv_admin(p_codigo text)
returns public.convivios
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.convivios;
  c text := upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'));
begin
  select * into v from public.convivios where codigo_admin = c;
  if not found then
    select cv.* into v from public.convivios cv join public.invitados i on i.convivio_id = cv.id where i.codigo = c and i.es_organizador;
  end if;
  if not found then
    raise exception 'Código de organizador no válido' using errcode = 'P0001';
  end if;
  return v;
end
$$;

create or replace function public.cv_principal(p_codigo text)
returns public.convivios
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if v.codigo_admin <> upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g')) then
    raise exception 'Esta acción corresponde únicamente al organizador principal' using errcode = 'P0001';
  end if;
  return v;
end
$$;

create or replace function public.cv_yo(p_codigo text)
returns public.invitados
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  y public.invitados;
begin
  select * into y from public.invitados where codigo = upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'));
  if not found then
    raise exception 'No se encontró ese código. Verifíquelo e intente de nuevo.' using errcode = 'P0001';
  end if;
  return y;
end
$$;

create or replace function public.cv_quitar_sorteo(p_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.invitados set regala_a = null, ya_compro = false where convivio_id = p_id;
  update public.convivios set sorteado_en = null, sorteo_programado = null where id = p_id;
$$;

create or replace function public.cv_existe(p_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.convivios where id::text = p_id and act_fotos)
$$;

create or replace function public.cv_publico(v public.convivios)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'id', v.id, 'nombre', v.nombre, 'fecha', v.fecha, 'lugar', v.lugar, 'nota', v.nota,
    'tema', v.tema, 'color', v.color, 'presupuesto', v.presupuesto, 'cuota', v.cuota, 'precio_plato', v.precio_plato,
    'vestimenta', v.vestimenta, 'sorteo_programado', v.sorteo_programado,
    'sorteado', v.sorteado_en is not null, 'sorteado_en', v.sorteado_en,
    'act', json_build_object(
      'asistencia', v.act_asistencia, 'intercambio', v.act_intercambio, 'llevar', v.act_llevar,
      'cuota', v.act_cuota, 'programa', v.act_programa, 'rifa', v.act_rifa, 'votos', v.act_votos, 'fotos', v.act_fotos,
      'restaurante', v.act_restaurante, 'encuestas', v.act_encuestas, 'menu', v.act_menu, 'tareas', v.act_tareas,
      'transporte', v.act_transporte, 'canciones', v.act_canciones, 'mensajes', v.act_mensajes, 'dieta', v.act_dieta,
      'vestimenta', v.act_vestimenta
    )
  )
$$;

create or replace function public.cv_comun(v public.convivios)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'llevar', coalesce((
      select json_agg(json_build_object(
        'id', l.id, 'que', l.que, 'cuantos', l.cuantos, 'tipo', l.tipo,
        'quienes', coalesce((select json_agg(json_build_object('id', i.id, 'nombre', i.nombre, 'asignado', a.asignado) order by lower(i.nombre)) from public.llevar_apuntes a join public.invitados i on i.id = a.invitado_id where a.llevar_id = l.id), '[]'::json)
      ) order by l.creado_en)
      from public.llevar l where l.convivio_id = v.id
    ), '[]'::json),
    'programa', coalesce((select json_agg(json_build_object('id', p.id, 'hora', p.hora, 'titulo', p.titulo, 'detalle', p.detalle) order by p.orden) from public.programa p where p.convivio_id = v.id), '[]'::json),
    'premios', coalesce((
      select json_agg(json_build_object('id', p.id, 'premio', p.premio, 'ganador', g.nombre, 'ganador_id', g.id, 'rifado_en', p.rifado_en) order by p.creado_en)
      from public.premios p left join public.invitados g on g.id = p.ganador_id where p.convivio_id = v.id
    ), '[]'::json),
    'fotos', coalesce((
      select json_agg(json_build_object('id', f.id, 'ruta', f.ruta, 'autor', i.nombre, 'autor_id', f.invitado_id, 'creado_en', f.creado_en) order by f.creado_en desc)
      from public.fotos f left join public.invitados i on i.id = f.invitado_id where f.convivio_id = v.id
    ), '[]'::json),
    'menu', coalesce((
      select json_agg(json_build_object('id', m.id, 'plato', m.plato, 'precio', m.precio, 'total', (select count(*) from public.invitados i where i.plato_id = m.id)) order by m.creado_en)
      from public.menu m where m.convivio_id = v.id
    ), '[]'::json),
    'encuestas', coalesce((
      select json_agg(json_build_object(
        'id', e.id, 'pregunta', e.pregunta, 'opciones', e.opciones, 'estado', e.estado,
        'total', (select count(*) from public.encuesta_votos x where x.encuesta_id = e.id),
        'conteo', (select json_agg((select count(*) from public.encuesta_votos x where x.encuesta_id = e.id and x.opcion = g.i - 1) order by g.i) from generate_subscripts(e.opciones, 1) g(i))
      ) order by e.creado_en)
      from public.encuestas e where e.convivio_id = v.id
    ), '[]'::json),
    'viajes', coalesce((
      select json_agg(json_build_object(
        'id', t.id, 'conductor', c.nombre, 'conductor_id', t.conductor_id, 'lugares', t.lugares, 'salida', t.salida,
        'pasajeros', coalesce((select json_agg(json_build_object('id', i.id, 'nombre', i.nombre) order by lower(i.nombre)) from public.viaje_pasajeros vp join public.invitados i on i.id = vp.invitado_id where vp.viaje_id = t.id), '[]'::json)
      ) order by t.creado_en)
      from public.viajes t join public.invitados c on c.id = t.conductor_id where t.convivio_id = v.id
    ), '[]'::json),
    'canciones', coalesce((
      select json_agg(json_build_object('id', k.id, 'cancion', k.cancion, 'autor', i.nombre, 'autor_id', k.invitado_id) order by k.creado_en)
      from public.canciones k left join public.invitados i on i.id = k.invitado_id where k.convivio_id = v.id
    ), '[]'::json),
    'mensajes', coalesce((
      select json_agg(json_build_object('id', m.id, 'texto', m.texto, 'autor', i.nombre, 'autor_id', m.invitado_id, 'creado_en', m.creado_en) order by m.creado_en desc)
      from public.mensajes m left join public.invitados i on i.id = m.invitado_id where m.convivio_id = v.id
    ), '[]'::json)
  )
$$;

create or replace function public.entrar(p_codigo text)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c text := upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'));
begin
  if exists (select 1 from public.convivios where codigo_admin = c) then
    return json_build_object('tipo', 'organizador', 'codigo', c);
  end if;
  if exists (select 1 from public.invitados where codigo = c and es_organizador) then
    return json_build_object('tipo', 'organizador', 'codigo', c);
  end if;
  if exists (select 1 from public.invitados where codigo = c) then
    return json_build_object('tipo', 'invitado', 'codigo', c);
  end if;
  raise exception 'No se encontró ese código. Verifíquelo e intente de nuevo.' using errcode = 'P0001';
end
$$;

create or replace function public.cv_guardar(p_id uuid, d jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if ir_limpio(d->>'nombre') is null then
    raise exception 'Escriba el nombre del convivio' using errcode = 'P0001';
  end if;
  update public.convivios set
    nombre = ir_limpio(d->>'nombre'),
    fecha = nullif(d->>'fecha', '')::timestamptz,
    lugar = ir_limpio(d->>'lugar'),
    nota = nullif(btrim(coalesce(d->>'nota', '')), ''),
    tema = coalesce(nullif(d->>'tema', ''), 'navidad'),
    color = nullif(d->>'color', ''),
    act_asistencia = coalesce((d->>'asistencia')::boolean, act_asistencia),
    act_intercambio = coalesce((d->>'intercambio')::boolean, act_intercambio),
    act_llevar = coalesce((d->>'llevar')::boolean, act_llevar),
    act_cuota = coalesce((d->>'cuota_act')::boolean, act_cuota),
    act_programa = coalesce((d->>'programa')::boolean, act_programa),
    act_rifa = coalesce((d->>'rifa')::boolean, act_rifa),
    act_votos = coalesce((d->>'votos')::boolean, act_votos),
    act_fotos = coalesce((d->>'fotos')::boolean, act_fotos),
    act_restaurante = coalesce((d->>'restaurante')::boolean, act_restaurante),
    act_encuestas = coalesce((d->>'encuestas')::boolean, act_encuestas),
    act_menu = coalesce((d->>'menu')::boolean, act_menu),
    act_tareas = coalesce((d->>'tareas')::boolean, act_tareas),
    act_transporte = coalesce((d->>'transporte')::boolean, act_transporte),
    act_canciones = coalesce((d->>'canciones')::boolean, act_canciones),
    act_mensajes = coalesce((d->>'mensajes')::boolean, act_mensajes),
    act_dieta = coalesce((d->>'dieta')::boolean, act_dieta),
    act_vestimenta = coalesce((d->>'vestimenta_act')::boolean, act_vestimenta),
    vestimenta = case when d ? 'vestimenta' then left(ir_limpio(d->>'vestimenta'), 80) else vestimenta end,
    precio_plato = case when d ? 'precio_plato' then nullif(nullif(d->>'precio_plato', '')::numeric, 0) else precio_plato end,
    presupuesto = coalesce(nullif(d->>'presupuesto', '')::numeric, presupuesto),
    cuota = coalesce(nullif(d->>'cuota', '')::numeric, cuota)
  where id = p_id;
end
$$;

create or replace function public.crear_convivio(p_datos jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  nuevo uuid;
  cod text;
  intento int := 0;
begin
  if ir_limpio(p_datos->>'nombre') is null then
    raise exception 'Escriba el nombre del convivio' using errcode = 'P0001';
  end if;
  loop
    begin
      cod := ir_codigo(8);
      insert into public.convivios (nombre, codigo_admin) values (ir_limpio(p_datos->>'nombre'), cod) returning id into nuevo;
      exit;
    exception when unique_violation then
      intento := intento + 1;
      if intento > 5 then raise; end if;
    end;
  end loop;
  perform cv_guardar(nuevo, p_datos);
  return json_build_object('id', nuevo, 'codigo_admin', cod);
end
$$;

create or replace function public.admin_ver(p_codigo text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  c text := upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'));
  principal boolean := v.codigo_admin = c;
begin
  perform cv_sorteo_auto(v.id);
  select * into v from public.convivios where id = v.id;
  return (json_build_object(
    'convivio', cv_publico(v)::jsonb || jsonb_build_object('codigo_admin', case when principal then v.codigo_admin end),
    'principal', principal,
    'yo', case when principal then null else (select json_build_object('id', i.id, 'nombre', i.nombre) from public.invitados i where i.codigo = c) end,
    'invitados', coalesce((
      select json_agg(json_build_object(
        'id', i.id, 'nombre', i.nombre, 'codigo', i.codigo, 'asistencia', i.asistencia, 'acompanantes', i.acompanantes,
        'en_intercambio', i.en_intercambio, 'tiene_deseos', i.deseos <> '', 'ya_compro', i.ya_compro, 'cuota_pagada', i.cuota_pagada,
        'es_organizador', i.es_organizador, 'dieta', i.dieta, 'plato_id', i.plato_id
      ) order by lower(i.nombre))
      from public.invitados i where i.convivio_id = v.id
    ), '[]'::json),
    'votaciones', coalesce((
      select json_agg(json_build_object(
        'id', t.id, 'titulo', t.titulo, 'estado', t.estado,
        'total', (select count(*) from public.votos x where x.votacion_id = t.id),
        'resultados', coalesce((select json_agg(json_build_object('nombre', i.nombre, 'votos', r.n) order by r.n desc, lower(i.nombre)) from (select elegido_id, count(*) n from public.votos x where x.votacion_id = t.id group by elegido_id) r join public.invitados i on i.id = r.elegido_id), '[]'::json)
      ) order by t.creado_en)
      from public.votaciones t where t.convivio_id = v.id
    ), '[]'::json)
  )::jsonb || cv_comun(v)::jsonb)::json;
end
$$;

create or replace function public.admin_editar(p_codigo text, p_datos jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  perform cv_guardar(v.id, p_datos);
end
$$;

create or replace function public.admin_agregar(p_codigo text, p_nombres text[])
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  n text;
  limpio text;
  agregados int := 0;
  repetidos text[] := '{}';
  intento int;
begin
  if (select count(*) from public.invitados where convivio_id = v.id) + coalesce(array_length(p_nombres, 1), 0) > 300 then
    raise exception 'Un convivio puede tener hasta 300 invitados' using errcode = 'P0001';
  end if;
  foreach n in array coalesce(p_nombres, '{}') loop
    limpio := ir_limpio(n);
    continue when limpio is null;
    if char_length(limpio) > 60 then
      raise exception 'El nombre «%» excede el máximo de 60 caracteres', left(limpio, 20) using errcode = 'P0001';
    end if;
    if exists (select 1 from public.invitados where convivio_id = v.id and lower(nombre) = lower(limpio)) then
      repetidos := repetidos || limpio;
      continue;
    end if;
    intento := 0;
    loop
      begin
        insert into public.invitados (convivio_id, nombre, codigo) values (v.id, limpio, ir_codigo(6));
        exit;
      exception when unique_violation then
        intento := intento + 1;
        if intento > 5 then raise; end if;
      end;
    end loop;
    agregados := agregados + 1;
  end loop;
  if agregados > 0 and v.sorteado_en is not null then
    perform cv_quitar_sorteo(v.id);
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
  v public.convivios := cv_admin(p_codigo);
  limpio text := ir_limpio(p_nombre);
begin
  if limpio is null then
    raise exception 'Escriba el nombre' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.invitados where convivio_id = v.id and lower(nombre) = lower(limpio) and id <> p_id) then
    raise exception 'Ya existe un invitado con el nombre «%»', limpio using errcode = 'P0001';
  end if;
  update public.invitados set nombre = limpio where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.cv_tocar_organizador(p_codigo text, v public.convivios, p_id uuid)
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if v.codigo_admin <> upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'))
     and exists (select 1 from public.invitados where id = p_id and convivio_id = v.id and es_organizador) then
    raise exception 'Solo el organizador principal puede modificar a otro organizador' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_organizador(p_codigo text, p_id uuid, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_principal(p_codigo);
begin
  update public.invitados set es_organizador = coalesce(p_valor, false) where id = p_id and convivio_id = v.id;
  if not found then
    raise exception 'Ese invitado ya no está en el convivio' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  perform cv_tocar_organizador(p_codigo, v, p_id);
  if v.sorteado_en is not null and exists (select 1 from public.invitados where id = p_id and convivio_id = v.id and en_intercambio) then
    perform cv_quitar_sorteo(v.id);
  end if;
  delete from public.invitados where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_nuevo_codigo(p_codigo text, p_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  nuevo text;
  intento int := 0;
begin
  perform cv_tocar_organizador(p_codigo, v, p_id);
  loop
    begin
      update public.invitados set codigo = ir_codigo(6) where id = p_id and convivio_id = v.id returning codigo into nuevo;
      exit;
    exception when unique_violation then
      intento := intento + 1;
      if intento > 5 then raise; end if;
    end;
  end loop;
  return nuevo;
end
$$;

create or replace function public.admin_marcar(p_codigo text, p_id uuid, p_campo text, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  antes boolean;
begin
  if p_campo = 'cuota_pagada' then
    update public.invitados set cuota_pagada = coalesce(p_valor, false) where id = p_id and convivio_id = v.id;
  elsif p_campo = 'en_intercambio' then
    select en_intercambio into antes from public.invitados where id = p_id and convivio_id = v.id;
    if antes is distinct from coalesce(p_valor, false) then
      update public.invitados set en_intercambio = coalesce(p_valor, false) where id = p_id and convivio_id = v.id;
      if v.sorteado_en is not null then perform cv_quitar_sorteo(v.id); end if;
    end if;
  else
    raise exception 'Campo no válido' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_sortear(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  perform cv_sortear(v.id);
  update public.convivios set sorteo_programado = null where id = v.id;
end
$$;

create or replace function public.cv_sortear(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  ids uuid[];
  total int;
  i int;
begin
  select array_agg(id order by gen_random_uuid()) into ids from public.invitados where convivio_id = p_id and en_intercambio;
  total := coalesce(array_length(ids, 1), 0);
  if total < 3 then
    raise exception 'Se requieren al menos 3 participantes para realizar el sorteo' using errcode = 'P0001';
  end if;
  update public.invitados set regala_a = null, ya_compro = false where convivio_id = p_id;
  for i in 1..total loop
    update public.invitados set regala_a = ids[case when i = total then 1 else i + 1 end] where id = ids[i];
  end loop;
  update public.convivios set sorteado_en = now() where id = p_id;
end
$$;

create or replace function public.cv_sorteo_auto(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios;
begin
  select * into v from public.convivios where id = p_id;
  if not (v.act_intercambio and v.sorteado_en is null and v.sorteo_programado is not null and v.sorteo_programado <= now()) then
    return;
  end if;
  select * into v from public.convivios where id = p_id for update;
  if v.sorteado_en is null and v.sorteo_programado <= now()
     and (select count(*) from public.invitados where convivio_id = p_id and en_intercambio) >= 3 then
    perform cv_sortear(p_id);
  end if;
end
$$;

create or replace function public.admin_programar_sorteo(p_codigo text, p_fecha timestamptz)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if v.sorteado_en is not null then
    raise exception 'El sorteo ya se realizó. Para programarlo de nuevo, primero anúlelo.' using errcode = 'P0001';
  end if;
  if p_fecha is not null and p_fecha <= now() then
    raise exception 'Elija una fecha y hora posteriores al momento actual' using errcode = 'P0001';
  end if;
  update public.convivios set sorteo_programado = p_fecha where id = v.id;
end
$$;

create or replace function public.admin_deshacer_sorteo(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  perform cv_quitar_sorteo(v.id);
end
$$;

create or replace function public.admin_borrar(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_principal(p_codigo);
begin
  delete from public.convivios where id = v.id;
end
$$;

create or replace function public.admin_llevar_agregar(p_codigo text, p_que text, p_cuantos int, p_tipo text default 'llevar')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  t text := case when p_tipo = 'tarea' then 'tarea' else 'llevar' end;
begin
  if ir_limpio(p_que) is null then
    raise exception '%', case when t = 'tarea' then 'Escriba la tarea' else 'Escriba el artículo' end using errcode = 'P0001';
  end if;
  if (select count(*) from public.llevar where convivio_id = v.id) >= 150 then
    raise exception 'La lista admite un máximo de 150 elementos' using errcode = 'P0001';
  end if;
  insert into public.llevar (convivio_id, que, cuantos, tipo) values (v.id, left(ir_limpio(p_que), 80), greatest(1, least(coalesce(p_cuantos, 1), 50)), t);
end
$$;

create or replace function public.admin_llevar_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.llevar where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_llevar_asignar(p_codigo text, p_id uuid, p_invitado uuid, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  l public.llevar;
  n int;
begin
  select * into l from public.llevar where id = p_id and convivio_id = v.id;
  if not found then
    raise exception 'Ese artículo ya no está en la lista' using errcode = 'P0001';
  end if;
  if not exists (select 1 from public.invitados where id = p_invitado and convivio_id = v.id) then
    raise exception 'Ese invitado ya no está en el convivio' using errcode = 'P0001';
  end if;
  if coalesce(p_valor, false) then
    insert into public.llevar_apuntes (llevar_id, invitado_id, asignado) values (l.id, p_invitado, true)
      on conflict (llevar_id, invitado_id) do update set asignado = true;
    select count(*) into n from public.llevar_apuntes where llevar_id = l.id;
    if n > l.cuantos then
      update public.llevar set cuantos = least(n, 50) where id = l.id;
    end if;
  else
    delete from public.llevar_apuntes where llevar_id = l.id and invitado_id = p_invitado;
  end if;
end
$$;

create or replace function public.admin_programa(p_codigo text, p_items jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  it jsonb;
  n int := 0;
begin
  if jsonb_array_length(coalesce(p_items, '[]'::jsonb)) > 40 then
    raise exception 'El programa admite un máximo de 40 actividades' using errcode = 'P0001';
  end if;
  delete from public.programa where convivio_id = v.id;
  for it in select * from jsonb_array_elements(coalesce(p_items, '[]'::jsonb)) loop
    continue when ir_limpio(it->>'titulo') is null;
    n := n + 1;
    insert into public.programa (convivio_id, orden, hora, titulo, detalle)
    values (v.id, n, left(ir_limpio(it->>'hora'), 20), left(ir_limpio(it->>'titulo'), 80), left(ir_limpio(it->>'detalle'), 200));
  end loop;
end
$$;

create or replace function public.admin_premio_agregar(p_codigo text, p_premio text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if ir_limpio(p_premio) is null then
    raise exception 'Escriba el premio' using errcode = 'P0001';
  end if;
  if (select count(*) from public.premios where convivio_id = v.id) >= 100 then
    raise exception 'Se admite un máximo de 100 premios' using errcode = 'P0001';
  end if;
  insert into public.premios (convivio_id, premio) values (v.id, left(ir_limpio(p_premio), 80));
end
$$;

create or replace function public.admin_premio_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.premios where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_rifar(p_codigo text, p_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  g public.invitados;
begin
  if not exists (select 1 from public.premios where id = p_id and convivio_id = v.id) then
    raise exception 'Ese premio ya no existe' using errcode = 'P0001';
  end if;
  update public.premios set ganador_id = null, rifado_en = null where id = p_id;
  select i.* into g from public.invitados i
  where i.convivio_id = v.id
    and (not v.act_asistencia or i.asistencia = 'si')
    and not exists (select 1 from public.premios p where p.convivio_id = v.id and p.ganador_id = i.id)
  order by gen_random_uuid() limit 1;
  if not found then
    raise exception '%', case when v.act_asistencia then 'No hay participantes disponibles: solo participan los invitados con asistencia confirmada que aún no han ganado' else 'Todos los invitados ya obtuvieron un premio' end using errcode = 'P0001';
  end if;
  update public.premios set ganador_id = g.id, rifado_en = now() where id = p_id;
  return g.nombre;
end
$$;

create or replace function public.admin_premio_limpiar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  update public.premios set ganador_id = null, rifado_en = null where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_votacion_agregar(p_codigo text, p_titulo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if ir_limpio(p_titulo) is null then
    raise exception 'Escriba la categoría de la votación' using errcode = 'P0001';
  end if;
  if (select count(*) from public.votaciones where convivio_id = v.id) >= 30 then
    raise exception 'Se admite un máximo de 30 votaciones' using errcode = 'P0001';
  end if;
  insert into public.votaciones (convivio_id, titulo) values (v.id, left(ir_limpio(p_titulo), 80));
end
$$;

create or replace function public.admin_votacion_estado(p_codigo text, p_id uuid, p_estado text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if p_estado not in ('abierta', 'cerrada') then
    raise exception 'Estado no válido' using errcode = 'P0001';
  end if;
  update public.votaciones set estado = p_estado where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_votacion_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.votaciones where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_foto_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.fotos where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.yo_ver(p_codigo text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  v public.convivios;
  amigo public.invitados;
begin
  perform cv_sorteo_auto(yo.convivio_id);
  select * into yo from public.invitados where id = yo.id;
  select * into v from public.convivios where id = yo.convivio_id;
  if yo.regala_a is not null then
    select * into amigo from public.invitados where id = yo.regala_a;
  end if;
  return (json_build_object(
    'convivio', cv_publico(v),
    'yo', json_build_object(
      'id', yo.id, 'nombre', yo.nombre, 'asistencia', yo.asistencia, 'acompanantes', yo.acompanantes,
      'en_intercambio', yo.en_intercambio, 'deseos', yo.deseos, 'ya_compro', yo.ya_compro, 'cuota_pagada', yo.cuota_pagada,
      'es_organizador', yo.es_organizador, 'dieta', yo.dieta, 'plato_id', yo.plato_id
    ),
    'mis_encuestas', coalesce((select json_object_agg(x.encuesta_id, x.opcion) from public.encuesta_votos x where x.invitado_id = yo.id), '{}'::json),
    'amigo', case when amigo.id is null then null else json_build_object('nombre', amigo.nombre, 'deseos', amigo.deseos) end,
    'invitados', coalesce((select json_agg(json_build_object('id', i.id, 'nombre', i.nombre, 'asistencia', i.asistencia, 'acompanantes', i.acompanantes) order by lower(i.nombre)) from public.invitados i where i.convivio_id = v.id), '[]'::json),
    'intercambio', json_build_object(
      'total', (select count(*) from public.invitados where convivio_id = v.id and en_intercambio),
      'compraron', (select count(*) from public.invitados where convivio_id = v.id and en_intercambio and ya_compro)
    ),
    'votaciones', coalesce((
      select json_agg(json_build_object(
        'id', t.id, 'titulo', t.titulo, 'estado', t.estado,
        'mi_voto', (select x.elegido_id from public.votos x where x.votacion_id = t.id and x.votante_id = yo.id),
        'total', (select count(*) from public.votos x where x.votacion_id = t.id),
        'resultados', case when t.estado = 'cerrada' then coalesce((select json_agg(json_build_object('nombre', i.nombre, 'votos', r.n) order by r.n desc, lower(i.nombre)) from (select elegido_id, count(*) n from public.votos x where x.votacion_id = t.id group by elegido_id) r join public.invitados i on i.id = r.elegido_id), '[]'::json) else null end
      ) order by t.creado_en)
      from public.votaciones t where t.convivio_id = v.id
    ), '[]'::json)
  )::jsonb || cv_comun(v)::jsonb)::json;
end
$$;

create or replace function public.yo_asistencia(p_codigo text, p_estado text, p_acompanantes int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  if p_estado is not null and p_estado not in ('si', 'no', 'tal_vez') then
    raise exception 'Respuesta no válida' using errcode = 'P0001';
  end if;
  update public.invitados set asistencia = p_estado, acompanantes = case when p_estado = 'no' then 0 else greatest(0, least(coalesce(p_acompanantes, 0), 20)) end where id = yo.id;
end
$$;

create or replace function public.yo_intercambio(p_codigo text, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  v public.convivios;
begin
  select * into v from public.convivios where id = yo.convivio_id;
  if v.sorteado_en is not null and yo.en_intercambio is distinct from coalesce(p_valor, false) then
    raise exception 'El sorteo ya se realizó. Para incorporarse o retirarse, comuníquese con el organizador.' using errcode = 'P0001';
  end if;
  update public.invitados set en_intercambio = coalesce(p_valor, false) where id = yo.id;
end
$$;

create or replace function public.yo_deseos(p_codigo text, p_deseos text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  if char_length(coalesce(p_deseos, '')) > 1500 then
    raise exception 'La lista de deseos excede el máximo de 1,500 caracteres' using errcode = 'P0001';
  end if;
  update public.invitados set deseos = btrim(coalesce(p_deseos, '')) where id = yo.id;
end
$$;

create or replace function public.yo_compre(p_codigo text, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  update public.invitados set ya_compro = coalesce(p_valor, false) where id = yo.id;
end
$$;

create or replace function public.yo_llevar(p_codigo text, p_id uuid, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  l public.llevar;
begin
  select * into l from public.llevar where id = p_id and convivio_id = yo.convivio_id;
  if not found then
    raise exception 'Ese artículo ya no está en la lista' using errcode = 'P0001';
  end if;
  if coalesce(p_valor, false) then
    if not exists (select 1 from public.llevar_apuntes where llevar_id = l.id and invitado_id = yo.id)
       and (select count(*) from public.llevar_apuntes where llevar_id = l.id) >= l.cuantos then
      raise exception 'El cupo de «%» ya está completo', l.que using errcode = 'P0001';
    end if;
    insert into public.llevar_apuntes (llevar_id, invitado_id) values (l.id, yo.id) on conflict do nothing;
  else
    if exists (select 1 from public.llevar_apuntes where llevar_id = l.id and invitado_id = yo.id and asignado) then
      raise exception 'Este artículo se lo asignó el organizador. Para cambiarlo, comuníquese con el organizador.' using errcode = 'P0001';
    end if;
    delete from public.llevar_apuntes where llevar_id = l.id and invitado_id = yo.id;
  end if;
end
$$;

create or replace function public.yo_llevar_nuevo(p_codigo text, p_que text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  nuevo uuid;
begin
  if ir_limpio(p_que) is null then
    raise exception 'Escriba el artículo que llevará' using errcode = 'P0001';
  end if;
  if (select count(*) from public.llevar where convivio_id = yo.convivio_id) >= 150 then
    raise exception 'La lista alcanzó el máximo de artículos' using errcode = 'P0001';
  end if;
  insert into public.llevar (convivio_id, que, cuantos) values (yo.convivio_id, left(ir_limpio(p_que), 80), 1) returning id into nuevo;
  insert into public.llevar_apuntes (llevar_id, invitado_id) values (nuevo, yo.id);
end
$$;

create or replace function public.yo_votar(p_codigo text, p_votacion uuid, p_elegido uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  t public.votaciones;
begin
  select * into t from public.votaciones where id = p_votacion and convivio_id = yo.convivio_id;
  if not found then
    raise exception 'Esa votación ya no existe' using errcode = 'P0001';
  end if;
  if t.estado <> 'abierta' then
    raise exception 'La votación está cerrada' using errcode = 'P0001';
  end if;
  if not exists (select 1 from public.invitados where id = p_elegido and convivio_id = yo.convivio_id) then
    raise exception 'Esa persona no forma parte del convivio' using errcode = 'P0001';
  end if;
  insert into public.votos (votacion_id, votante_id, elegido_id) values (t.id, yo.id, p_elegido)
  on conflict (votacion_id, votante_id) do update set elegido_id = excluded.elegido_id;
end
$$;

create or replace function public.yo_foto(p_codigo text, p_ruta text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  if p_ruta is null or p_ruta !~ ('^' || yo.convivio_id::text || '/[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$') then
    raise exception 'Fotografía no válida' using errcode = 'P0001';
  end if;
  if not (select act_fotos from public.convivios where id = yo.convivio_id) then
    raise exception 'Este convivio no tiene álbum de fotografías' using errcode = 'P0001';
  end if;
  if (select count(*) from public.fotos where convivio_id = yo.convivio_id) >= 500 then
    raise exception 'El álbum alcanzó el máximo de 500 fotografías' using errcode = 'P0001';
  end if;
  insert into public.fotos (convivio_id, invitado_id, ruta) values (yo.convivio_id, yo.id, p_ruta);
end
$$;

create or replace function public.yo_foto_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  delete from public.fotos where id = p_id and invitado_id = yo.id;
  if not found then
    raise exception 'Solo puede retirar sus propias fotografías' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.cv_activa(p_id uuid, p_act text)
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  ok boolean;
begin
  select case p_act
    when 'menu' then act_menu when 'encuestas' then act_encuestas when 'transporte' then act_transporte
    when 'canciones' then act_canciones when 'mensajes' then act_mensajes when 'dieta' then act_dieta
    else false end into ok
  from public.convivios where id = p_id;
  if not coalesce(ok, false) then
    raise exception 'Esta actividad no está disponible en el convivio' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_menu_agregar(p_codigo text, p_plato text, p_precio numeric)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if ir_limpio(p_plato) is null then
    raise exception 'Escriba el nombre del plato' using errcode = 'P0001';
  end if;
  if p_precio is not null and (p_precio <= 0 or p_precio >= 100000) then
    raise exception 'El precio no es válido' using errcode = 'P0001';
  end if;
  if (select count(*) from public.menu where convivio_id = v.id) >= 40 then
    raise exception 'El menú admite un máximo de 40 platos' using errcode = 'P0001';
  end if;
  insert into public.menu (convivio_id, plato, precio) values (v.id, left(ir_limpio(p_plato), 80), p_precio);
end
$$;

create or replace function public.admin_menu_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.menu where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_plato(p_codigo text, p_id uuid, p_plato uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if p_plato is not null and not exists (select 1 from public.menu where id = p_plato and convivio_id = v.id) then
    raise exception 'Ese plato ya no está en el menú' using errcode = 'P0001';
  end if;
  update public.invitados set plato_id = p_plato where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.yo_plato(p_codigo text, p_plato uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  perform cv_activa(yo.convivio_id, 'menu');
  if p_plato is not null and not exists (select 1 from public.menu where id = p_plato and convivio_id = yo.convivio_id) then
    raise exception 'Ese plato ya no está en el menú' using errcode = 'P0001';
  end if;
  update public.invitados set plato_id = p_plato where id = yo.id;
end
$$;

create or replace function public.yo_dieta(p_codigo text, p_texto text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  perform cv_activa(yo.convivio_id, 'dieta');
  if char_length(coalesce(p_texto, '')) > 200 then
    raise exception 'El texto excede el máximo de 200 caracteres' using errcode = 'P0001';
  end if;
  update public.invitados set dieta = coalesce(ir_limpio(p_texto), '') where id = yo.id;
end
$$;

create or replace function public.admin_encuesta_agregar(p_codigo text, p_pregunta text, p_opciones text[])
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
  ops text[];
begin
  if ir_limpio(p_pregunta) is null then
    raise exception 'Escriba la pregunta' using errcode = 'P0001';
  end if;
  select array_agg(o order by n) into ops from (
    select distinct on (lower(left(ir_limpio(x), 80))) left(ir_limpio(x), 80) o, n
    from unnest(coalesce(p_opciones, '{}')) with ordinality u(x, n)
    where ir_limpio(x) is not null
    order by lower(left(ir_limpio(x), 80)), n
  ) q;
  if coalesce(array_length(ops, 1), 0) < 2 then
    raise exception 'Escriba al menos dos opciones distintas' using errcode = 'P0001';
  end if;
  if array_length(ops, 1) > 10 then
    raise exception 'La encuesta admite un máximo de 10 opciones' using errcode = 'P0001';
  end if;
  if (select count(*) from public.encuestas where convivio_id = v.id) >= 30 then
    raise exception 'Se admite un máximo de 30 encuestas' using errcode = 'P0001';
  end if;
  insert into public.encuestas (convivio_id, pregunta, opciones) values (v.id, left(ir_limpio(p_pregunta), 120), ops);
end
$$;

create or replace function public.admin_encuesta_estado(p_codigo text, p_id uuid, p_estado text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  if p_estado not in ('abierta', 'cerrada') then
    raise exception 'Estado no válido' using errcode = 'P0001';
  end if;
  update public.encuestas set estado = p_estado where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.admin_encuesta_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.encuestas where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.yo_encuesta(p_codigo text, p_id uuid, p_opcion int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  e public.encuestas;
begin
  perform cv_activa(yo.convivio_id, 'encuestas');
  select * into e from public.encuestas where id = p_id and convivio_id = yo.convivio_id;
  if not found then
    raise exception 'Esa encuesta ya no está disponible' using errcode = 'P0001';
  end if;
  if e.estado <> 'abierta' then
    raise exception 'La encuesta está cerrada' using errcode = 'P0001';
  end if;
  if p_opcion is null then
    delete from public.encuesta_votos where encuesta_id = e.id and invitado_id = yo.id;
    return;
  end if;
  if p_opcion < 0 or p_opcion >= array_length(e.opciones, 1) then
    raise exception 'Opción no válida' using errcode = 'P0001';
  end if;
  insert into public.encuesta_votos (encuesta_id, invitado_id, opcion) values (e.id, yo.id, p_opcion)
    on conflict (encuesta_id, invitado_id) do update set opcion = excluded.opcion;
end
$$;

create or replace function public.yo_viaje_ofrecer(p_codigo text, p_lugares int, p_salida text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  ocupados int;
begin
  perform cv_activa(yo.convivio_id, 'transporte');
  if p_lugares is null or p_lugares < 1 or p_lugares > 12 then
    raise exception 'Indique entre 1 y 12 lugares disponibles' using errcode = 'P0001';
  end if;
  if char_length(coalesce(p_salida, '')) > 120 then
    raise exception 'El punto de salida excede el máximo de 120 caracteres' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.viaje_pasajeros where invitado_id = yo.id) then
    raise exception 'Usted tiene un lugar reservado en otro vehículo. Libérelo antes de ofrecer el suyo.' using errcode = 'P0001';
  end if;
  select count(*) into ocupados from public.viaje_pasajeros vp join public.viajes t on t.id = vp.viaje_id where t.conductor_id = yo.id;
  if ocupados > p_lugares then
    raise exception 'Ya hay % personas registradas en su vehículo', ocupados using errcode = 'P0001';
  end if;
  insert into public.viajes (convivio_id, conductor_id, lugares, salida) values (yo.convivio_id, yo.id, p_lugares, ir_limpio(p_salida))
    on conflict (conductor_id) do update set lugares = excluded.lugares, salida = excluded.salida;
end
$$;

create or replace function public.yo_viaje_quitar(p_codigo text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  delete from public.viajes where conductor_id = yo.id;
end
$$;

create or replace function public.yo_viaje_unirse(p_codigo text, p_id uuid, p_valor boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
  t public.viajes;
begin
  perform cv_activa(yo.convivio_id, 'transporte');
  select * into t from public.viajes where id = p_id and convivio_id = yo.convivio_id;
  if not found then
    raise exception 'Ese vehículo ya no está disponible' using errcode = 'P0001';
  end if;
  if not coalesce(p_valor, false) then
    delete from public.viaje_pasajeros where viaje_id = t.id and invitado_id = yo.id;
    return;
  end if;
  if t.conductor_id = yo.id or exists (select 1 from public.viajes where conductor_id = yo.id) then
    raise exception 'Usted ofrece su propio vehículo' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.viaje_pasajeros where viaje_id = t.id and invitado_id = yo.id) then
    return;
  end if;
  if (select count(*) from public.viaje_pasajeros where viaje_id = t.id) >= t.lugares then
    raise exception 'Ese vehículo ya no tiene lugares disponibles' using errcode = 'P0001';
  end if;
  delete from public.viaje_pasajeros where invitado_id = yo.id;
  insert into public.viaje_pasajeros (viaje_id, invitado_id) values (t.id, yo.id);
end
$$;

create or replace function public.admin_viaje_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.viajes where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.yo_cancion(p_codigo text, p_cancion text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  perform cv_activa(yo.convivio_id, 'canciones');
  if ir_limpio(p_cancion) is null then
    raise exception 'Escriba la canción y el artista' using errcode = 'P0001';
  end if;
  if (select count(*) from public.canciones where invitado_id = yo.id) >= 15 then
    raise exception 'Puede sugerir un máximo de 15 canciones' using errcode = 'P0001';
  end if;
  if (select count(*) from public.canciones where convivio_id = yo.convivio_id) >= 400 then
    raise exception 'La lista de canciones está completa' using errcode = 'P0001';
  end if;
  insert into public.canciones (convivio_id, invitado_id, cancion) values (yo.convivio_id, yo.id, left(ir_limpio(p_cancion), 120));
end
$$;

create or replace function public.yo_cancion_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  delete from public.canciones where id = p_id and invitado_id = yo.id;
  if not found then
    raise exception 'Solo puede retirar sus propias sugerencias' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_cancion_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.canciones where id = p_id and convivio_id = v.id;
end
$$;

create or replace function public.cv_mensaje(p_convivio uuid, p_invitado uuid, p_texto text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if ir_limpio(p_texto) is null then
    raise exception 'Escriba su mensaje' using errcode = 'P0001';
  end if;
  if char_length(btrim(p_texto)) > 500 then
    raise exception 'El mensaje excede el máximo de 500 caracteres' using errcode = 'P0001';
  end if;
  if p_invitado is not null and (select count(*) from public.mensajes where invitado_id = p_invitado) >= 20 then
    raise exception 'Puede publicar un máximo de 20 mensajes' using errcode = 'P0001';
  end if;
  if (select count(*) from public.mensajes where convivio_id = p_convivio) >= 500 then
    raise exception 'El muro de mensajes está completo' using errcode = 'P0001';
  end if;
  insert into public.mensajes (convivio_id, invitado_id, texto) values (p_convivio, p_invitado, btrim(p_texto));
end
$$;

create or replace function public.yo_mensaje(p_codigo text, p_texto text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  perform cv_activa(yo.convivio_id, 'mensajes');
  perform cv_mensaje(yo.convivio_id, yo.id, p_texto);
end
$$;

create or replace function public.admin_mensaje(p_codigo text, p_texto text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  perform cv_mensaje(v.id, (select id from public.invitados where convivio_id = v.id and codigo = upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'))), p_texto);
end
$$;

create or replace function public.yo_mensaje_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  yo public.invitados := cv_yo(p_codigo);
begin
  delete from public.mensajes where id = p_id and invitado_id = yo.id;
  if not found then
    raise exception 'Solo puede retirar sus propios mensajes' using errcode = 'P0001';
  end if;
end
$$;

create or replace function public.admin_mensaje_quitar(p_codigo text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.convivios := cv_admin(p_codigo);
begin
  delete from public.mensajes where id = p_id and convivio_id = v.id;
end
$$;

do $$
declare
  f record;
  publicas text[] := array['entrar', 'crear_convivio', 'cv_existe'];
begin
  for f in
    select p.oid::regprocedure as firma, p.proname
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and (p.proname like 'admin\_%' or p.proname like 'yo\_%' or p.proname like 'cv\_%' or p.proname like 'ir\_%' or p.proname in ('entrar', 'crear_convivio'))
  loop
    execute format('revoke all on function %s from public, anon, authenticated', f.firma);
    if f.proname like 'admin\_%' or f.proname like 'yo\_%' or f.proname = any(publicas) then
      execute format('grant execute on function %s to anon, authenticated', f.firma);
    end if;
  end loop;
end
$$;

notify pgrst, 'reload schema';
