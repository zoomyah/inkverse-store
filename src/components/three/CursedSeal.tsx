import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type CursedSealProps = {
  color?: string;
  position?: [number, number, number];
  scale?: number;
  spin?: number;
};

/**
 * A slowly rotating cursed seal — concentric torus rings + radiating bars
 * around a sigil core. Strong Jujutsu-style motif. Place behind a section.
 */
export function CursedSeal({
  color = "#6B21A8",
  position = [0, 0, 0],
  scale = 1,
  spin = 0.25,
}: CursedSealProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!REDUCE_MOTION && ref.current) {
      ref.current.rotation.z += delta * spin;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale} dispose={null}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.4, 0.05, 12, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.03, 10, 48]} />
        <meshStandardMaterial
          color="#DC143C"
          emissive="#DC143C"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Radiating inscribed bars */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]} position={[0, 1.15, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.02]} />
          <meshStandardMaterial
            color="#FFD23F"
            emissive="#7F1D1D"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* Center sigil */}
      <mesh>
        <circleGeometry args={[0.3, 6]} />
        <meshStandardMaterial
          color="#DC143C"
          emissive="#7F1D1D"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
