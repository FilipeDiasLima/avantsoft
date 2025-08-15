"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DashboardChartProps = {
  statistics: Array<{ date: string; total: number }>;
};

export function DashboardChart({ statistics }: DashboardChartProps) {
  return (
    <Card className="card-glow rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Vendas por Dia
        </CardTitle>
        <CardDescription>
          Evolução das vendas diárias no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statistics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="var(--muted-foreground)"
                className="text-xs"
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
                stroke="var(--muted-foreground)"
                className="text-xs"
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value as number),
                  "Total",
                ]}
                labelFormatter={(label) => `Data: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--ring)", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "var(--primary)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
