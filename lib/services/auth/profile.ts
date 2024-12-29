import { supabase } from '@/lib/supabase/client'

export async function createProfile(userId: string, fullName: string) {
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      full_name: fullName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Profile creation error:', error)
    throw new Error('Failed to create profile')
  }
}