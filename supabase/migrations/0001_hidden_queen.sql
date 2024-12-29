/*
  # Initial Schema Setup for HiveMind

  1. Authentication
    - Using Supabase Auth for user management
    - Extended user profiles with additional mental health preferences
  
  2. Tables
    - profiles: Extended user profile information
    - hives: Groups users can join
    - hive_members: Tracks hive membership
    - themes: Categories for hives (anxiety, depression, etc.)
*/

-- Create tables with RLS enabled
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.themes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table public.hives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  theme_id uuid references public.themes(id),
  max_members int default 20,
  created_at timestamptz default now(),
  created_by uuid references public.profiles(id)
);

create table public.hive_members (
  hive_id uuid references public.hives(id),
  profile_id uuid references public.profiles(id),
  joined_at timestamptz default now(),
  primary key (hive_id, profile_id)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.themes enable row level security;
alter table public.hives enable row level security;
alter table public.hive_members enable row level security;

-- Secure the tables
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Themes are viewable by everyone"
  on themes for select
  using (true);

create policy "Hives are viewable by everyone"
  on hives for select
  using (true);

create policy "Authenticated users can create hives"
  on hives for insert
  with check (auth.role() = 'authenticated');

create policy "Hive members can view their membership"
  on hive_members for select
  using (
    auth.uid() = profile_id
    or 
    exists (
      select 1 from hives 
      where id = hive_members.hive_id 
      and created_by = auth.uid()
    )
  );

create policy "Users can join hives"
  on hive_members for insert
  with check (
    auth.uid() = profile_id
    and
    (
      select count(*) from hive_members 
      where hive_id = hive_members.hive_id
    ) < (
      select max_members from hives 
      where id = hive_members.hive_id
    )
  );

-- Insert initial themes
insert into public.themes (name, description) values
  ('Anxiety Management', 'Support for managing anxiety and stress'),
  ('Depression Support', 'Community for those dealing with depression'),
  ('Sleep Improvement', 'Focus on developing better sleep habits'),
  ('Social Anxiety', 'Help with social anxiety and building connections'),
  ('Mindfulness', 'Practice mindfulness and meditation together');