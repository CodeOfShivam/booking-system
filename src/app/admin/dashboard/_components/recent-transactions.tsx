import type React from "react";
import {
  ChevronRight,
  Smartphone,
  Wallet,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: number;
  type: string;
  method: string;
  amount: string;
  date: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

export default function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: 1,
      type: "UPI Payment",
      method: "Online Transaction",
      amount: "$1,234.78",
      date: "Nov 22, 2024",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 2,
      type: "Digital Wallet",
      method: "Online Transaction",
      amount: "$623.99",
      date: "Nov 22, 2024",
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
      icon: <Wallet className="w-4 h-4" />,
    },
    {
      id: 3,
      type: "Mastro Card ****7893",
      method: "Card Payment",
      amount: "$1,324",
      date: "Nov 21, 2024",
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: 4,
      type: "Cash On Delivery",
      method: "Pay On Delivery",
      amount: "$1,123.49",
      date: "Nov 20, 2024",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: 5,
      type: "UPI Payment",
      method: "Online Transaction",
      amount: "$1,234.78",
      date: "Nov 22, 2024",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 6,
      type: "Visa Card ****2563",
      method: "Card Payment",
      amount: "$1,289",
      date: "Nov 18, 2024",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      icon: <CreditCard className="w-4 h-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>RECENT TRANSACTIONS</CardTitle>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-8">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${transaction.bgColor} flex-shrink-0 `}
            >
              <div className={transaction.iconColor}>{transaction.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-tight">
                {transaction.type}
              </h3>
              <p className="text-xs text-muted-foreground">
                {transaction.method}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-semibold text-sm">{transaction.amount}</div>
              <div className="text-xs text-muted-foreground">
                {transaction.date}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
