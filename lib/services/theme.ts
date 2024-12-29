import { supabase } from '@/lib/supabase/client'
import { Theme } from '@/lib/types'

export class ThemeService {
  static async getThemes(): Promise<Theme[]> {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }
}