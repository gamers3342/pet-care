-- Fix RLS for user deletion
-- Run this in Supabase SQL Editor

-- Add DELETE policy for app_user table so admin can delete users
DROP POLICY IF EXISTS "Allow public delete on app_user" ON public.app_user;
CREATE POLICY "Allow public delete on app_user" ON public.app_user FOR DELETE USING (true);

-- Also add for other tables that might need deletion
DROP POLICY IF EXISTS "Allow public delete on order" ON public.order;
CREATE POLICY "Allow public delete on order" ON public.order FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public delete on appointment" ON public.appointment;
CREATE POLICY "Allow public delete on appointment" ON public.appointment FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public delete on community_post" ON public.community_post;
CREATE POLICY "Allow public delete on community_post" ON public.community_post FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public delete on event_registration" ON public.event_registration;
CREATE POLICY "Allow public delete on event_registration" ON public.event_registration FOR DELETE USING (true);