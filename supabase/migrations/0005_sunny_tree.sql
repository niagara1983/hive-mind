/*
  # Fix Hive Relationships

  1. Changes
    - Add ON DELETE CASCADE to foreign key references
    - Add missing indexes for performance
    - Update RLS policies for better security
*/

-- Ensure proper foreign key relationships
ALTER TABLE public.hive_members
  DROP CONSTRAINT IF EXISTS hive_members_hive_id_fkey,
  DROP CONSTRAINT IF EXISTS hive_members_profile_id_fkey,
  ADD CONSTRAINT hive_members_hive_id_fkey 
    FOREIGN KEY (hive_id) 
    REFERENCES public.hives(id) 
    ON DELETE CASCADE,
  ADD CONSTRAINT hive_members_profile_id_fkey 
    FOREIGN KEY (profile_id) 
    REFERENCES public.profiles(id) 
    ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hives_created_by ON public.hives(created_by);
CREATE INDEX IF NOT EXISTS idx_hives_theme_id ON public.hives(theme_id);

-- Update RLS policies
ALTER TABLE public.hives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all hives"
  ON public.hives FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create hives"
  ON public.hives FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Hive creators can update their hives"
  ON public.hives FOR UPDATE
  USING (auth.uid() = created_by);