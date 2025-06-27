// components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  emoji: string; // Emoji al inicio
  children: React.ReactNode;
  className?: string;
}

export function Badge({ emoji, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-gray-800 gap-1 ${className}`}
    >
      <span className="text-base mr-1">{emoji}</span>
      <span>{children}</span>
    </span>
  );
}
