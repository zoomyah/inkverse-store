import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

/** Respect the user's motion preference (computed once at module load). */
export const REDUCE_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Tone = "blood" | "purple" | "mixed";

type SceneBackgroundProps = {
  children: ReactNode;
  tone?: Tone;
  /** Colored light intensity (0..1). Backgrounds default low for perf. */
  intensity?: number;
  /** Dark gradient overlay for text readability. */
  overlay?: boolean;
  /** Fixed full-viewport background (for page-level ambient 3D). */
  fixed?: boolean;
  className?: string;
};

const FOG_COLOR: Record<Tone, string> = {
  blood: "#160307",
  purple: "#0c0512",
  mixed: "#120309",
};

/** Pause the render loop when the canvas scrolls out of view. */
function useIsInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/**
 * A reusable, lightweight 3D backdrop canvas. Use it as a section background
 * (absolute, default) or a page-level ambient background (fixed). One canvas
 * per section/page keeps the WebGL context count low; off-screen canvases are
 * paused via IntersectionObserver.
 */
export function SceneBackground({
  children,
  tone = "blood",
  intensity = 0.5,
  overlay = true,
  fixed = false,
  className = "",
}: SceneBackgroundProps) {
  const { ref, inView } = useIsInView();
  const frameloop = !inView ? "never" : REDUCE_MOTION ? "demand" : "always";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`${fixed ? "fixed inset-0 -z-10" : "absolute inset-0"} pointer-events-none ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={frameloop}
      >
        <fog attach="fog" args={[FOG_COLOR[tone], 9, 20]} />
        <ambientLight intensity={0.12} color="#3a0a0a" />
        <spotLight
          position={[3, 6, 3]}
          angle={0.5}
          penumbra={0.6}
          intensity={intensity * 2.4}
          color="#DC143C"
        />
        <pointLight position={[-3, -1, 2]} intensity={intensity * 1.2} color="#6B21A8" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />
        {children}
      </Canvas>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-ink-base/50 via-blood-deep/15 to-ink-base/70" />
      )}
    </div>
  );
}
