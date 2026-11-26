insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('convivio-fotos', 'convivio-fotos', true, 6291456, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "convivio subir fotos" on storage.objects;
create policy "convivio subir fotos" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'convivio-fotos' and public.cv_existe((storage.foldername(name))[1]));
