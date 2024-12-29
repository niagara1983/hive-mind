"use client"

import { useState, useEffect } from "react"
import { HiveService } from "@/lib/services/hive"
import { Hive } from "@/lib/types"

export function useHives() {
  const [hives, setHives] = useState<Hive[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadHives() {
      try {
        const data = await HiveService.getUserHives()
        setHives(data)
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load hives'))
      } finally {
        setIsLoading(false)
      }
    }

    loadHives()
  }, [])

  return { hives, isLoading, error }
}