import { supabase } from '@/lib/supabase/client'
import { Hive } from '@/lib/types'

export class HiveService {
  static async getUserHives(): Promise<Hive[]> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('hive_members')
      .select(`
        hive:hives (
          id,
          name,
          description,
          theme:themes (
            id,
            name
          ),
          created_at,
          created_by,
          member_count:hive_members!inner(count)
        )
      `)
      .eq('profile_id', user.id)

    if (error) throw error
    return data?.map(item => ({
      ...item.hive,
      memberCount: item.hive.member_count[0].count
    })) || []
  }

  static async getHiveStats() {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    const { data: memberData, error: memberError } = await supabase
      .from('hive_members')
      .select('hive_id')
      .eq('profile_id', user.id)

    if (memberError) throw memberError

    const totalHives = memberData.length
    const activeMembers = totalHives * 5 // Placeholder for demo
    const completionRate = 85 // Placeholder for demo

    return {
      totalHives,
      activeMembers,
      completionRate,
    }
  }

  static async getHive(id: string): Promise<Hive> {
    const { data, error } = await supabase
      .from('hives')
      .select(`
        *,
        theme:themes (
          id,
          name
        ),
        member_count:hive_members(count)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    
    return {
      ...data,
      memberCount: data.member_count[0].count
    }
  }

  static async getExploreHives(search: string = ""): Promise<Hive[]> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    let query = supabase
      .from('hives')
      .select(`
        *,
        theme:themes (
          id,
          name
        ),
        member_count:hive_members(count)
      `)
      .not('id', 'in', (
        supabase
          .from('hive_members')
          .select('hive_id')
          .eq('profile_id', user.id)
      ))

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error
    return data?.map(hive => ({
      ...hive,
      memberCount: hive.member_count[0].count
    })) || []
  }

  static async joinHive(hiveId: string): Promise<void> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    const { error } = await supabase
      .from('hive_members')
      .insert({
        hive_id: hiveId,
        profile_id: user.id
      })

    if (error) throw error
  }

  static async createHive(data: {
    name: string
    description: string
    themeId: string
  }): Promise<Hive> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    const { data: hive, error } = await supabase
      .from('hives')
      .insert({
        name: data.name,
        description: data.description,
        theme_id: data.themeId,
        created_by: user.id
      })
      .select(`
        *,
        theme:themes (
          id,
          name
        ),
        member_count:hive_members(count)
      `)
      .single()

    if (error) throw error

    // Add creator as first member
    const { error: memberError } = await supabase
      .from('hive_members')
      .insert({
        hive_id: hive.id,
        profile_id: user.id
      })

    if (memberError) throw memberError

    return {
      ...hive,
      memberCount: 1
    }
  }
}