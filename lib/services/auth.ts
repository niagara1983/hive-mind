import { supabase } from '@/lib/supabase/client'
import { AuthError } from '@supabase/supabase-js'

export type SignUpData = {
  email: string
  password: string
  fullName: string
}

export class AuthService {
  static async signUp({ email, password, fullName }: SignUpData) {
    // 1. Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) throw signUpError
    if (!authData.user) throw new Error('No user data returned')

    // 2. Get the session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) throw sessionError
    if (!sessionData.session) throw new Error('No session established')

    // 3. Create the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (profileError) throw profileError

    return { user: authData.user }
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}