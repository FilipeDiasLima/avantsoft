import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientProps } from "@/interface/client";
import { formatCurrency } from "@/utils/format-currency";
import { DollarSign, Target, Trophy, Zap } from "lucide-react";

type DashboardHighlightsProps = {
  highlights: {
    highestVolume: {
      clientId: string;
      total: number;
      client: ClientProps;
    };
    highestAverage: {
      clientId: string;
      average: number;
      client: ClientProps;
    };
    mostUniqueDays: {
      clientId: string;
      days: number;
      client: ClientProps;
    };
  } | null;
};

export function DashboardHightlights({ highlights }: DashboardHighlightsProps) {
  if (!highlights) {
    return null;
  }

  const { highestVolume, highestAverage, mostUniqueDays } = highlights;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-accent" />
        Destaques dos Clientes
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-glow rounded-2xl border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              Maior Volume de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold text-lg">
                {highestVolume.client.name}
              </p>
              <p className="text-2xl font-bold text-success">
                {formatCurrency(highestVolume.total)}
              </p>
              <p className="text-sm text-muted-foreground">&nbsp;</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow rounded-2xl border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Maior Média por Venda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold text-lg">
                {highestAverage.client.name}
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(highestAverage.average)}
              </p>
              <p className="text-sm text-muted-foreground">
                Ticket médio por compra
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow rounded-2xl border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              Maior Frequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-semibold text-lg">
                {mostUniqueDays.client.name}
              </p>
              <p className="text-2xl font-bold text-secondary">
                {mostUniqueDays.days} dias
              </p>
              <p className="text-sm text-muted-foreground">
                Dias únicos com compras
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
