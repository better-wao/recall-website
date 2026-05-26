/**
 * Sky.tsx — premium cloud system
 *
 * Three depth-stratified cloud layers using pure CSS radial-gradient clouds.
 * Each cloud is a <div> styled with overlapping radial-gradients that, when
 * blurred at the layer level, produce a natural multi-lobed cloud silhouette.
 *
 * Why this approach:
 *   - Reliable across all browsers (no SVG-filter rendering quirks)
 *   - GPU-cheap: only `transform` is animated; backgrounds rasterise once
 *   - Premium aesthetic: matches what Stripe / Linear / Apple use
 *
 * Layer roles:
 *   - bg  : heavily blurred, low opacity, slowest drift  (atmospheric haze)
 *   - mid : medium blur, mid opacity, medium drift        (main reading layer)
 *   - fg  : light blur, high opacity, fastest drift       (foreground parallax)
 *
 * Animation timing: durations (180s / 240s / 360s) and directions are
 * deliberately mismatched so no two layers move together — preventing the
 * eye from latching onto a single flow direction.
 */

import React from "react";

/** Position + size for one cloud, all in percent of the layer's box */
interface CloudSpec {
  left: number;
  top: number;
  width: number;
  height: number;
}

const BG_CLOUDS: CloudSpec[] = [
  { left: 8,   top: 12, width: 24, height: 14 },
  { left: 62,  top: 24, width: 28, height: 16 },
  { left: 38,  top: 5,  width: 26, height: 14 },
  { left: 78,  top: 65, width: 25, height: 15 },
  { left: 15,  top: 78, width: 26, height: 16 },
];

const MID_CLOUDS: CloudSpec[] = [
  { left: 5,   top: 18, width: 32, height: 18 },
  { left: 55,  top: 8,  width: 36, height: 20 },
  { left: 78,  top: 48, width: 34, height: 20 },
  { left: -5,  top: 55, width: 30, height: 18 },
  { left: 35,  top: 78, width: 38, height: 20 },
];

const FG_CLOUDS: CloudSpec[] = [
  { left: 12,  top: 42, width: 42, height: 24 },
  { left: 65,  top: 68, width: 40, height: 22 },
  { left: 42,  top: 25, width: 38, height: 22 },
];

interface CloudLayerProps {
  layer: "bg" | "mid" | "fg";
  clouds: CloudSpec[];
}

function CloudLayer({ layer, clouds }: CloudLayerProps) {
  return (
    <div className={`cloud-layer cloud-layer--${layer}`} aria-hidden="true">
      {clouds.map((c, i) => (
        <div
          key={i}
          className={`cloud cloud--${layer}`}
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.width}%`,
            height: `${c.height}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function Sky() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <CloudLayer layer="bg"  clouds={BG_CLOUDS} />
      <CloudLayer layer="mid" clouds={MID_CLOUDS} />
      <CloudLayer layer="fg"  clouds={FG_CLOUDS} />
    </div>
  );
}
