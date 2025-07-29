// components/ui/Alert.tsx
import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  className?: string
  type?: 'info' | 'error' | 'success' | 'warning'
}

const ALERT_STYLES = {
  info: 'border-purple-300 bg-purple-50 text-purple-900',
  error: 'border-red-400 bg-red-50 text-red-800',
  success: 'border-green-400 bg-green-50 text-green-800',
  warning: 'border-yellow-400 bg-yellow-50 text-yellow-800',
}
const ALERT_ICONS = {
  info: '📣',
  error: '❌',
  success: '✅',
  warning: '⚠️',
}

export default function Alert({ children, className = '', type = 'info' }: AlertProps) {
  return (
    <div
      role="alert"
      className={`mb-4 rounded-lg border-l-4 px-3 py-1.5 text-[11px] font-medium flex items-center gap-2 shadow-sm sm:text-sm
        ${ALERT_STYLES[type]} ${className}`}
    >
      <span className="text-base sm:text-lg">{ALERT_ICONS[type]}</span>
      <span>{children}</span>
    </div>
  )
}
