import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "guest" | "customer" | "admin";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; message: string };
  register: (name: string, email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
}

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        // Mock auth: accept any non-empty email/password.
        if (!email || !password) {
          return { ok: false, message: "Email and password are required." };
        }
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        const user: AuthUser = {
          name: isAdmin ? "Admin" : email.split("@")[0] || "Otaku",
          email,
          role: isAdmin ? "admin" : "customer",
        };
        set({ user });
        return { ok: true, message: isAdmin ? "Welcome back, Admin." : "Logged in." };
      },

      register: (name, email, password) => {
        if (!name || !email || !password) {
          return { ok: false, message: "All fields are required." };
        }
        const user: AuthUser = { name, email, role: "customer" };
        set({ user });
        return { ok: true, message: "Account created — welcome to INKVERSE." };
      },

      logout: () => set({ user: null }),
    }),
    { name: "inkverse-auth" }
  )
);
