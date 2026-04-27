"use client";

import { Transaction } from "./types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: Transaction[];
};

export function SummaryCards({ data }: Props) {
  const income = data
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = data
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expenses;
  const count = data.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Income */}
      <Card className="hover:shadow-md transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Загальний дохід
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-600">
            +{income.toLocaleString("uk-UA")}
          </p>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card className="hover:shadow-md transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Загальна витрата
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-red-500">
            {expenses.toLocaleString("uk-UA")}
          </p>
        </CardContent>
      </Card>

      {/* Balance */}
      <Card className="hover:shadow-md transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Чистий результат
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-2xl font-semibold",
              balance >= 0 ? "text-green-600" : "text-red-500",
            )}
          >
            {balance.toLocaleString("uk-UA")}
          </p>
        </CardContent>
      </Card>

      {/* Count */}
      <Card className="hover:shadow-md transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            Кількість транзакцій
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
