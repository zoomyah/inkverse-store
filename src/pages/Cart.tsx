import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { api } from "@/api/client";
import type { Product } from "@/api/types";
import { useCartStore } from "@/store/cartStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartLineRow } from "@/components/cart/CartLine";
import { CartSummary } from "@/components/cart/CartSummary";
import { SceneBackground } from "@/components/three/SceneBackground";
import { CherryBlossom3D } from "@/components/three/CherryBlossom3D";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const coupon = useCartStore((s) => s.getCoupon());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.listProducts({ pageSize: 100 }).then((p) => {
      const ids = new Set(items.map((i) => i.productId));
      setProducts(p.items.filter((x) => ids.has(x.id)));
    });
  }, [items]);

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="max-w-md mx-auto manga-panel p-10">
          <ShoppingCart size={48} className="mx-auto text-ink-muted mb-4" />
          <p className="display-tight text-3xl uppercase text-ink-text">Cart is empty</p>
          <p className="font-jp text-cyan-neon text-sm mt-2">カートは空です</p>
          <p className="text-ink-muted mt-3 text-sm">
            The vault awaits — go find your next obsession.
          </p>
          <Link to="/shop" className="inline-block mt-6">
            <Button size="lg">
              Browse shop <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <SceneBackground fixed tone="blood" intensity={0.35} overlay={false}>
        <CherryBlossom3D count={14} area={7} />
      </SceneBackground>
      <SectionHeading
        eyebrow="Your cart"
        jp="カート"
        title="Ready to check out?"
        className="mb-8"
      />

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {items.map((line) => (
            <CartLineRow
              key={line.productId}
              line={line}
              product={products.find((p) => p.id === line.productId)}
            />
          ))}
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink-muted hover:text-blood-neon mt-2 transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>

        <CartSummary items={items} products={products} coupon={coupon}>
          <Link to="/checkout" className="block">
            <Button size="lg" className="w-full">
              Checkout <ArrowRight size={18} />
            </Button>
          </Link>
        </CartSummary>
      </div>
    </Container>
  );
}
