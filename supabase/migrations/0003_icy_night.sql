/*
  # Fix profiles table insert permissions

  1. Changes
    - Add insert policy for authenticated users
    - Ensure proper RLS for profile creation
  
  2. Security
    - Maintain existing RLS policies
    - Add specific insert policy for profile creation
*/

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create new insert policy
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id
);

-- Ensure proper permissions
GRANT INSERT ON public.profiles TO authenticated;