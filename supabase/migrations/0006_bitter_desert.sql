/*
  # Fix hive_members policies

  1. Changes
    - Remove recursive policy for hive_members
    - Add simplified policies for better security and performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Hive members can view their membership" ON hive_members;
DROP POLICY IF EXISTS "Users can join hives" ON hive_members;

-- Create new, non-recursive policies
CREATE POLICY "Users can view their own memberships"
  ON hive_members FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Hive creators can view all members"
  ON hive_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM hives
      WHERE id = hive_id
      AND created_by = auth.uid()
    )
  );

CREATE POLICY "Users can join available hives"
  ON hive_members FOR INSERT
  WITH CHECK (
    auth.uid() = profile_id
    AND
    NOT EXISTS (
      SELECT 1 FROM hive_members
      WHERE hive_id = hive_members.hive_id
      AND profile_id = hive_members.profile_id
    )
  );