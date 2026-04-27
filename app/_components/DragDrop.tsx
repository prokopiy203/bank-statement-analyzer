"use client";

import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Papa from "papaparse";
import { ValidationParseCSV } from "@/lib/parseCSV";
import { Transaction } from "./types";

type Props = {
  onChange: (data: Transaction[]) => void;
};

export function DragDropZone({ onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed rounded-2xl p-10",
        "bg-muted/30 hover:bg-muted/50 transition-colors",
        "cursor-pointer",
      )}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow">
        <UploadCloud className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-medium">Drag & drop your CSV file here</p>
        <p className="text-xs text-muted-foreground">or click to browse</p>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        onClick={() => {
          console.log("click");
          inputRef.current?.click();
        }}
        onChange={(e) => {
          console.log("CHANGE FIRED");
          const file = e.target.files?.[0];
          if (!file) return;

          e.target.value = "";

          Papa.parse<Transaction>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log("PAPAP", results);
              const { valid, invalid } = ValidationParseCSV(results.data);

              onChange(valid);

              console.log("errors", invalid);
            },
            error: (err) => {
              console.error("parse error", err);
            },
          });
        }}
        type="file"
        accept=".csv"
        className="hidden"
      />
    </div>
  );
}
