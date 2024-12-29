import { Hive } from "@/lib/types"
import { HiveCard } from "./hive-card"

interface HiveListProps {
  hives: Hive[]
}

export function HiveList({ hives }: HiveListProps) {
  if (hives.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hives found. Join or create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hives.map((hive) => (
        <HiveCard key={hive.id} hive={hive} />
      ))}
    </div>
  )
}