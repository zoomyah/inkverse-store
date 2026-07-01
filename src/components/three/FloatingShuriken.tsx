import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { REDUCE_MOTION } from "./SceneBackground";

type FloatingShurikenProps = {
  color?: string;
  position?: [number, number, number];
  scale?: number;
  spin?: number;
};

/**
 * A floating ninja shuriken built from four cone blades + a gold core.
 * Rotates on Z and bobs with drei's <Float>. Ninja/samurai motif.
 */
export function FloatingShuriken({
  color = "#FFD23F",
  position = [0, 0, 0],
  scale = 1,
  spin = 1.2,
}: FloatingShurikenProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!REDUCE_MOTION && ref.current) {
      ref.current.rotation.z += delta * spin;
    }
  });

  return (
    <group position={position}>
      <Float
        speed={REDUCE_MOTION ? 0 : 1.4}
        rotationIntensity={REDUCE_MOTION ? 0 : 0.3}
        floatIntensity={REDUCE_MOTION ? 0 : 0.8}
      >
        <group ref={ref} scale={scale} dispose={null}>
          {/* Four blades pointing outward (N/E/S/W) */}
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[0, 0.42, 0]}
              rotation={[0, 0, (i * Math.PI) / 2]}
            >
              <coneGeometry args={[0.16, 0.7, 4]} />
              <meshStandardMaterial color={color} metalness={1} roughness={0.25} />
            </mesh>
          ))}
          {/* Gold core */}
          <mesh>
            <icosahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#FFD23F" metalness={1} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
