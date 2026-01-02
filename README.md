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

### RLS policies for admin management
Allow admins to read and update any profile. These policies assume the logged-in user has a `profiles` row with `role = 'admin'`.

```sql
-- Admins can read all profiles
create policy "admin read all profiles" on public.profiles
	for select using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
	);

-- Admins can update any profile
create policy "admin update all profiles" on public.profiles
	for update using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
	);
```

If you previously created restrictive policies, review them to ensure they don't block admin operations.

### Enable partial ID search (prefix) with LOWER()
## Teacher role features
- Screens (Home → Teacher section):
	- Teacher Dashboard: overview of courses/sections and pending grade submissions.
	- My Courses: lists teacher’s courses/sections.
	- Grade Submissions: show pending items and submit grades.
- API tables/views (suggested):
	- `teacher_courses(teacher_id uuid, code text, name text, section text, schedule text)`
	- `pending_submissions(id uuid, teacher_id uuid, student_id text, student_name text, course text, section text, assignment text, grade text, status text)`
- RLS ideas:
	- Teachers can select rows where `teacher_id = auth.uid()`.
	- Updates on `pending_submissions` allowed for their rows.

Example RLS policies:
```sql
alter table public.teacher_courses enable row level security;
create policy "teacher read own courses" on public.teacher_courses
	for select using (teacher_id = auth.uid());

alter table public.pending_submissions enable row level security;
create policy "teacher read own submissions" on public.pending_submissions
	for select using (teacher_id = auth.uid());
create policy "teacher update own submissions" on public.pending_submissions
	for update using (teacher_id = auth.uid());
```

## Registrar role features
- Screens (Home → Registrar quick actions):
	- Registrar Dashboard: overview of pending add/drop requests, payments, approvals today.
	- Add/Drop Requests: approve or reject course change requests.
	- Payment Review: verify pending tuition/fee payments.
- API tables/views (suggested):
	- `add_drop_requests(id uuid, student_id text, student_name text, course text, action text, reason text, status text, created_at timestamptz)`
	- `payments(id uuid, student_id text, student_name text, label text, amount numeric, date date, status text)`
	- optional RPC `registrar_metrics(registrar_id uuid)` returning counts.
- RLS ideas:
	- Registrar can select pending rows for review (`status = 'pending'`).
	- Registrar can update status to `approved|rejected` for add/drop and `verified` for payments.

Example RLS policies:
```sql
alter table public.add_drop_requests enable row level security;
create policy "registrar read pending add_drop" on public.add_drop_requests
	for select using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'registrar') and status = 'pending'
	);
create policy "registrar update add_drop" on public.add_drop_requests
	for update using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'registrar')
	);

alter table public.payments enable row level security;
create policy "registrar read pending payments" on public.payments
	for select using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'registrar') and status = 'pending'
	);
create policy "registrar verify payments" on public.payments
	for update using (
		exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'registrar')
	);
```

Because `id` is a UUID, Postgres won't match it with `ILIKE`. Create a view that exposes `id_text` and LOWER-based columns for index-friendly case-insensitive prefix matching:

```sql
create or replace view public.profiles_search as
select
	id,
	full_name,
	role,
	id::text as id_text,
	lower(full_name) as full_name_lower,
	lower(id::text) as id_text_lower
from public.profiles;

grant select on public.profiles_search to authenticated;

-- Optional: expression indexes to accelerate prefix searches
create index if not exists profiles_full_name_lower_idx on public.profiles (lower(full_name));
create index if not exists profiles_id_text_lower_idx on public.profiles ((lower(id::text)));
```

In the app, search uses `full_name_lower LIKE %lower(query)% OR id_text_lower LIKE %lower(query)%` when the view exists.
If the view isn't present, it falls back to `full_name ILIKE` and exact `id = query`.

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
