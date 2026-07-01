import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type CherryBlossom3DProps = {
  count?: number;
  area?: number;
  color?: string;
};

type Petal = {
  x: number;
  y: number;
  z: number;
  fall: number;
  drift: number;
  phase: number;
  scale: number;
  rot: number;
};

/**
 * Falling blood-red cherry blossom petals that drift & tumble — a quiet,
 * poetic samurai motif to soften the crimson violence. Place inside a
 * <SceneBackground>.
 */
export function CherryBlossom3D({
  count = 14,
  area = 6,
  color = "#DC143C",
}: CherryBlossom3DProps) {
  const meshes = useRef<THREE.Mesh[]>([]);
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * area,
        y: Math.random() * 6 - 1,
        z: (Math.random() - 0.5) * 2.5,
        fall: 0.25 + Math.random() * 0.4,
        drift: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        scale: 0.08 + Math.random() * 0.06,
        rot: Math.random() * Math.PI,
      })),
    [count, area]
  );

  useFrame((state, delta) => {
    if (REDUCE_MOTION) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      const m = meshes.current[i];
      if (!m) continue;
      p.y -= p.fall * delta;
      if (p.y < -2.6) {
        p.y = 2.6 + Math.random();
        p.x = (Math.random() - 0.5) * area;
      }
      m.position.set(p.x + Math.sin(t * p.drift + p.phase) * 0.4, p.y, p.z);
      m.rotation.z = p.rot + t * (0.5 + p.drift * 0.5);
      m.rotation.x = Math.sin(t + p.phase) * 0.5;
    }
  });

  return (
    <group>
      {petals.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, p.y, p.z]}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
        >
          <planeGeometry args={[p.scale, p.scale * 1.3]} />
          <meshStandardMaterial
            color={color}
            emissive="#7F1D1D"
            emissiveIntensity={0.4}
            roughness={0.5}
            metalness={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
