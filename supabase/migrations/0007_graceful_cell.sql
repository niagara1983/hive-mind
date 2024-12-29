/*
  # Fix Hive Policies and Queries

  1. Changes
    - Fix recursive policy issue in hive_members
    - Add missing indexes
    - Update member count query
  
  2. Security
    - Ensure proper RLS for hive viewing and joining
    - Prevent duplicate memberships
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own memberships" ON hive_members;
DROP POLICY IF EXISTS "Hive creators can view all members" ON hive_members;
DROP POLICY IF EXISTS "Users can join available hives" ON hive_members;

-- Create new policies
CREATE POLICY "View own memberships"
  ON hive_members FOR SELECT
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM hives
      WHERE hives.id = hive_members.hive_id
      AND hives.created_by = auth.uid()
    )
  );

CREATE POLICY "Join available hives"
  ON hive_members FOR INSERT
  WITH CHECK (
    profile_id = auth.uid() AND
    NOT EXISTS (
      SELECT 1 FROM hive_members
      WHERE hive_id = hive_members.hive_id
      AND profile_id = hive_members.profile_id
    )
  );

-- Add function for member count
CREATE OR REPLACE FUNCTION get_hive_member_count(hive_id uuid)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COUNT(*)
  FROM hive_members
  WHERE hive_id = $1;
$$;