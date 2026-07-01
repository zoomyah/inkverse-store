import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Halftone } from "@/components/ui/Halftone";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = register(name, email, password);
    setMsg(r);
    if (r.ok) setTimeout(() => navigate("/account"), 700);
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
              <UserPlus size={22} className="text-cyan-neon" />
            </div>
            <p className="font-jp text-cyan-neon text-xs neon-text-cyan">とうろく</p>
            <h1 className="display-tight text-3xl uppercase mt-1">Join the Otaku club</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aiko Tanaka"
              required
            />
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
              <p className={msg.ok ? "text-xs text-cyan-neon" : "text-xs text-blood-neon"}>
                {msg.message}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full">
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-ink-muted mt-6">
            Already a member?{" "}
            <Link to="/login" className="text-blood-neon hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </Container>
  );
}
