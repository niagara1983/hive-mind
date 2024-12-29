"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateHiveForm } from "./create-hive-form"

export function CreateHiveButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Hive
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Hive</DialogTitle>
          <DialogDescription>
            Create a supportive community focused on mental health and well-being.
          </DialogDescription>
        </DialogHeader>
        <CreateHiveForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}