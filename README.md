# INKVERSE — Anime & Manga Marketplace

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-test-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Vitest](https://img.shields.io/badge/Vitest-passing-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A premium, frontend-only e-commerce store for anime & manga devotees — figures, manga,
apparel, posters, plushies & accessories. Built as a portfolio piece with a bold,
authentic **"Manga Ink & Neon"** aesthetic.

> Enter the world. Not a generic commerce template.

---

## ✨ Features

- **Manga Ink & Neon design system** — deep ink-black canvas, manga panel layouts with
  thick black borders + hard offset shadows, radial speed-lines behind the hero,
  halftone screentone texture, sakura-pink + cyan neon accents.
- **Typography** — Anton display headlines, DotGothic16 katakana flourishes, Outfit body,
  JetBrains Mono for prices/numbers.
- **Full storefront** — cinematic Home hero, category grid (manga panels), featured
  products, new arrivals, sale banner, Otaku newsletter.
- **Shop** — filterable catalog (category / series / price / search / sort) with
  pagination, mobile filter drawer, starburst POW/NEW/SALE badges.
- **Product detail** — multi-image gallery with zoom, qty selector, specs, "same series".
- **Cart** — persistent (localStorage) with quantity steppers, coupon codes
  (`OTAKU10` = 10%, `INKVERSE20` = 20%), live order summary with free-shipping progress.
- **Checkout** — 3-step flow (shipping → payment → review) with a Stripe Payment Element
  when a publishable key is set, otherwise a mock card form (test mode).
- **Auth** — mock auth (any email/password = customer; `admin@admin.com` / `admin` = admin).
- **Admin dashboard** — stat cards, a recharts sales chart, full product CRUD with an
  edit modal, and an order-management table with inline status changes. Guarded route.
- **Motion** — framer-motion staggered reveals, hover lift + neon glow, cart badge burst,
  page transitions — all respecting `prefers-reduced-motion`.
- **Images** — every product, category and hero image is generated via the Trae
  text-to-image endpoint (no generic placeholders).
- **Tests** — Vitest unit tests for the pricing logic (subtotal, discount, shipping,
  tax, total, coupons) and the cart store (add/remove/updateQty/clear/coupon).
- **Swappable API** — the mock API is isolated behind an `ApiClient` contract, ready to
  be replaced with a real Django REST backend without touching the UI.

---

## 🎨 Design — Manga Ink & Neon

| Token | Value | Use |
|-------|-------|-----|
| `ink-base` | `#0A0A0F` | Page background (deep ink) |
| `ink-surface` | `#13131A` | Panels / cards |
| `ink-text` | `#F5F3EF` | Primary text |
| `ink-muted` | `#9A9AA5` | Secondary text |
| `sakura-neon` | `#FF2E63` | Primary CTA / sale accents |
| `cyan-neon` | `#00E5FF` | Links / focus / secondary accents |
| `manga-gold` | `#FFD23F` | Ratings / star / highlights |

Background layers: halftone dot screentone (SVG), a faint manga grid, and subtle
radial neon glows in the corners — all pure CSS/SVG, lightweight. Buttons use an
angled `clip-path` for kinetic energy; sale/new badges are CSS starbursts.

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Run tests
npm test

# 4. Production build
npm run build
```

> Requires Node.js 20+.

### Demo accounts

| Role | Credentials |
|------|-------------|
| Customer | any email + any password |
| Admin | `admin@admin.com` / `admin` |

### Coupons

| Code | Discount |
|------|----------|
| `OTAKU10` | 10% off |
| `INKVERSE20` | 20% off |

---

## 📁 Project Structure

```
inkverse-store/
├── src/
│   ├── api/                     # Swappable API layer
│   │   ├── types.ts             #   contracts: Product, Order, ApiClient, COUPONS, CATEGORIES
│   │   ├── mock/index.ts        #   in-memory mock client (async + artificial delay)
│   │   └── client.ts            #   selects mock vs real (via VITE_API_BASE)
│   ├── components/
│   │   ├── ui/                  # Button, Card, Badge, Input, Modal, Skeleton,
│   │   │                        # SpeedLines, Halftone, BurstBadge, Container, SectionHeading
│   │   ├── layout/              # Navbar, Footer, Layout, MangaPanel
│   │   ├── product/             # ProductCard, ProductGrid, Filters, Gallery
│   │   ├── cart/                # CartLine, CartSummary, CouponInput
│   │   ├── checkout/            # ShippingForm, PaymentElement, OrderSummary, Steps
│   │   └── admin/               # StatCard, SalesChart, ProductsTable, OrdersTable
│   ├── data/                    # products.ts (14), orders.ts (5), images.ts (Trae URLs)
│   ├── hooks/                   # useProducts, useProduct, useFeaturedProducts
│   ├── pages/                   # Home, Shop, Product, Cart, Checkout, Order, Account,
│   │                            # Login, Register, Admin, AdminProducts, AdminOrders
│   ├── store/                   # cartStore, authStore, uiStore (zustand + persist)
│   ├── utils/                   # format, pricing (pure, tested), stripe
│   ├── styles/globals.css       # tokens + halftone + speed lines + manga grid + utilities
│   ├── App.tsx                  # routing, admin guard, ScrollToTop, Stripe provider
│   └── main.tsx
├── tests/                       # pricing.test.ts, cart.test.ts (Vitest)
├── .github/workflows/ci.yml     # npm ci → npm test → npm run build
├── .env.example                 # VITE_STRIPE_PUBLISHABLE_KEY, VITE_API_BASE
└── tailwind.config.js           # Manga Ink & Neon theme tokens
```

---

## 🔁 Swapping the mock API for a real Django backend

The UI never imports the mock directly — it goes through the `api` singleton exported
from `src/api/client.ts`, which implements the `ApiClient` interface. To go live, set
`VITE_API_BASE` and implement the same contract against your Django REST API.

### The `ApiClient` contract

```ts
// src/api/types.ts
export interface ApiClient {
  listProducts(filters?: ProductFilters): Promise<ProductPage>;
  getProduct(slug: string): Promise<Product>;
  listCategories(): Promise<CategoryInfo[]>;
  listAllSeries(): Promise<string[]>;
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession>;
  listOrders(): Promise<Order[]>;
  createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  createProduct(input: ProductInput): Promise<Product>;     // admin
  updateProduct(id: string, input: Partial<ProductInput>): Promise<Product>; // admin
  deleteProduct(id: string): Promise<void>;                  // admin
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;        // admin
}
```

### Implementing it with Django

```ts
// src/api/real/index.ts
const base = import.meta.env.VITE_API_BASE;

export const realClient: ApiClient = {
  async listProducts(f = {}) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(f).filter(([, v]) => v != null))
    );
    const r = await fetch(`${base}/api/products?${qs}`);
    return r.json(); // { items, total, page, pageSize }
  },
  async getProduct(slug) {
    const r = await fetch(`${base}/api/products/${slug}`);
    return r.json();
  },
  async createCheckoutSession(input) {
    const r = await fetch(`${base}/api/checkout/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const { client_secret } = await r.json();
    return { clientSecret: client_secret };
  },
  // ... implement the rest of the ApiClient methods
};
```

Then point the singleton at it in `src/api/client.ts`:

```ts
export const api: ApiClient = import.meta.env.VITE_API_BASE ? realClient : mockClient;
```

### Stripe checkout endpoint (Django view)

```python
# views.py  (uses stripe + rest_framework)
import stripe, json
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(["POST"])
@permission_classes([AllowAny])
def checkout_session(request):
    body = json.loads(request.body)
    intent = stripe.PaymentIntent.create(
        amount=int(body["total"] * 100),  # cents
        currency="usd",
        metadata={"coupon": body.get("couponCode", "")},
    )
    return Response({"client_secret": intent.client_secret})
```

### Proposed Django models

```python
# models.py
from django.db import models

class Series(models.Model):
    name = models.CharField(max_length=120, unique=True)

class Product(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=32, choices=[...])
    series = models.ForeignKey(Series, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    compare_at_price = models.DecimalField(null=True, blank=True)
    images = models.JSONField(default=list)        # list of URLs
    description = models.TextField()
    specs = models.JSONField(default=dict)
    rating = models.FloatField(default=5)
    reviews_count = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    STATUS = [("pending","pending"),("paid","paid"),("shipped","shipped"),("delivered","delivered")]
    id_str = models.CharField(max_length=16, unique=True)
    status = models.CharField(max_length=12, choices=STATUS, default="pending")
    total = models.DecimalField(max_digits=10, decimal_places=2)
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
```

---

## 🗺️ Roadmap

- [ ] Real Stripe Payment Element integration (server-side PaymentIntent)
- [ ] Django REST backend + PostgreSQL
- [ ] User accounts & order persistence
- [ ] Product reviews & ratings
- [ ] Wishlist
- [ ] Search autocomplete
- [ ] Image CDN + multi-angle product photography

---

## 📜 License

[MIT](./LICENSE) — built for the portfolio.
