import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default function AdminOrders() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="katakana-eyebrow text-[11px] text-cyan-neon">Admin · 管理者</p>
          <h1 className="display-tight text-4xl uppercase mt-1">Manage orders</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/admin">
            <Button variant="secondary" clip={false}>Dashboard</Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="secondary" clip={false}>Products</Button>
          </Link>
        </div>
      </div>

      <OrdersTable />
    </Container>
  );
}
