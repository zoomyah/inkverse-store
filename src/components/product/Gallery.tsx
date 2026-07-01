import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  alt: string;
  name: string;
}

export function Gallery({ images, alt, name }: GalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden manga-panel manga-panel-neon bg-ink-deep group">
        <motion.img
          key={active}
          src={images[active]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            zoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
          )}
          onClick={() => setZoomed((z) => !z)}
        />
        <div className="absolute top-3 right-3 p-2 bg-ink-deep/80 border-2 border-black text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="font-jp text-cyan-neon text-xs neon-text-cyan bg-ink-deep/70 px-2 py-1">
            {name}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "aspect-square overflow-hidden border-2 transition-all",
                active === i
                  ? "border-blood-neon shadow-neon-blood"
                  : "border-black opacity-60 hover:opacity-100"
              )}
            >
              <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
