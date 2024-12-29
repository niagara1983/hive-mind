"use client"

import { Card } from "@/components/ui/card"
import { Hive } from "@/lib/types"

interface HiveContentProps {
  hive: Hive
}

export function HiveContent({ hive }: HiveContentProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No recent activity</p>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <p className="text-muted-foreground">Loading members...</p>
      </Card>
    </div>
  )
}