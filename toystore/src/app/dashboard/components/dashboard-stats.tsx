import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { Calendar, DollarSign, TrendingUp, Users } from "lucide-react";

interface Props {
  totalSalesValue: number;
  clients: number;
  salesPerDay: number;
  daysWithSales: number;
}

export function DashboardStats({
  clients,
  daysWithSales,
  salesPerDay,
  totalSalesValue,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-glow rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
          <DollarSign className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(totalSalesValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            +12.5% em relação ao período anterior
          </p>
        </CardContent>
      </Card>

      <Card className="card-glow rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{clients}</div>
          <p className="text-xs text-muted-foreground">
            +2 novos clientes este mês
          </p>
        </CardContent>
      </Card>

      <Card className="card-glow rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          <TrendingUp className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">
            {formatCurrency(salesPerDay)}
          </div>
          <p className="text-xs text-muted-foreground">
            +5.2% em relação ao período anterior
          </p>
        </CardContent>
      </Card>

      <Card className="card-glow rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dias com Vendas</CardTitle>
          <Calendar className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{daysWithSales}</div>
          <p className="text-xs text-muted-foreground">
            83% dos dias do período
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
