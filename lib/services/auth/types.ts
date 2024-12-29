import { User } from '@supabase/supabase-js'

export type SignUpData = {
  email: string
  password: string
  fullName: string
}

export type AuthResult = {
  user: User | null
  error?: Error
}