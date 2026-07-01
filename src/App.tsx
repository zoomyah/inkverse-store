import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { hasStripe, getStripe } from "@/utils/stripe";
import { useAuthStore } from "@/store/authStore";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductPage from "@/pages/Product";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderPage from "@/pages/Order";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, search]);
  return null;
}

/** Admin guard — redirects non-admins to login. */
function AdminGuard() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}

/** Layout wrapper for public routes. */
function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  const stripePromise = hasStripe ? getStripe() : null;

  const routes: ReactNode = (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public + shop routes share the Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin routes — guarded, no public Layout chrome */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );

  // Wrap in Stripe Elements provider only when a publishable key is set.
  if (stripePromise) {
    return (
      <BrowserRouter>
        <Elements stripe={stripePromise} options={{ appearance: { theme: "night" } }}>
          {routes}
        </Elements>
      </BrowserRouter>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
