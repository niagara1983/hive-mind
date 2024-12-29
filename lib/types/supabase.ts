export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      themes: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
      }
      hives: {
        Row: {
          id: string
          name: string
          description: string | null
          theme_id: string | null
          max_members: number
          created_at: string
          created_by: string
        }
      }
      hive_members: {
        Row: {
          hive_id: string
          profile_id: string
          joined_at: string
        }
      }
    }
  }
}