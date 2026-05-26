/**
 * Sky.tsx — premium cloud system
 *
 * Design notes
 * ------------
 * Each cloud is a single SVG <ellipse> that is (a) feathered by a radial-gradient
 * alpha mask so the edges fade into the sky, and (b) textured with an feTurbulence
 * filter to add wispy, organic, non-cartoon detail. Each cloud carries its own
 * filter with a unique `seed` and `baseFrequency`, so no two clouds share a
 * silhouette — that's what prevents the pattern-recognition that makes generic
 * cloud animations look fake.
 *
 * Three depth layers, each animated as a single transform:
 *   - bg  : heavily blurred, low opacity, slowest drift   (atmospheric haze)
 *   - mid : lightly blurred, mid opacity, medium drift     (main reading layer)
 *   - fg  : barely blurred, high opacity, fastest drift    (foreground parallax)
 *
 * Only `transform: translate3d()` is animated. Filters, masks, and turbulence
 * are static — they're rasterised once and the layer is composited on the GPU.
 * This is what keeps it cheap.
 *
 * The drift + bob animations are intentionally incommensurate (durations that
 * don't share factors), so the combined motion has an effective period of
 * thousands of seconds — no visible loop.
 */

import React from "react";

interface Blob {
  /** Horizontal centre, percent of viewBox width */
  cx: number;
  /** Vertical centre, percent of viewBox height */
  cy: number;
  /** Horizontal radius, percent */
  rx: number;
  /** Vertical radius, percent */
  ry: number;
  /** Unique turbulence seed — drives the silhouette */
  seed: number;
  /** Horizontal noise frequency — lower = bigger wisps */
  freqX: number;
  /** Vertical noise frequency */
  freqY: number;
}

/* Background — small, sparse, distant. Wispy and discrete, not banded. */
const BG_BLOBS: Blob[] = [
  { cx: 14, cy: 16, rx: 14, ry: 9,  seed: 11, freqX: 0.040, freqY: 0.050 },
  { cx: 76, cy: 28, rx: 16, ry: 10, seed: 23, freqX: 0.035, freqY: 0.045 },
  { cx: 46, cy: 9,  rx: 15, ry: 9,  seed: 47, freqX: 0.038, freqY: 0.048 },
  { cx: 88, cy: 70, rx: 14, ry: 9,  seed: 61, freqX: 0.042, freqY: 0.052 },
  { cx: 24, cy: 82, rx: 15, ry: 10, seed: 79, freqX: 0.036, freqY: 0.046 },
];

/* Mid — the main reading layer. Distinct cloud forms with breathing room. */
const MID_BLOBS: Blob[] = [
  { cx: 18, cy: 24, rx: 18, ry: 11, seed: 5,  freqX: 0.028, freqY: 0.038 },
  { cx: 70, cy: 16, rx: 20, ry: 12, seed: 19, freqX: 0.026, freqY: 0.036 },
  { cx: 92, cy: 56, rx: 19, ry: 11, seed: 37, freqX: 0.030, freqY: 0.040 },
  { cx: 8,  cy: 62, rx: 17, ry: 10, seed: 53, freqX: 0.032, freqY: 0.042 },
  { cx: 52, cy: 86, rx: 22, ry: 12, seed: 71, freqX: 0.025, freqY: 0.035 },
];

/* Foreground — fewer, larger forms. Drift fastest for parallax depth. */
const FG_BLOBS: Blob[] = [
  { cx: 32, cy: 52, rx: 24, ry: 14, seed: 2,  freqX: 0.022, freqY: 0.030 },
  { cx: 84, cy: 80, rx: 22, ry: 13, seed: 31, freqX: 0.024, freqY: 0.032 },
  { cx: 60, cy: 36, rx: 21, ry: 13, seed: 67, freqX: 0.023, freqY: 0.031 },
];

interface CloudLayerProps {
  layer: "bg" | "mid" | "fg";
  blobs: Blob[];
}

/**
 * Renders one depth-layer of clouds as a single SVG element. The outer
 * <div> carries the drift animation; an inner <div> carries the bob.
 * Stacking the two animations on separate elements lets us run them with
 * different durations and easings — together they produce non-repeating
 * organic motion.
 */
function CloudLayer({ layer, blobs }: CloudLayerProps) {
  const filterId = (i: number) => `cloud-noise-${layer}-${i}`;
  const maskId = `cloud-mask-${layer}`;

  return (
    <div className={`cloud-layer cloud-layer--${layer} drift-${layer}`}>
      <div className={`absolute inset-0 bob-${layer}`}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {/* Shared soft-edge mask — feathers each ellipse's alpha into the sky */}
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="45%"  stopColor="white" stopOpacity="0.85" />
              <stop offset="75%"  stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            {/* One turbulence filter per blob — unique seed = unique silhouette */}
            {blobs.map((b, i) => (
              <filter
                key={i}
                id={filterId(i)}
                x="-30%"
                y="-50%"
                width="160%"
                height="200%"
                filterUnits="userSpaceOnUse"
                primitiveUnits="userSpaceOnUse"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={`${b.freqX} ${b.freqY}`}
                  numOctaves="4"
                  seed={b.seed}
                  result="noise"
                />
                {/*
                  Re-map noise alpha: keep only the brighter peaks. This gives
                  the "torn cotton" wispy edge instead of a slab of texture.
                  matrix multiplies alpha by 2.4 and subtracts 0.85.
                */}
                <feColorMatrix
                  in="noise"
                  type="matrix"
                  values="0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 3.2 -1.4"
                  result="alpha"
                />
                <feGaussianBlur in="alpha" stdDeviation="0.4" result="soft" />
                <feComposite in="SourceGraphic" in2="soft" operator="in" />
              </filter>
            ))}
          </defs>

          {blobs.map((b, i) => (
            <ellipse
              key={i}
              cx={b.cx}
              cy={b.cy}
              rx={b.rx}
              ry={b.ry}
              fill={`url(#${maskId})`}
              filter={`url(#${filterId(i)})`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function Sky() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <CloudLayer layer="bg"  blobs={BG_BLOBS} />
      <CloudLayer layer="mid" blobs={MID_BLOBS} />
      <CloudLayer layer="fg"  blobs={FG_BLOBS} />
    </div>
  );
}
