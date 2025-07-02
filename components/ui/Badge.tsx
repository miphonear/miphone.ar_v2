// components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  emoji: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ emoji, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full bg-orange-100
        px-2 py-1 text-[11px] font-medium text-gray-800 gap-1
        sm:px-3 sm:py-1 sm:text-xs
        ${className}
      `}
    >
      <span className="text-sm mr-1 sm:text-base">{emoji}</span>
      <span>{children}</span>
    </span>
  );
}
