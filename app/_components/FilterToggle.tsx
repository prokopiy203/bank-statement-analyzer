"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filters } from "./types";
import { cn } from "@/lib/utils";

type Props = {
  value: Filters;
  onChange: (v: Filters) => void;
};

export function FilterToggle({ value, onChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as Filters)}
      className="inline-flex rounded-xl bg-muted/40 p-1 border"
    >
      <ToggleGroupItem
        value="all"
        className={cn(
          "px-4 py-1.5 text-sm font-medium rounded-lg transition",
          "data-[state=on]:bg-background data-[state=on]:shadow",
          "data-[state=on]:text-foreground",
        )}
      >
        Усі
      </ToggleGroupItem>

      <ToggleGroupItem
        value="incomes"
        className={cn(
          "px-4 py-1.5 text-sm font-medium rounded-lg transition",
          "data-[state=on]:bg-green-500/10",
          "data-[state=on]:text-green-600",
          "data-[state=on]:shadow-sm",
        )}
      >
        Доходи
      </ToggleGroupItem>

      <ToggleGroupItem
        value="expenses"
        className={cn(
          "px-4 py-1.5 text-sm font-medium rounded-lg transition",
          "data-[state=on]:bg-red-500/10",
          "data-[state=on]:text-red-500",
          "data-[state=on]:shadow-sm",
        )}
      >
        Витрати
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
