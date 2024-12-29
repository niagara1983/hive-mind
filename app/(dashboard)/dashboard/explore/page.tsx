"use client"

import { useState } from "react"
import { useHives } from "@/hooks/use-explore-hives"
import { HiveList } from "@/components/dashboard/hive-list"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const { hives, isLoading } = useHives(search)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Explore Hives</h1>
        <p className="text-muted-foreground">Discover and join new communities</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search hives..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[200px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <HiveList hives={hives} showJoinButton />
      )}
    </div>
  )
}