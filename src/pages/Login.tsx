import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Shield } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Halftone } from "@/components/ui/Halftone";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(email, password);
    setMsg(r);
    if (r.ok) {
      setTimeout(() => navigate(r.message.includes("Admin") ? "/admin" : "/account"), 700);
    }
  };

  return (
    <Container className="py-14 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="manga-panel manga-panel-neon p-8 relative overflow-hidden"
      >
        <Halftone opacity={0.12} />
        <div className="relative">
          <div className="text-center mb-6">
            <div className="inline-flex p-2.5 manga-panel manga-panel-cyan mb-3">
              <LogIn size={22} className="text-cyan-neon" />
            </div>
            <p className="font-jp text-cyan-neon text-xs neon-text-cyan">サインイン</p>
            <h1 className="display-tight text-3xl uppercase mt-1">Enter INKVERSE</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="otaku@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {msg && (
              <p className={msg.ok ? "text-xs text-cyan-neon" : "text-xs text-sakura-neon"}>
                {msg.message}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-5 manga-panel manga-panel-cyan p-3 flex items-start gap-2">
            <Shield size={15} className="text-cyan-neon shrink-0 mt-0.5" />
            <p className="text-xs text-ink-text">
              <span className="text-cyan-neon font-mono">Demo admin:</span> admin@admin.com / admin
              <br />
              <span className="text-ink-muted">Or use any email + password for a customer account.</span>
            </p>
          </div>

          <p className="text-center text-sm text-ink-muted mt-6">
            New here?{" "}
            <Link to="/register" className="text-sakura-neon hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </Container>
  );
}
