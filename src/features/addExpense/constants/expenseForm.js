
export const EXPENSE_CATEGORIES = [
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Rent", value: "rent" },
  { label: "Bills", value: "bills" },
  { label: "Health", value: "health" },
  { label: "Personal", value: "personal" },
  { label: "Shopping", value: "shopping" },
  { label: "Other", value: "other" },
];

export const INITIAL_FORM_STATE = {
    title: "",
    amount: "",
    category: "",
    date: "",
    account: "",
    merchant: "",
    notes: "",
};

export const REQUIRED_FIELDS = ["title", "amount", "category", "date", "account"];
