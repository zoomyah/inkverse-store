import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface SalesPoint {
  label: string;
  sales: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesPoint[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="manga-panel p-5 h-80">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="display-tight text-xl uppercase">Sales Velocity</h3>
          <p className="font-jp text-[10px] text-cyan-neon">売上</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blood-neon inline-block" /> Sales ($)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-cyan-neon inline-block" /> Orders
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DC143C" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#DC143C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="label"
            stroke="#9A9AA5"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis
            stroke="#9A9AA5"
            tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip
            contentStyle={{
              background: "#13131A",
              border: "2px solid #000",
              boxShadow: "6px 6px 0 0 #000",
              borderRadius: 0,
              fontFamily: "JetBrains Mono",
              fontSize: 12,
            }}
            labelStyle={{ color: "#9A9AA5" }}
            itemStyle={{ color: "#F5F3EF" }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#DC143C"
            strokeWidth={2}
            fill="url(#salesGrad)"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#00E5FF"
            strokeWidth={2}
            fill="url(#ordersGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
