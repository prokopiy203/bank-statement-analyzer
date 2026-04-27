export type Transaction = {
  date: string;
  counterparty: string;
  description: string;
  amount: number;
};

export type ValidationRows = {
  data: Transaction;
  errors: {
    row: number;
    message: string;
  };
}[];

export type Filters = "all" | "incomes" | "expenses";
