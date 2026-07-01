import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type BloodDropsProps = {
  count?: number;
  /** Horizontal spread of the fall field. */
  area?: number;
  color?: string;
};

type Drop = { x: number; y: number; z: number; speed: number; scale: number };

/** Slow-falling glossy blood droplets that reset at the top (Bleach/samurai). */
export function BloodDrops({ count = 8, area = 5, color = "#DC143C" }: BloodDropsProps) {
  const meshes = useRef<THREE.Mesh[]>([]);
  const drops = useMemo<Drop[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * area,
        y: Math.random() * 6 - 1,
        z: (Math.random() - 0.5) * 2,
        speed: 0.35 + Math.random() * 0.55,
        scale: 0.05 + Math.random() * 0.04,
      })),
    [count, area]
  );

  useFrame((_, delta) => {
    if (REDUCE_MOTION) return;
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      const m = meshes.current[i];
      if (!m) continue;
      d.y -= d.speed * delta;
      if (d.y < -2.6) {
        d.y = 2.6 + Math.random();
        d.x = (Math.random() - 0.5) * area;
      }
      m.position.set(d.x, d.y, d.z);
    }
  });

  return (
    <group>
      {drops.map((d, i) => (
        <mesh
          key={i}
          position={[d.x, d.y, d.z]}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
        >
          <sphereGeometry args={[d.scale, 10, 10]} />
          <meshStandardMaterial
            color={color}
            emissive="#7F1D1D"
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}
