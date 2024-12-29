"use client"

import { useEffect, useState } from "react"
import { Users, Activity, Target } from "lucide-react"
import { HiveService } from "@/lib/services/hive"
import { LoadingStats } from "./loading-stats"
import { StatCard } from "./stat-card"
import { useAuth } from "@/hooks/use-auth"

interface Stats {
  totalHives: number
  activeMembers: number
  completionRate: number
}

export function HiveStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({
    totalHives: 0,
    activeMembers: 0,
    completionRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      if (!user) return

      try {
        const data = await HiveService.getHiveStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to load hive stats:", error)
        setError("Failed to load stats")
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [user])

  if (error) {
    return <div className="text-destructive">{error}</div>
  }

  if (isLoading) {
    return <LoadingStats />
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Hives"
        value={stats.totalHives}
        icon={Users}
      />
      <StatCard
        title="Active Members"
        value={stats.activeMembers}
        icon={Activity}
      />
      <StatCard
        title="Completion Rate"
        value={`${stats.completionRate}%`}
        icon={Target}
      />
    </div>
  )
}