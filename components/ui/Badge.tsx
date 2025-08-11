'use client'
import React from 'react'

interface BadgeProps {
  emoji: string
  children: React.ReactNode
  className?: string
}

const BASE_CLASS =
  'inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-[11px] font-medium text-gray-800 gap-0.5 sm:text-xs'

// Animación CSS
const FADE_IN_ANIMATION = `
@keyframes badgeFadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
`

export function Badge({ emoji, children, className = '' }: BadgeProps) {
  return (
    <>
      <style>{FADE_IN_ANIMATION}</style>
      <span
        className={`${BASE_CLASS} ${className}`}
        style={{
          animation: 'badgeFadeIn 1s ease-out', // delay
        }}
      >
        <span className="text-sm mr-0.5 sm:text-base">{emoji}</span>
        <span>{children}</span>
      </span>
    </>
  )
}
