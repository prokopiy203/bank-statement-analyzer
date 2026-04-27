import { Transaction, ValidationRows } from "@/app/_components/types";
import { z } from "zod";

const parseSchema = z.object({
  date: z.string(),
  counterparty: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
});

type PapaParse = z.infer<typeof parseSchema>;

export function ValidationParseCSV(arr: Transaction[]) {
  const valid: PapaParse[] = [];
  const invalid: ValidationRows = [];

  arr.forEach((tx, index) => {
    const results = parseSchema.safeParse(tx);

    if (results.success) {
      valid.push(results.data);
    } else {
      invalid.push({
        data: tx,
        errors: {
          row: index + 1,
          message: results.error.issues.map((i) => i.message).join(", "),
        },
      });
    }
  });

  return {
    valid,
    invalid,
  };
}
