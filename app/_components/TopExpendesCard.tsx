"use client";

import { Transaction } from "./types";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { CalculateExpensesTop } from "@/lib/calculateTransaction";

type Props = {
  data: Transaction[];
};

export function TopExpensesCard({ data }: Props) {
  const top = CalculateExpensesTop(data);

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-base">Топ 5 витрат</CardTitle>
      </CardHeader>

      <CardContent>
        {top.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Контрагент</TableHead>
                <TableHead className="text-right">Сума</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {top.map(([name, amount], index) => (
                <TableRow key={name} className="hover:bg-muted/40 transition">
                  <TableCell className="font-medium">
                    {index + 1}. {name}
                  </TableCell>

                  <TableCell className="text-right text-red-500 font-semibold">
                    {amount.toLocaleString("uk-UA")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-6">
            Немає витрат
          </div>
        )}
      </CardContent>
    </Card>
  );
}
