export const INCOME_SOURCES = [
  { label: "Business", value: "business" },
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Investment", value: "investment" },
  { label: "Other", value: "other" },
];

export const INITIAL_FORM_STATE = {
  title: "",
  amount: "",
  source: "",
  date: "",
  account: "",
  notes: "",
};

export const REQUIRED_FIELDS = ["title", "amount", "source", "date", "account"];
