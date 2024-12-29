"use client"

import { HiveList } from "@/components/dashboard/hive-list"
import { HiveStats } from "@/components/dashboard/stats/hive-stats"
import { CreateHiveButton } from "@/components/dashboard/create-hive-button"
import { useHives } from "@/hooks/use-hives"

export default function DashboardPage() {
  const { hives, isLoading } = useHives()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your hive dashboard</p>
        </div>
        <CreateHiveButton />
      </div>

      <HiveStats />
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[200px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <HiveList hives={hives} />
      )}
    </div>
  )
}