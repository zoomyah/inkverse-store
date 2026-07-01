import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type SlashEffectProps = {
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  /** Seconds for one flare-fade cycle. */
  speed?: number;
};

/**
 * A dramatic slash trace — a thin glossy plane that flares in and out
 * (Bleach / samurai slash motif). Stays faint & static under reduced motion.
 */
export function SlashEffect({
  color = "#FFD23F",
  position = [0, 0, 0],
  rotation = [0, 0, Math.PI / 4],
  scale = 1,
  speed = 2.4,
}: SlashEffectProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (REDUCE_MOTION || !matRef.current) return;
    t.current += delta;
    // Sharp pulse: brief flare then fade.
    const phase = (t.current % speed) / speed;
    const intensity = Math.max(0, Math.sin(phase * Math.PI * 2) ** 6);
    matRef.current.opacity = intensity;
    matRef.current.emissiveIntensity = intensity * 2.5;
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale} dispose={null}>
      <planeGeometry args={[5, 0.12]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={REDUCE_MOTION ? 0.6 : 1.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={REDUCE_MOTION ? 0.35 : 0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
