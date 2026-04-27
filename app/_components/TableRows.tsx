"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "./types";
import { cn } from "@/lib/utils";

type Props = {
  value: Transaction[];
};

export function TableRows({ value }: Props) {
  return (
    <div className="rounded-2xl border bg-background shadow-sm overflow-hidden">
      <Table>
        {/* Header */}
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
              Дата
            </TableHead>
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
              Контрагент
            </TableHead>
            <TableHead className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
              Призначення
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-xs uppercase tracking-wide text-muted-foreground">
              Сума
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {value?.length > 0 ? (
            value.map((el, index) => (
              <TableRow
                key={index}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell className="px-4 py-3 text-sm">{el.date}</TableCell>

                <TableCell className="px-4 py-3 text-sm font-medium">
                  {el.counterparty}
                </TableCell>

                <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                  {el.description}
                </TableCell>

                <TableCell
                  className={cn(
                    "px-4 py-3 text-sm text-right font-semibold",
                    el.amount < 0 ? "text-red-500" : "text-green-600",
                  )}
                >
                  {el.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-32 text-center text-muted-foreground"
              >
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* Footer */}
        {value?.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Total
              </TableCell>
              <TableCell className="text-right font-bold">
                {value.reduce((acc, el) => acc + el.amount, 0).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
