import type React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, description, className, action }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4", className)}>
      <div>
        <h2 className="text-2xl font-display tracking-wide text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}