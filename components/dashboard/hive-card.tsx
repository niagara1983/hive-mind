"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { Hive } from "@/lib/types"
import { JoinHiveButton } from "./join-hive-button"

interface HiveCardProps {
  hive: Hive
  showJoinButton?: boolean
}

export function HiveCard({ hive, showJoinButton }: HiveCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{hive.name}</span>
          {hive.theme?.name && (
            <span className="text-sm font-normal text-muted-foreground">
              {hive.theme.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{hive.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>{hive.memberCount} members</span>
          </div>
          {showJoinButton ? (
            <JoinHiveButton hiveId={hive.id} />
          ) : (
            <Button asChild>
              <Link href={`/dashboard/hives/${hive.id}`}>View Hive</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}