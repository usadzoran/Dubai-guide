export const SUPABASE_SCHEMA_SQL = `-- ========================================================
-- DubaiStart Database Schema (PostgreSQL / Supabase Ready)
-- Run this migration in Supabase SQL Editor to connect
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table if not exists categories (
    id text primary key,
    label_ar text not null,
    label_en text not null,
    icon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. JOBS TABLE
create table if not exists jobs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    company text not null,
    location text not null,
    category text not null,
    employment_type text check (employment_type in ('Full Time', 'Part Time', 'Contract')),
    experience text,
    salary text,
    source_name text default 'LinkedIn',
    source_url text not null,
    date_found text,
    status text check (status in ('active', 'check_status', 'expired')) default 'active',
    description text,
    requirements jsonb default '[]'::jsonb,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. HOUSING LISTINGS TABLE
create table if not exists housing (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    type text check (type in ('bed_space', 'shared_room', 'partition', 'private_room', 'studio')),
    price numeric not null,
    area text not null,
    address text not null,
    near_metro boolean default false,
    metro_station text,
    metro_walk_minutes integer,
    verification_status text check (verification_status in ('verified', 'check_before_payment', 'suspicious')) default 'check_before_payment',
    verification_note text,
    bills_included boolean default true,
    images text[] default '{}',
    contact_phone text,
    whatsapp text,
    amenities text[] default '{}',
    gender text check (gender in ('men', 'women', 'any')) default 'any',
    description text,
    date_posted text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. RECRUITMENT OFFICES TABLE
create table if not exists recruitment_offices (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    address text not null,
    area text not null,
    phone text,
    website text,
    google_maps_url text,
    category text default 'Recruitment Agency',
    specializations text[] default '{}',
    rating numeric(3,2),
    reviews_count integer default 0,
    opening_hours text,
    verification_label text not null,
    notes text,
    latitude double precision,
    longitude double precision,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. LOCATIONS & MAP POINTS TABLE
create table if not exists locations (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    point_type text check (point_type in ('job', 'recruitment', 'housing', 'metro', 'service')),
    category text,
    latitude double precision not null,
    longitude double precision not null,
    address text,
    phone text,
    website text,
    extra_info text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. USER FRAUD REPORTS TABLE
create table if not exists reports (
    id uuid default uuid_generate_v4() primary key,
    report_type text not null,
    target_title text not null,
    contact_provided text,
    details text not null,
    status text check (status in ('pending', 'reviewed', 'blocked')) default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ADMINS & ROLES
create table if not exists admins (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    role text default 'admin',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. APPLICATION SETTINGS
create table if not exists settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table jobs enable row level security;
alter table housing enable row level security;
alter table recruitment_offices enable row level security;
alter table locations enable row level security;
alter table reports enable row level security;

-- Public can read verified items
create policy "Allow public read-only for jobs" on jobs for select using (true);
create policy "Allow public read-only for housing" on housing for select using (true);
create policy "Allow public read-only for offices" on recruitment_offices for select using (true);
create policy "Allow public read-only for locations" on locations for select using (true);
-- Public can submit reports
create policy "Allow public to insert reports" on reports for insert with check (true);
`;
