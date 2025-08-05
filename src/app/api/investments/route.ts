import { NextResponse } from "next/server";

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  return: number;
  date: string;
  status: "active" | "pending" | "completed";
}

const mockInvestments: Investment[] = [
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
  {
    id: "6",
    name: "Ações Vale",
    type: "Renda Variável",
    amount: 1800,
    return: 5.7,
    date: "2024-03-10",
    status: "active",
  },
  {
    id: "7",
    name: "LCI Banco do Brasil",
    type: "Renda Fixa",
    amount: 3200,
    return: 9.8,
    date: "2024-02-28",
    status: "completed",
  },
];

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: mockInvestments,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar investimentos",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
