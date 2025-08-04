import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  return: number;
  date: string;
  status: "active" | "pending" | "completed";
}

// Função para buscar dados no servidor
async function getInvestmentsData(): Promise<Investment[]> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://investiment-mf.vercel.app/"
        : "http://localhost:3001";

    const response = await fetch(`${baseUrl}/api/investments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      cache:
        process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Erro ao buscar dados");
    }

    return result.data;
  } catch (error) {
    console.error("Erro ao buscar investimentos:", error);

    return [
      {
        id: "1",
        name: "Tesouro Direto",
        type: "Renda Fixa",
        amount: 5000,
        return: 12.5,
        date: "2024-01-15",
        status: "active",
      },
      {
        id: "2",
        name: "Ações Petrobras",
        type: "Renda Variável",
        amount: 3000,
        return: 8.2,
        date: "2024-02-01",
        status: "active",
      },
      {
        id: "3",
        name: "Fundos Imobiliários",
        type: "Fundos",
        amount: 2500,
        return: 6.8,
        date: "2024-01-20",
        status: "active",
      },
      {
        id: "4",
        name: "CDB Banco Inter",
        type: "Renda Fixa",
        amount: 1500,
        return: 10.2,
        date: "2024-03-01",
        status: "pending",
      },
      {
        id: "5",
        name: "ETF BOVA11",
        type: "Renda Variável",
        amount: 2000,
        return: 15.3,
        date: "2024-02-15",
        status: "active",
      },
    ];
  }
}

function calculateStats(investments: Investment[]) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = investments.reduce(
    (sum, inv) => sum + (inv.amount * inv.return) / 100,
    0
  );
  const activeInvestments = investments.filter(
    (inv) => inv.status === "active"
  );

  return {
    totalInvested,
    totalReturn,
    activeInvestments: activeInvestments.length,
    profitability: totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0,
  };
}

export default async function InvestmentsPage() {
  const investments = await getInvestmentsData();
  const stats = calculateStats(investments);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Investido
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    R$ {stats.totalInvested.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Retorno Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    R${" "}
                    {stats.totalReturn.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rentabilidade</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.profitability.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Target className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Investimentos Ativos
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.activeInvestments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle>Investimentos Ativos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-foreground">
                          {investment.name}
                        </h4>
                        <Badge
                          variant={
                            investment.status === "active"
                              ? "default"
                              : investment.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {investment.status === "active"
                            ? "Ativo"
                            : investment.status === "pending"
                            ? "Pendente"
                            : "Concluído"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {investment.type}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          {new Date(investment.date).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        R$ {investment.amount.toLocaleString("pt-BR")}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight size={12} className="text-green-600" />
                        <p
                          className={`text-sm font-medium ${
                            investment.return >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          +{investment.return}% de retorno
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {investments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="mx-auto text-muted-foreground" size={48} />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                Nenhum investimento encontrado
              </h3>
              <p className="mt-2 text-muted-foreground">
                Comece investindo hoje mesmo!
              </p>
              <Button className="mt-4">Fazer Primeiro Investimento</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
