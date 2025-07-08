// components/ui/Alert.tsx
import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  className?: string
}

export default function Alert({ children, className = '' }: AlertProps) {
  return (
    <div
      className={`mb-4 rounded-lg border-l-4 border-purple-300 bg-purple-50 text-purple-900 px-3 py-1.5 text-[11px] font-medium flex items-center gap-2 shadow-sm sm:text-sm ${className}`}
    >
      <span className="text-base sm:text-lg">📣</span>
      <span>{children}</span>
    </div>
  )
}
