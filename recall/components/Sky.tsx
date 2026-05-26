"use client";

import Cloud from "./Cloud";

/**
 * The sky: a fixed full-viewport layer of drifting clouds.
 * Clouds are arranged in three depth bands:
 *   - back  (small, faded, slowest)  — high altitude haze
 *   - mid   (medium, semi-opaque)    — main reading layer
 *   - front (large, crisp, fastest)  — closest, gives parallax
 * Negative animation-delays stagger their horizontal positions
 * so no two clouds are at the same x-offset at any moment.
 */
export default function Sky() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Back layer — distant, faded, drifts slowest */}
      <Cloud size={18} top={8}  speed="animate-drift-slowest" delay={5}  opacity={0.55} layer={1} />
      <Cloud size={22} top={68} speed="animate-drift-slowest" delay={40} opacity={0.5}  layer={1} />
      <Cloud size={16} top={82} speed="animate-drift-slowest" delay={75} opacity={0.45} layer={1} />

      {/* Mid layer — readable, the main cloud body of the scene */}
      <Cloud size={28} top={15} speed="animate-drift-slow"    delay={20} opacity={0.85} layer={2} />
      <Cloud size={32} top={72} speed="animate-drift-slow"    delay={55} opacity={0.9}  layer={2} />
      <Cloud size={26} top={2}  speed="animate-drift-slow"    delay={70} opacity={0.8}  layer={2} />
      <Cloud size={24} top={88} speed="animate-drift-slow"    delay={15} opacity={0.85} layer={2} />

      {/* Front layer — large and crisp, drifts fastest for parallax depth */}
      <Cloud size={38} top={55} speed="animate-drift-medium"  delay={30} opacity={0.95} layer={3} />
      <Cloud size={42} top={25} speed="animate-drift-medium"  delay={50} opacity={0.92} layer={3} />
      <Cloud size={36} top={78} speed="animate-drift-fast"    delay={10} opacity={1}    layer={3} />
    </div>
  );
}
