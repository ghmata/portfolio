import type { LucideIcon } from "lucide-react"

export interface Project {
  id: number
  name: string
  subtitle: string
  category?: "ai_automation" | "web_saas" | "desktop_pwa" | "landing_pages"
  client?: string | null
  description: string
  fullDescription: string
  problem?: string
  solution?: string
  metrics?: string
  image: string
  images?: string[]
  imagePosition?: string
  imageType?: "desktop" | "mobile"
  technologies: string[]
  features: string[]
  status: string
  isMobile?: boolean
  githubUrl?: string | null
}

export interface ShowcaseFeature {
  icon: LucideIcon
  label: string
  desc: string
}
