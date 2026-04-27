import { Transaction } from "@/app/_components/types";

export function CalculateExpensesTop(arr: Transaction[]) {
  const map: Map<string, number> = new Map<string, number>();

  for (const tx of arr) {
    if (tx.amount < 0) {
      const current = map.get(tx.counterparty) ?? 0;

      map.set(tx.counterparty, current + Math.abs(tx.amount));
    }
  }

  console.log("map", map);
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
}
