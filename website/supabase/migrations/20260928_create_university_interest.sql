-- Applied in the S/Agency Supabase project for the planned Spring 2027 interest cohort.
create table if not exists public.university_interest (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  semester text not null default 'spring_2027' check (semester = 'spring_2027'),
  first_name text not null check (char_length(trim(first_name)) between 1 and 100),
  last_name text not null check (char_length(trim(last_name)) between 1 and 100),
  email text not null check (char_length(email) between 5 and 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  phone text check (phone is null or char_length(phone) <= 40),
  area_of_interest text not null check (area_of_interest in ('agent_engineering','agent_leadership','research','undecided')),
  contact_consent boolean not null check (contact_consent = true),
  status text not null default 'interested' check (status = 'interested'),
  constraint university_interest_email_semester_unique unique(email, semester)
);
alter table public.university_interest enable row level security;
revoke all on public.university_interest from anon, authenticated;
grant insert (semester, first_name, last_name, email, phone, area_of_interest, contact_consent) on public.university_interest to anon, authenticated;
create policy "Public can register interest" on public.university_interest for insert to anon, authenticated with check (semester = 'spring_2027' and contact_consent = true and status = 'interested');
