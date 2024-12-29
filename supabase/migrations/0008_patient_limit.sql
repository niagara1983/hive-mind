-- Remove the get_hive_member_count function as we're using direct counts
DROP FUNCTION IF EXISTS get_hive_member_count;

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_hive_members_composite 
ON hive_members(hive_id, profile_id);

-- Update policies to ensure proper access
CREATE OR REPLACE POLICY "Allow viewing all hives"
ON hives FOR SELECT
USING (true);

CREATE OR REPLACE POLICY "Allow viewing own memberships"
ON hive_members FOR SELECT
USING (
  profile_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM hives
    WHERE hives.id = hive_members.hive_id
    AND hives.created_by = auth.uid()
  )
);