"use client";

import React from "react";

interface CloudProps {
  /** Width of the cloud in viewport-width units (e.g. 24 = 24vw). */
  size: number;
  /** Vertical position as percent from top. */
  top: number;
  /** Tailwind animation class — controls drift speed. */
  speed:
    | "animate-drift-slow"
    | "animate-drift-medium"
    | "animate-drift-fast"
    | "animate-drift-slowest";
  /** Negative delay (seconds) so clouds start mid-traverse instead of all entering at once. */
  delay?: number;
  /** Opacity 0–1; back-layer clouds use lower opacity for atmospheric depth. */
  opacity?: number;
  /** z-index for layering front-to-back. */
  layer?: number;
}

/**
 * A realistic cloud built from overlapping radial-gradient puffs.
 * The puff positions and sizes are tuned to read as a cumulus silhouette:
 * a wider base, a taller central crown, smaller outliers softening the edges.
 */
export default function Cloud({
  size,
  top,
  speed,
  delay = 0,
  opacity = 1,
  layer = 1,
}: CloudProps) {
  // Cloud bounding box: wider than tall, roughly 2.4 : 1 ratio
  const widthVw = size;
  const heightVw = size * 0.42;

  // Each puff: [leftPct, topPct, widthPct, heightPct]
  // These offsets compose an asymmetric, naturalistic silhouette.
  const puffs: [number, number, number, number][] = [
    [0,  35, 38, 65],   // left base
    [22, 10, 42, 80],   // tall central crown
    [48,  5, 38, 85],   // taller right crown
    [68, 28, 32, 70],   // right shoulder
    [12, 45, 30, 55],   // lower-left filler
    [40, 50, 35, 50],   // lower-mid filler
    [60, 45, 28, 55],   // lower-right filler
  ];

  return (
    <div
      className={`cloud ${speed}`}
      style={{
        top: `${top}%`,
        width: `${widthVw}vw`,
        height: `${heightVw}vw`,
        opacity,
        zIndex: layer,
        animationDelay: `-${delay}s`,
      }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* Soft drop shadow under the cloud */}
        <div className="cloud-shadow" />

        {/* Composed puffs */}
        {puffs.map(([l, t, w, h], i) => (
          <div
            key={i}
            className="puff"
            style={{
              left: `${l}%`,
              top: `${t}%`,
              width: `${w}%`,
              height: `${h}%`,
            }}
          />
        ))}

        {/* Subtle top-left highlight for volume */}
        <div className="cloud-highlight" />
      </div>
    </div>
  );
}
