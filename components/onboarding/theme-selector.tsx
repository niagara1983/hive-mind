"use client"

import { useEffect, useState } from "react"
import { ThemeService } from "@/lib/services/theme"
import { Theme } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ThemeSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadThemes() {
      try {
        const themes = await ThemeService.getThemes()
        setThemes(themes)
      } catch (error) {
        setError("Failed to load themes")
      }
    }
    loadThemes()
  }, [])

  if (error) {
    return <div className="text-destructive">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={cn(
            "relative flex flex-col items-start p-6 rounded-lg border-2 cursor-pointer transition-colors",
            value === theme.id
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-primary/50"
          )}
          onClick={() => onChange(theme.id)}
        >
          <h3 className="font-semibold">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">{theme.description}</p>
          {value === theme.id && (
            <Check className="absolute top-4 right-4 h-5 w-5 text-primary" />
          )}
        </div>
      ))}
    </div>
  )
}