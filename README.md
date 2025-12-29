# Harambee University Portal (Mobile & Web)

Expo + React Native + TypeScript student portal using Supabase for auth/data, NativeWind for styling, and React Navigation for flows. Runs on iOS/Android and web.

## Roles (RBAC)
- Roles: `student`, `teacher`, `admin`, `head`, `registrar`.
- Screens and actions are gated by role via a lightweight guard. Tabs and stack screens are wrapped to restrict access.

### Admin screen
- Role management UI is available to `admin` via Home → Role Management.
- Lists `profiles` rows and lets admins update `role` inline.

### Supabase setup
1. Configure environment in `app.json` under `expo.extra` with `SUPABASE_URL` and `SUPABASE_ANON_KEY` (EAS/CI env vars).
2. Add a `profiles` table with a `role` column:

```sql
create table if not exists public.profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	full_name text,
	role text check (role in ('student','teacher','admin','head','registrar')) default 'student'
);

alter table public.profiles enable row level security;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
create policy "update own profile" on public.profiles for update using (auth.uid() = id);
```

3. Set a user's role by inserting/updating their profile:

```sql
insert into public.profiles (id, full_name, role)
values ('<user-id-uuid>', 'Jane Doe', 'teacher')
on conflict (id) do update set role = excluded.role;
```

The app first tries `profiles.role`; if missing, it falls back to `session.user.app_metadata.role` and defaults to `student`.

### Seed sample users
Create auth users (Dashboard or CLI) and then add their profiles:

```sql
-- Replace with actual auth.users ids
insert into public.profiles (id, full_name, role) values
	('00000000-0000-0000-0000-000000000001', 'Student One', 'student'),
	('00000000-0000-0000-0000-000000000002', 'Teacher Two', 'teacher'),
	('00000000-0000-0000-0000-000000000003', 'Admin Three', 'admin'),
	('00000000-0000-0000-0000-000000000004', 'Head Four', 'head'),
	('00000000-0000-0000-0000-000000000005', 'Registrar Five', 'registrar')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role;
```

Notes:
- If using the Dashboard, create users in Authentication → Users to get their UUIDs.
- Alternatively, sign up in the app (Login/Signup flow), then insert/update the matching `profiles` row.

## Run

```bash
# install deps
npm install

# run mobile (choose platform in Expo Dev Tools)
npx expo start

# run web
npx expo start --web
```

## Notes
- Uses `expo-secure-store` for persisted Supabase sessions.
- Web bundler is `metro` (`app.json`).
- Styling uses NativeWind classes.
