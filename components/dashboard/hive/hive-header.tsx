"use client"

import { Users } from "lucide-react"
import { Hive } from "@/lib/types"

interface HiveHeaderProps {
  hive: Hive
}

export function HiveHeader({ hive }: HiveHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{hive.name}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          <span>{hive.memberCount} members</span>
        </div>
      </div>
      {hive.theme?.name && (
        <div className="text-sm text-muted-foreground">
          Theme: {hive.theme.name}
        </div>
      )}
      <p className="text-muted-foreground">{hive.description}</p>
    </div>
  )
}