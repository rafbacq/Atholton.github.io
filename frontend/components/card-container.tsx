import type React from "react"
import { cn } from "@/lib/utils"

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

export function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  )
}