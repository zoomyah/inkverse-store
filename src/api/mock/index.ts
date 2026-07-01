import type {
  ApiClient,
  CategoryInfo,
  CheckoutSession,
  CheckoutSessionInput,
  Order,
  OrderStatus,
  Product,
  ProductFilters,
  ProductInput,
  ProductPage,
} from "@/api/types";
import { CATEGORY_LABELS } from "@/api/types";
import { PRODUCTS } from "@/data/products";
import { ORDERS } from "@/data/orders";
import { CATEGORY_IMAGES } from "@/data/images";
import type { Category } from "@/api/types";

// In-memory store (cloned so we can mutate for admin CRUD without touching source)
let products: Product[] = PRODUCTS.map((p) => ({ ...p }));
let orders: Order[] = ORDERS.map((o) => ({
  ...o,
  items: o.items.map((it) => ({ ...it, product: { ...it.product } })),
}));

const delay = (ms = 300 + Math.random() * 300) =>
  new Promise<void>((r) => setTimeout(r, ms));

const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;

function applyFilters(list: Product[], f: ProductFilters = {}): Product[] {
  let out = [...list];
  if (f.category) out = out.filter((p) => p.category === f.category);
  if (f.series) out = out.filter((p) => p.series === f.series);
  if (typeof f.minPrice === "number") out = out.filter((p) => p.price >= f.minPrice!);
  if (typeof f.maxPrice === "number") out = out.filter((p) => p.price <= f.maxPrice!);
  if (f.search) {
    const q = f.search.toLowerCase().trim();
    out = out.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  switch (f.sort) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
  }
  return out;
}

// Build category info with images + labels
const CATEGORIES_REF: CategoryInfo[] = (
  ["figures", "manga", "apparel", "posters", "plushies", "accessories"] as Category[]
).map((c) => ({
  category: c,
  name: CATEGORY_LABELS[c].name,
  jp: CATEGORY_LABELS[c].jp,
  image: CATEGORY_IMAGES[c],
}));

export const mockClient: ApiClient = {
  async listProducts(filters: ProductFilters = {}): Promise<ProductPage> {
    await delay();
    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 9;
    const filtered = applyFilters(products, filters);
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { items, total, page, pageSize };
  },

  async getProduct(slug: string): Promise<Product> {
    await delay();
    const found = products.find((p) => p.slug === slug);
    if (!found) throw new Error(`Product not found: ${slug}`);
    return { ...found };
  },

  async listCategories(): Promise<CategoryInfo[]> {
    await delay(150);
    return CATEGORIES_REF.map((c) => ({ ...c }));
  },

  async listAllSeries(): Promise<string[]> {
    await delay(150);
    const set = new Set(products.map((p) => p.series));
    return Array.from(set).sort();
  },

  async createCheckoutSession(_input: CheckoutSessionInput): Promise<CheckoutSession> {
    await delay(600);
    // Mock mode: return a fake client secret. Real mode would call Django.
    return { clientSecret: `mock_secret_${uid("pi")}` };
  },

  async listOrders(): Promise<Order[]> {
    await delay();
    return orders.map((o) => ({
      ...o,
      items: o.items.map((it) => ({ ...it, product: { ...it.product } })),
    }));
  },

  async createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    await delay(400);
    const newOrder: Order = {
      ...order,
      id: `INK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    orders = [newOrder, ...orders];
    return { ...newOrder };
  },

  async createProduct(input: ProductInput): Promise<Product> {
    await delay(400);
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...input,
      id: uid("p"),
      createdAt: now,
      slug:
        input.slug ||
        input.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
    products = [newProduct, ...products];
    return { ...newProduct };
  },

  async updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
    await delay(400);
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Product not found: ${id}`);
    products[idx] = { ...products[idx], ...input, id: products[idx].id };
    return { ...products[idx] };
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(400);
    products = products.filter((p) => p.id !== id);
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    await delay(400);
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error(`Order not found: ${id}`);
    orders[idx] = { ...orders[idx], status };
    return { ...orders[idx] };
  },
};
