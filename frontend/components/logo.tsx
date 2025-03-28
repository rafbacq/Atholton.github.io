import Link from "next/link"

interface LogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  withTagline?: boolean
}

export function Logo({ variant = "default", size = "md", withTagline = false }: LogoProps) {
  const getLogoClasses = () => {
    const baseClasses = "font-display tracking-wider transition-colors duration-300"

    const sizeClasses = {
      sm: "text-xl",
      md: "text-3xl",
      lg: "text-5xl",
    }

    const colorClasses = {
      default: "text-raider-green dark:text-green-400",
      light: "text-white",
      dark: "text-raider-green",
    }

    return `${baseClasses} ${sizeClasses[size]} ${colorClasses[variant]}`
  }

  const getTaglineClasses = () => {
    const baseClasses = "font-sans font-light tracking-wide transition-colors duration-300"

    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    const colorClasses = {
      default: "text-gray-600 dark:text-gray-300",
      light: "text-gray-200",
      dark: "text-gray-600",
    }

    return `${baseClasses} ${sizeClasses[size]} ${colorClasses[variant]}`
  }

  return (
    <div className="flex flex-col items-center">
      <Link href="/" className="inline-block">
        <h1 className={getLogoClasses()}>ATHOLTON RAIDERS</h1>
      </Link>
      {withTagline && <p className={getTaglineClasses()}>RAIDER TIME MANAGEMENT</p>}
    </div>
  )
}