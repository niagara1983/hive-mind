"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { HiveService } from "@/lib/services/hive"
import { Hive } from "@/lib/types"
import { HiveHeader } from "./hive-header"
import { HiveContent } from "./hive-content"
import { useAuth } from "@/hooks/use-auth"

export function HivePage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading: isAuthLoading } = useAuth()
  const [hive, setHive] = useState<Hive | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login')
      return
    }

    async function loadHive() {
      try {
        const data = await HiveService.getHive(params.id as string)
        setHive(data)
      } catch (error) {
        setError("Failed to load hive")
        console.error("Failed to load hive:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id && user) {
      loadHive()
    }
  }, [params.id, user, isAuthLoading, router])

  if (isAuthLoading || isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-20 bg-muted rounded-lg" />
      <div className="h-[400px] bg-muted rounded-lg" />
    </div>
  }

  if (error) {
    return <div className="text-destructive">{error}</div>
  }

  if (!hive) {
    return <div>Hive not found</div>
  }

  return (
    <div className="space-y-8">
      <HiveHeader hive={hive} />
      <HiveContent hive={hive} />
    </div>
  )
}