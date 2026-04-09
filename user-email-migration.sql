-- Migration to add user_email column to tables for email-based updates
-- Run this in Supabase SQL Editor

-- Add user_email to order table
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Add user_email to appointment table
ALTER TABLE public.appointment ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Add user_email to community_post table (if not already exists)
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Add user_email to event_registration table (if not already exists)
ALTER TABLE public.event_registration ADD COLUMN IF NOT EXISTS user_email TEXT;