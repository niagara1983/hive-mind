export interface Theme {
  id: string
  name: string
  description: string | null
  created_at: string
}

export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Hive {
  id: string
  name: string
  description: string | null
  theme_id: string | null
  created_at: string
  created_by: string
  memberCount: number
}