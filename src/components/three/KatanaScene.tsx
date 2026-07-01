import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Respect the user's motion preference (computed once at module load).
const REDUCE_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A floating samurai katana built from primitive geometry. */
function Katana() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!REDUCE_MOTION && ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={ref} rotation={[0.18, 0, 0.5]} dispose={null}>
      {/* Blade — long thin steel box */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.09, 2.4, 0.03]} />
        <meshStandardMaterial color="#C7CCD1" metalness={1} roughness={0.22} />
      </mesh>
      {/* Kissaki (tip) */}
      <mesh position={[0, 2.42, 0]}>
        <coneGeometry args={[0.045, 0.28, 4]} />
        <meshStandardMaterial color="#C7CCD1" metalness={1} roughness={0.2} />
      </mesh>
      {/* Tsuba (guard) — gold torus */}
      <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.04, 12, 24]} />
        <meshStandardMaterial color="#FFD23F" metalness={1} roughness={0.3} />
      </mesh>
      {/* Tsuka (handle) — dark cylinder */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
        <meshStandardMaterial color="#161616" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Kashira (pommel) */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#3A2A12" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Slow-falling blood droplets (Bleach / samurai motif). */
function BloodDrops({ count = 7 }: { count?: number }) {
  const meshes = useRef<THREE.Mesh[]>([]);
  const drops = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 4.2,
        y: Math.random() * 5 - 1,
        z: (Math.random() - 0.5) * 2,
        speed: 0.35 + Math.random() * 0.55,
        scale: 0.04 + Math.random() * 0.035,
      })),
    [count]
  );

  useFrame((_, delta) => {
    if (REDUCE_MOTION) return;
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      const m = meshes.current[i];
      if (!m) continue;
      d.y -= d.speed * delta;
      if (d.y < -2.4) {
        d.y = 2.4 + Math.random();
        d.x = (Math.random() - 0.5) * 4.2;
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
            color="#DC143C"
            emissive="#7F1D1D"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Decorative 3D hero scene — floating katana wreathed in cursed energy. */
export function KatanaScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Dark crimson fog for depth */}
        <fog attach="fog" args={["#160307", 6, 17]} />

        {/* Lighting — blood-red key from above, ember fill, soft white rim */}
        <ambientLight intensity={0.12} color="#3a0a0a" />
        <spotLight
          position={[3, 6, 3]}
          angle={0.5}
          penumbra={0.6}
          intensity={2.4}
          color="#DC143C"
        />
        <pointLight position={[-3, -1, 2]} intensity={1.3} color="#FF6B35" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

        <Float
          speed={REDUCE_MOTION ? 0 : 1.1}
          rotationIntensity={REDUCE_MOTION ? 0 : 0.4}
          floatIntensity={REDUCE_MOTION ? 0 : 0.6}
        >
          <Katana />
        </Float>

        {/* Cursed energy aura — crimson + faint Jujutsu purple */}
        <Sparkles count={50} scale={[4.5, 4.5, 3]} size={3} speed={0.4} color="#DC143C" opacity={0.7} />
        <Sparkles count={18} scale={[3, 3, 2]} size={2} speed={0.2} color="#6B21A8" opacity={0.4} />

        <BloodDrops count={7} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.55}
          scale={11}
          blur={2.6}
          far={4}
          color="#8a0a1f"
        />

        {/* In-memory environment (no network) for metal reflections, red-tinted */}
        <Environment resolution={64}>
          <Lightformer intensity={1.2} color="#ff2a3a" position={[0, 4, -2]} scale={[4, 2, 1]} />
          <Lightformer intensity={0.8} color="#ffffff" position={[3, 0, 2]} scale={[2, 4, 1]} />
          <Lightformer intensity={0.6} color="#FF6B35" position={[-4, 0, 1]} scale={[2, 4, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
