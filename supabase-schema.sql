-- =====================================================
-- Pets & Care Hub - Complete Supabase Schema
-- Run this in your Supabase SQL Editor to create all tables
-- =====================================================

-- Drop existing tables to start fresh (fixes column mismatch errors)
DROP TABLE IF EXISTS public.order CASCADE;
DROP TABLE IF EXISTS public.community_post CASCADE;
DROP TABLE IF EXISTS public.appointment CASCADE;
DROP TABLE IF EXISTS public.grooming_service CASCADE;
DROP TABLE IF EXISTS public.clinic CASCADE;
DROP TABLE IF EXISTS public.app_user CASCADE;
DROP TABLE IF EXISTS public.event_registration CASCADE;
DROP TABLE IF EXISTS public.admin CASCADE;
DROP TABLE IF EXISTS public.pets CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ADMIN TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.admin (
  admin_id BIGSERIAL PRIMARY KEY,
  fname TEXT,
  lname TEXT,
  email TEXT UNIQUE NOT NULL,
  user_name TEXT,
  password TEXT,
  contact_no TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on admin" ON public.admin FOR SELECT USING (true);
CREATE POLICY "Allow public insert on admin" ON public.admin FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on admin" ON public.admin FOR UPDATE USING (true);

-- =====================================================
-- APP_USER TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.app_user (
  user_id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  auth_provider TEXT DEFAULT 'otp',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.app_user ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on app_user" ON public.app_user FOR SELECT USING (true);
CREATE POLICY "Allow public insert on app_user" ON public.app_user FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on app_user" ON public.app_user FOR UPDATE USING (true);

-- =====================================================
-- PETS TABLE (Replaced with event_registration)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.event_registration (
  registration_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.app_user(user_id) ON DELETE SET NULL,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  event_type TEXT NOT NULL,
  event_title TEXT NOT NULL,
  pet_name TEXT,
  pet_type TEXT,
  pet_breed TEXT,
  pet_age TEXT,
  owner_name TEXT,
  notes TEXT,
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.event_registration ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on event_registration" ON public.event_registration FOR SELECT USING (true);
CREATE POLICY "Allow public insert on event_registration" ON public.event_registration FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on event_registration" ON public.event_registration FOR UPDATE USING (true);

-- =====================================================
-- CLINIC TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.clinic (
  clinic_id BIGSERIAL PRIMARY KEY,
  clinic_name TEXT NOT NULL,
  clinic_address TEXT,
  contact_no TEXT,
  email TEXT,
  vet_name TEXT,
  area TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.clinic ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on clinic" ON public.clinic FOR SELECT USING (true);
CREATE POLICY "Allow public insert on clinic" ON public.clinic FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on clinic" ON public.clinic FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on clinic" ON public.clinic FOR DELETE USING (true);

-- =====================================================
-- SERVICE TABLE (Grooming Services)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.grooming_service (
  service_id BIGSERIAL PRIMARY KEY,
  service_provider TEXT NOT NULL,
  service_address TEXT,
  contact_no TEXT,
  email TEXT,
  area TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.grooming_service ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on grooming_service" ON public.grooming_service FOR SELECT USING (true);
CREATE POLICY "Allow public insert on grooming_service" ON public.grooming_service FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on grooming_service" ON public.grooming_service FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on grooming_service" ON public.grooming_service FOR DELETE USING (true);

-- =====================================================
-- PETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.pets (
  pets_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.app_user(user_id) ON DELETE SET NULL,
  pet_name TEXT NOT NULL,
  pet_type TEXT,
  pet_breed TEXT,
  pet_age TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on pets" ON public.pets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on pets" ON public.pets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on pets" ON public.pets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on pets" ON public.pets FOR DELETE USING (true);

-- =====================================================
-- APPOINTMENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.appointment (
  appointment_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.app_user(user_id) ON DELETE SET NULL,
  clinic_id BIGINT REFERENCES public.clinic(clinic_id) ON DELETE SET NULL,
  pet_id BIGINT REFERENCES public.pets(pets_id) ON DELETE SET NULL,
  user_name TEXT,
  user_phone TEXT,
  clinic_name TEXT,
  clinic_address TEXT,
  pet_name TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'scheduled',
  service_type TEXT DEFAULT 'vet',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.appointment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on appointment" ON public.appointment FOR SELECT USING (true);
CREATE POLICY "Allow public insert on appointment" ON public.appointment FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on appointment" ON public.appointment FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on appointment" ON public.appointment FOR DELETE USING (true);

-- =====================================================
-- ORDER TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.order (
  order_id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE,
  order_name TEXT,
  user_id BIGINT REFERENCES public.app_user(user_id) ON DELETE SET NULL,
  user_name TEXT,
  quantity INTEGER DEFAULT 1,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.order ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on order" ON public.order FOR SELECT USING (true);
CREATE POLICY "Allow public insert on order" ON public.order FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on order" ON public.order FOR UPDATE USING (true);

-- =====================================================
-- COMMUNITY_POST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.community_post (
  post_id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  type TEXT,
  area TEXT,
  status TEXT DEFAULT 'active',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.community_post ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on community_post" ON public.community_post FOR SELECT USING (true);
CREATE POLICY "Allow public insert on community_post" ON public.community_post FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on community_post" ON public.community_post FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on community_post" ON public.community_post FOR DELETE USING (true);

-- =====================================================
-- SEED CLINIC DATA
-- =====================================================
INSERT INTO public.clinic (clinic_name, clinic_address, contact_no, area, vet_name) VALUES
  ('Sneh Pet Hospital', 'Trinity Complex, Hebatpur Rd, Thaltej', '+91 79 2685 4321', 'Thaltej', 'Dr. Sneh'),
  ('Dr. Chirag Dave''s Pet Clinic', 'Ravija Plaza, Thaltej-Shilaj Rd', '+91 79 2685 7890', 'Thaltej', 'Dr. Chirag Dave'),
  ('Dr. Tina Giri''s Vet Clinic', 'Akshar Complex, Jodhpur Village', '+91 79 2630 1234', 'Satellite', 'Dr. Tina Giri'),
  ('Dr. J.D.''s Pet Clinic', 'Shaktikrupa Society Part-2, Chandkheda', '+91 79 2764 5678', 'Chandkheda', 'Dr. J.D.'),
  ('Dr. Gautam''s Dog Clinic & Hospital', 'Tragad Rd, Chandkheda', '+91 79 2764 9012', 'Chandkheda', 'Dr. Gautam'),
  ('Caring Paws Vet Clinic & Surgical Centre', 'Panjara Pol, Ambawadi', '+91 79 2656 3456', 'Ambawadi', 'Dr. Caring Paws'),
  ('Woofy & Vet Pet Clinic and Shop', 'New CG Rd, Chandkheda', '+91 79 2764 7890', 'Chandkheda', 'Dr. Woofy'),
  ('BestBuds Pet Hospital', 'New Sharda Mandir Rd, Paldi', '+91 79 2658 1234', 'Paldi', 'Dr. BestBuds'),
  ('Pets & Paws Vet Hospital', 'Maple Tree, Sal Hospital Rd, Thaltej', '+91 79 2685 5678', 'Thaltej', 'Dr. Pets Paws'),
  ('New Hope Animal Hospital', 'Om Tower, Satellite Rd', '+91 79 2630 9876', 'Satellite', 'Dr. New Hope')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED GROOMING SERVICE DATA
-- =====================================================
INSERT INTO public.grooming_service (service_provider, service_address, contact_no, area) VALUES
  ('JUST DOGS - Nehrunagar', 'Nehrunagar, Ahmedabad', '+91 79 2630 1111', 'Nehrunagar'),
  ('JUST DOGS - Maninagar', 'Maninagar, Ahmedabad', '+91 79 2546 2222', 'Maninagar'),
  ('Companion Pets', 'Ramdevnagar Road, Satellite', '+91 79 2630 3333', 'Satellite'),
  ('Dog Zone (Dogambo)', 'Near Jitendra Shopping Center, Ghatlodiya', '+91 79 2758 4444', 'Ghatlodiya'),
  ('Pet Paws Ahmedabad', 'Sarkhej-Gandhinagar Highway', '+91 79 2630 5555', 'Satellite'),
  ('Smart Doggys', 'Premchand Nagar, Bodakdev', '+91 79 2685 6666', 'Bodakdev'),
  ('House Of Furr', 'Vasundhra Colony, Gulbai Tekra', '+91 79 2630 7777', 'Vasundhra Colony'),
  ('DogsHostel', 'Bopal, Ahmedabad', '+91 79 2970 8888', 'Bopal')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED ADMIN USER
-- =====================================================
INSERT INTO public.admin (fname, lname, email, password, contact_no, address, user_name) VALUES
  ('Admin', 'User', 'admin@123', 'admin123', '+91-9876543210', 'Ahmedabad', 'admin_user')
ON CONFLICT (email) DO NOTHING;
