import { Metadata } from "next"
import { HivePage } from "@/components/dashboard/hive/hive-page"

export const metadata: Metadata = {
  title: "Hive Details - HiveMind",
  description: "View and interact with your hive community",
}

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  return []
}

export default function Page() {
  return <HivePage />
}