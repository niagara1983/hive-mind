import { supabase } from '@/lib/supabase/client'

type OnboardingData = {
  themeId: string
  bio?: string
}

export class OnboardingService {
  static async completeOnboarding({ themeId, bio }: OnboardingData) {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('No authenticated user')

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) throw profileError
  }
}