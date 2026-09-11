import React from 'react';
import { useSpotlight } from '../hooks/useSpotlight';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  id?: string;
}

export function BentoCard({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.08)',
  id,
}: BentoCardProps) {
  const { divRef, handleMouseMove } = useSpotlight();

  return (
    <div
      ref={divRef}
      id={id}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d14]/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.18] hover:shadow-2xl hover:shadow-black/50 ${className}`}
      style={
        {
          '--spotlight-color': glowColor,
        } as React.CSSProperties
      }
    >
      {/* Radial Spotlight glow on cursor movement */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color), transparent 40%)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
}
