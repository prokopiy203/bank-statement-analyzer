"use client";

import { useCallback, useMemo, useState } from "react";
import { DragDropZone } from "./_components/DragDrop";
import { TableRows } from "./_components/TableRows";
import { Filters, Transaction } from "./_components/types";
import { FilterToggle } from "./_components/FilterToggle";
import { Input } from "@/components/ui/input";
import { SummaryCards } from "./_components/SummaryCards";
import { CalculateExpensesTop } from "@/lib/calculateTransaction";
import { TopExpensesCard } from "./_components/TopExpendesCard";

export default function Home() {
  const [data, setData] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filters>("all");
  const [value, setValue] = useState<string>("");

  const filteredData = useMemo(() => {
    if (filter === "incomes") return data.filter((el) => el.amount > 0);
    if (filter === "expenses") return data.filter((el) => el.amount < 0);
    return data;
  }, [data, filter]);

  CalculateExpensesTop(data);

  const searchData = useMemo(() => {
    const dataSearch = filteredData.filter((el) => {
      const name = el.counterparty.toLocaleLowerCase();
      const description = el.description.toLocaleLowerCase();
      if (
        name.includes(value.toLocaleLowerCase()) ||
        description.includes(value.toLocaleLowerCase())
      ) {
        return el;
      }
    });
    return dataSearch;
  }, [value, filteredData]);

  return (
    <div className="flex flex-col gap-8">
      {/* Upload section */}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold">Upload your bank statement</h2>

        <DragDropZone onChange={setData} />

        <p className="text-xs text-muted-foreground">Supported format: CSV</p>
      </div>
      <SummaryCards data={filteredData} />

      {/* Table section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="flex justify-between items-center gap-6">
          <Input
            className="max-w-2xs"
            value={value}
            placeholder="пошук..."
            onChange={(e) => setValue(e.target.value)}
          />
          <FilterToggle value={filter} onChange={setFilter} />
        </div>

        <TableRows value={searchData} />
      </div>
      <TopExpensesCard data={data} />
    </div>
  );
}
