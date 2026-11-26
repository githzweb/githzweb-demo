// Simple line drawings used instead of product photos (demo products have no real photos).
// 64×64 grid, 2.5px stroke, one yellow accent shape per drawing.

import type { ReactNode } from "react";

const A = "var(--color-hivis)"; // accent fill

const D: Record<string, ReactNode> = {
  drill: (
    <>
      <path d="M14 18h26a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H14z" fill={A} />
      <path d="M14 18h26a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H14zM46 25h10M22 32l-4 18h12l2-18M16 50h18v6H16z" />
    </>
  ),
  driver: (
    <>
      <path d="M12 20h24a6 6 0 0 1 0 12H12z" fill={A} />
      <path d="M12 20h24a6 6 0 0 1 0 12H12zM42 26h12l4-2M20 32l-3 16h11l2-16M15 48h16v7H15z" />
    </>
  ),
  grinder: (
    <>
      <circle cx="16" cy="38" r="11" fill={A} />
      <path d="M8 26h42a5 5 0 0 1 0 10H22M16 27v-6h10" />
      <circle cx="16" cy="38" r="11" />
      <circle cx="16" cy="38" r="2" />
    </>
  ),
  saw: (
    <>
      <circle cx="30" cy="40" r="13" fill={A} />
      <circle cx="30" cy="40" r="13" />
      <path d="M12 30h36l6-10H26zM30 40h.01M10 54h44" />
    </>
  ),
  jigsaw: (
    <>
      <path d="M12 16h30a8 8 0 0 1 8 8v8H12z" fill={A} />
      <path d="M12 16h30a8 8 0 0 1 8 8v8H12zM10 36h42M28 36v20M24 40l8 4-8 4 8 4" />
    </>
  ),
  hammerdrill: (
    <>
      <path d="M10 20h30v14H10z" fill={A} />
      <path d="M10 20h30v14H10zM40 27h16M24 34l-3 18h12l2-18M19 52h18v5H19zM10 16v22" />
    </>
  ),
  battery: (
    <>
      <rect x="12" y="22" width="40" height="26" rx="4" fill={A} />
      <rect x="12" y="22" width="40" height="26" rx="4" />
      <path d="M22 16h20v6M20 36h6M23 33v6M38 36h6" />
    </>
  ),
  heatgun: (
    <>
      <path d="M8 18h34l10 6v6l-10 6H8z" fill={A} />
      <path d="M8 18h34l10 6v6l-10 6H8zM52 27h6M18 36l-3 18h12l2-18" />
    </>
  ),
  hammer: (
    <>
      <path d="M14 10h26l6 6v4H14z" fill={A} />
      <path d="M14 10h26l6 6v4H14zM26 20v36h6V20M46 16l6-6" />
    </>
  ),
  screwdriver: (
    <>
      <rect x="24" y="6" width="16" height="24" rx="6" fill={A} />
      <rect x="24" y="6" width="16" height="24" rx="6" />
      <path d="M32 30v20l-3 6h6l-3-6" />
    </>
  ),
  wrench: (
    <>
      <path d="M44 8a12 12 0 0 0-11 16L10 47a5 5 0 0 0 7 7l23-23a12 12 0 0 0 16-11l-7 4-6-3-1-7z" fill={A} />
      <path d="M44 8a12 12 0 0 0-11 16L10 47a5 5 0 0 0 7 7l23-23a12 12 0 0 0 16-11l-7 4-6-3-1-7z" />
    </>
  ),
  pliers: (
    <>
      <path d="M26 36l-8 20h6l8-16M38 36l8 20h-6l-8-16" fill={A} />
      <path d="M26 36l-8 20h6l8-16M38 36l8 20h-6l-8-16M32 34L22 8M32 34L42 8" />
      <circle cx="32" cy="34" r="3" />
    </>
  ),
  tape: (
    <>
      <rect x="8" y="14" width="36" height="36" rx="8" fill={A} />
      <rect x="8" y="14" width="36" height="36" rx="8" />
      <circle cx="26" cy="32" r="6" />
      <path d="M44 42h14v6H44M52 42v6" />
    </>
  ),
  level: (
    <>
      <rect x="6" y="24" width="52" height="16" rx="3" fill={A} />
      <rect x="6" y="24" width="52" height="16" rx="3" />
      <rect x="26" y="28" width="12" height="8" rx="4" />
      <path d="M32 28v8" />
    </>
  ),
  knife: (
    <>
      <path d="M10 40l26-14h16l-4 14z" fill={A} />
      <path d="M10 40l26-14h16l-4 14zM52 26l6-4v8l-6 4M24 40h8" />
    </>
  ),
  screw: (
    <>
      <path d="M20 8h24l-4 8H24z" fill={A} />
      <path d="M20 8h24l-4 8H24zM28 16v32l4 8 4-8V16M28 22l8 4M28 30l8 4M28 38l8 4" />
    </>
  ),
  bolt: (
    <>
      <path d="M22 6h20l4 6-4 6H22l-4-6z" fill={A} />
      <path d="M22 6h20l4 6-4 6H22l-4-6zM27 18v38h10V18M27 30h10M27 38h10M27 46h10" />
    </>
  ),
  nut: (
    <>
      <path d="M22 12h20l10 20-10 20H22L12 32z" fill={A} />
      <path d="M22 12h20l10 20-10 20H22L12 32z" />
      <circle cx="32" cy="32" r="8" />
    </>
  ),
  anchor: (
    <>
      <path d="M24 10h16v34l-8 10-8-10z" fill={A} />
      <path d="M24 10h16v34l-8 10-8-10zM24 20h16M24 28h16M24 36h16" />
    </>
  ),
  rivet: (
    <>
      <path d="M18 16h28a4 4 0 0 1-4 6H22a4 4 0 0 1-4-6z" fill={A} />
      <path d="M18 16h28a4 4 0 0 1-4 6H22a4 4 0 0 1-4-6zM28 22v20h8V22M32 4v12M32 42v14" />
    </>
  ),
  nail: (
    <>
      <rect x="20" y="8" width="24" height="6" rx="2" fill={A} />
      <rect x="20" y="8" width="24" height="6" rx="2" />
      <path d="M30 14v34l2 8 2-8V14" />
    </>
  ),
  tie: (
    <>
      <rect x="10" y="22" width="12" height="14" rx="2" fill={A} />
      <path d="M10 22h12v14H10zM22 27h32v4H22M16 36c0 12 10 18 24 18" />
    </>
  ),
  pipe: (
    <>
      <path d="M6 22h52v20H6z" fill={A} />
      <path d="M6 22h52v20H6zM12 22v20M52 22v20" />
      <ellipse cx="58" cy="32" rx="3" ry="10" />
    </>
  ),
  fitting: (
    <>
      <path d="M8 22h22v20H8zM22 34h20v22H22z" fill={A} />
      <path d="M8 22h30a6 6 0 0 1 6 6v28H24V42H8zM14 22v20M24 50h20" />
    </>
  ),
  valve: (
    <>
      <path d="M6 30h52v14H6z" fill={A} />
      <path d="M6 30h52v14H6zM24 30v-8h16v8M32 22v-8M20 14h28" />
    </>
  ),
  tap: (
    <>
      <path d="M8 20h28v12H8z" fill={A} />
      <path d="M8 20h28a10 10 0 0 1 10 10v10H36v-8H8zM22 20v-8M14 12h16M41 46v4M41 54v2" />
    </>
  ),
  pump: (
    <>
      <circle cx="26" cy="36" r="14" fill={A} />
      <circle cx="26" cy="36" r="14" />
      <path d="M40 30h14v12H40M26 22v-8h-8M12 50h28" />
    </>
  ),
  cable: (
    <>
      <circle cx="26" cy="32" r="18" fill={A} />
      <circle cx="26" cy="32" r="18" />
      <circle cx="26" cy="32" r="6" />
      <path d="M44 32c8 0 12 6 12 14v8" />
    </>
  ),
  switch: (
    <>
      <rect x="12" y="12" width="40" height="40" rx="6" fill={A} />
      <rect x="12" y="12" width="40" height="40" rx="6" />
      <rect x="26" y="20" width="12" height="24" rx="3" />
      <path d="M26 32h12" />
    </>
  ),
  socket: (
    <>
      <rect x="10" y="10" width="44" height="44" rx="6" fill={A} />
      <rect x="10" y="10" width="44" height="44" rx="6" />
      <path d="M32 20v8M24 36v6M40 36v6" />
    </>
  ),
  breaker: (
    <>
      <rect x="20" y="8" width="24" height="48" rx="3" fill={A} />
      <rect x="20" y="8" width="24" height="48" rx="3" />
      <rect x="27" y="22" width="10" height="14" rx="2" />
      <path d="M26 46h12M26 14h12" />
    </>
  ),
  reel: (
    <>
      <circle cx="30" cy="30" r="18" fill={A} />
      <circle cx="30" cy="30" r="18" />
      <circle cx="30" cy="30" r="5" />
      <path d="M12 52h36M48 30h8v20" />
    </>
  ),
  led: (
    <>
      <rect x="6" y="26" width="52" height="12" rx="6" fill={A} />
      <rect x="6" y="26" width="52" height="12" rx="6" />
      <path d="M2 32h4M58 32h4M20 20l-2-4M32 18v-4M44 20l2-4" />
    </>
  ),
  helmet: (
    <>
      <path d="M12 40a20 20 0 0 1 40 0z" fill={A} />
      <path d="M12 40a20 20 0 0 1 40 0zM6 40h52v6H6zM32 20v20M26 22v8M38 22v8" />
    </>
  ),
  gloves: (
    <>
      <path d="M18 56V30l-6-10 4-2 8 8V12h4v16-20h4v20-18h4v18-14h4v28l-4 16z" fill={A} />
      <path d="M18 56V30l-6-10 4-2 8 8V12h4v16-20h4v20-18h4v18-14h4v28l-4 16z" />
    </>
  ),
  glasses: (
    <>
      <path d="M8 26h20v12a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6zM36 26h20v12a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" fill={A} />
      <path d="M8 26h20v12a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6zM36 26h20v12a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6zM28 30h8M8 26l-4-4M56 26l4-4" />
    </>
  ),
  vest: (
    <>
      <path d="M20 8l12 10 12-10 10 8v40H10V16z" fill={A} />
      <path d="M20 8l12 10 12-10 10 8v40H10V16zM32 18v38M10 34h44M10 44h44" />
    </>
  ),
  boots: (
    <>
      <path d="M16 8h18v28l18 8v12H16z" fill={A} />
      <path d="M16 8h18v28l18 8v12H16zM16 50h36M16 20h18" />
    </>
  ),
  earmuff: (
    <>
      <rect x="8" y="30" width="14" height="22" rx="6" fill={A} />
      <rect x="42" y="30" width="14" height="22" rx="6" fill={A} />
      <path d="M15 30a17 17 0 0 1 34 0" />
      <rect x="8" y="30" width="14" height="22" rx="6" />
      <rect x="42" y="30" width="14" height="22" rx="6" />
    </>
  ),
};

export function Illustration({ name, className = "h-20 w-20" }: { name?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {D[name ?? ""] ?? D.socket}
    </svg>
  );
}
