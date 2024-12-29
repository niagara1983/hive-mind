import { supabase } from '@/lib/supabase/client'
import { SignUpData, AuthResult } from './types'
import { createProfile } from './profile'

export class AuthService {
  static async signUp({ email, password, fullName }: SignUpData): Promise<AuthResult> {
    try {
      // 1. Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('No user data returned')

      // 2. Create the profile
      await createProfile(authData.user.id, fullName)

      return { user: authData.user }
    } catch (error) {
      console.error('Sign up error:', error)
      return {
        user: null,
        error: error instanceof Error ? error : new Error('Failed to sign up')
      }
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { user: data.user }
    } catch (error) {
      console.error('Sign in error:', error)
      return {
        user: null,
        error: error instanceof Error ? error : new Error('Failed to sign in')
      }
    }
  }
}