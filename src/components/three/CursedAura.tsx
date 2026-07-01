import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type CursedAuraProps = {
  /** Primary aura color (try cursed purple #6B21A8 or crimson #DC143C). */
  color?: string;
  secondary?: string;
  count?: number;
  scale?: number;
  speed?: number;
  position?: [number, number, number];
};

/**
 * Cursed energy aura — spiraling crimson + purple sparkles around a center
 * point. A Jujutsu-style energy field. Place inside <SceneBackground>.
 */
export function CursedAura({
  color = "#6B21A8",
  secondary = "#DC143C",
  count = 40,
  scale = 4,
  speed = 0.4,
  position = [0, 0, 0],
}: CursedAuraProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!REDUCE_MOTION && ref.current) {
      ref.current.rotation.y += delta * 0.35;
      ref.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Sparkles
        count={count}
        scale={scale}
        size={3}
        speed={speed}
        color={color}
        opacity={0.7}
      />
      <Sparkles
        count={Math.floor(count * 0.5)}
        scale={scale * 0.65}
        size={2}
        speed={speed * 0.6}
        color={secondary}
        opacity={0.55}
      />
    </group>
  );
}
