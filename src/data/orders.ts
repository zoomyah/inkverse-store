import type { Order } from "@/api/types";
import { PRODUCTS } from "./products";

const p = (id: string) => PRODUCTS.find((x) => x.id === id)!;

// ===== INKVERSE sample orders for admin dashboard =====
export const ORDERS: Order[] = [
  {
    id: "INK-1042",
    items: [
      { product: p("p01"), quantity: 1 },
      { product: p("p05"), quantity: 2 },
    ],
    total: 114.0,
    status: "delivered",
    createdAt: "2026-06-01T14:22:00Z",
    customer: {
      name: "Aiko Tanaka",
      email: "aiko@example.com",
      address: "4-2-1 Shibuya, Tokyo, Japan",
    },
  },
  {
    id: "INK-1043",
    items: [{ product: p("p07"), quantity: 1 }],
    total: 11.0,
    status: "shipped",
    createdAt: "2026-06-12T09:10:00Z",
    customer: {
      name: "Marco Rossi",
      email: "marco@example.com",
      address: "Via Roma 12, Milano, Italy",
    },
  },
  {
    id: "INK-1044",
    items: [
      { product: p("p03"), quantity: 1 },
      { product: p("p10"), quantity: 1 },
    ],
    total: 193.0,
    status: "paid",
    createdAt: "2026-06-21T18:45:00Z",
    customer: {
      name: "Sam Carter",
      email: "sam@example.com",
      address: "55 Baker Street, London, UK",
    },
  },
  {
    id: "INK-1045",
    items: [
      { product: p("p12"), quantity: 2 },
      { product: p("p14"), quantity: 1 },
    ],
    total: 76.0,
    status: "pending",
    createdAt: "2026-06-26T21:05:00Z",
    customer: {
      name: "Lena Fischer",
      email: "lena@example.com",
      address: "Hauptstrasse 8, Berlin, Germany",
    },
  },
  {
    id: "INK-1046",
    items: [{ product: p("p02"), quantity: 1 }],
    total: 94.0,
    status: "pending",
    createdAt: "2026-06-29T07:30:00Z",
    customer: {
      name: "Yuki Yamamoto",
      email: "yuki@example.com",
      address: "3-9-15 Akihabara, Tokyo, Japan",
    },
  },
];
