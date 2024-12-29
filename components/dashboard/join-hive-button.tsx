"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { HiveService } from "@/lib/services/hive"

interface JoinHiveButtonProps {
  hiveId: string
  onSuccess?: () => void
}

export function JoinHiveButton({ hiveId, onSuccess }: JoinHiveButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleJoin() {
    try {
      setIsLoading(true)
      await HiveService.joinHive(hiveId)
      
      toast({
        title: "Success",
        description: "You've joined the hive!",
      })
      
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join hive. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleJoin} disabled={isLoading}>
      <Plus className="mr-2 h-4 w-4" />
      {isLoading ? "Joining..." : "Join Hive"}
    </Button>
  )
}