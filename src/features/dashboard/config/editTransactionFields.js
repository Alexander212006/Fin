import { ACCOUNTS } from "../../../constants/accounts";
import { INCOME_SOURCES } from "../../addIncome/constants/incomeForm";

export const EDIT_TRANSACTION_FIELDS = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter title",
    required: true,
    colSpan: "2",
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter amount",
    required: true,
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "Income", value: "income" },
      { label: "Expense", value: "expense" },
    ],
  },
  {
    name: "source",
    label: "Source",
    type: "select",
    options: INCOME_SOURCES,
  },
  {
    name: "account",
    label: "Account",
    type: "select",
    options: ACCOUNTS,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
    colSpan: "2",
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Add notes",
    rows: 4,
    colSpan: "2",
  },
];

export const getInitialEditTransactionValues = (transaction) => ({
  title: transaction?.title || "",
  amount: transaction?.amount || "",
  type: transaction?.type || "",
  source: transaction?.source || "",
  date: transaction?.date || "",
  account: transaction?.account || "",
  notes: transaction?.notes || "",
});
