import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Flat card — no spotlight, no glow, no glassmorphism. Just flat.
export function BentoCard({ children, className = '', id }: BentoCardProps) {
  return (
    <div id={id} className={`flat-card p-5 flex flex-col ${className}`}>
      {children}
    </div>
  );
}
