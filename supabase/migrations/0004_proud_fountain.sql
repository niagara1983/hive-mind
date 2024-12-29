/*
  # Fix Foreign Key Relationships

  1. Changes
    - Add proper foreign key relationships between hive_members and hives tables
    - Add missing foreign key constraints
    - Add indexes for better query performance

  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing hive_members table if it exists
DROP TABLE IF EXISTS public.hive_members;

-- Recreate hive_members table with proper foreign keys
CREATE TABLE public.hive_members (
  hive_id uuid REFERENCES public.hives(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (hive_id, profile_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hive_members_hive_id ON public.hive_members(hive_id);
CREATE INDEX IF NOT EXISTS idx_hive_members_profile_id ON public.hive_members(profile_id);

-- Enable RLS
ALTER TABLE public.hive_members ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Hive members can view their membership"
  ON hive_members FOR SELECT
  USING (
    auth.uid() = profile_id
    OR 
    EXISTS (
      SELECT 1 FROM hives 
      WHERE id = hive_members.hive_id 
      AND created_by = auth.uid()
    )
  );

CREATE POLICY "Users can join hives"
  ON hive_members FOR INSERT
  WITH CHECK (
    auth.uid() = profile_id
    AND
    (
      SELECT count(*) FROM hive_members 
      WHERE hive_id = hive_members.hive_id
    ) < (
      SELECT max_members FROM hives 
      WHERE id = hive_members.hive_id
    )
  );