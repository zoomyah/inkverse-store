// ===== INKVERSE API layer — types & contracts =====
// Swappable with a real Django REST backend. See README.

export type Category =
  | "figures"
  | "manga"
  | "apparel"
  | "posters"
  | "plushies"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  /** Invented anime series, e.g. "Neo Samurai" */
  series: string;
  price: number;
  /** Original price for sale items (when present, product is on sale) */
  compareAtPrice?: number;
  /** Trae text_to_image URLs */
  images: string[];
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  stock: number;
  featured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
}

export type SortKey = "newest" | "price-asc" | "price-desc";

export interface ProductFilters {
  category?: Category;
  series?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortKey;
  page?: number;
  pageSize?: number;
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Coupon {
  code: string;
  percentOff: number;
}

export interface CategoryInfo {
  category: Category;
  name: string;
  jp: string;
  image: string;
}

export interface CheckoutSessionInput {
  items: { productId: string; quantity: number }[];
  couponCode?: string;
}

export interface CheckoutSession {
  clientSecret: string;
}

/** Admin CRUD product payload */
export type ProductInput = Omit<Product, "id" | "createdAt">;

/** The contract every API implementation (mock or real Django) must satisfy. */
export interface ApiClient {
  listProducts(filters?: ProductFilters): Promise<ProductPage>;
  getProduct(slug: string): Promise<Product>;
  listCategories(): Promise<CategoryInfo[]>;
  listAllSeries(): Promise<string[]>;
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSession>;
  listOrders(): Promise<Order[]>;
  createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  // Admin CRUD
  createProduct(input: ProductInput): Promise<Product>;
  updateProduct(id: string, input: Partial<ProductInput>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
}

export const COUPONS: Coupon[] = [
  { code: "OTAKU10", percentOff: 10 },
  { code: "INKVERSE20", percentOff: 20 },
];

export const CATEGORIES: CategoryInfo[] = [
  { category: "figures", name: "Figures", jp: "フィギュア", image: "" },
  { category: "manga", name: "Manga", jp: "漫画", image: "" },
  { category: "apparel", name: "Apparel", jp: "アパレル", image: "" },
  { category: "posters", name: "Posters", jp: "ポスター", image: "" },
  { category: "plushies", name: "Plushies", jp: "ぬいぐるみ", image: "" },
  { category: "accessories", name: "Accessories", jp: "アクセサリー", image: "" },
];

export const CATEGORY_LABELS: Record<Category, { name: string; jp: string }> = {
  figures: { name: "Figures", jp: "フィギュア" },
  manga: { name: "Manga", jp: "漫画" },
  apparel: { name: "Apparel", jp: "アパレル" },
  posters: { name: "Posters", jp: "ポスター" },
  plushies: { name: "Plushies", jp: "ぬいぐるみ" },
  accessories: { name: "Accessories", jp: "アクセサリー" },
};
