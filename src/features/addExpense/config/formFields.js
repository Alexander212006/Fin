import {
  FileText,
  FolderOpen,
  Wallet,
  CalendarDays,
  CreditCard,
  ShoppingBasket,
} from "lucide-react";
import { InputField } from "../../../form/InputField";
import { SelectField } from "../../../form/SelectField";
import { EXPENSE_CATEGORIES } from "../constants/expenseForm";
import { ACCOUNTS } from "../../../constants/accounts";

export const expenseFieldConfig = [
  {
    name: "title",
    component: InputField,
    props: {
      label: "Expense title",
      placeholder: "Enter expense title",
      icon: FileText,
    },
    colSpan: "sm:col-span-2",
  },
  {
    name: "amount",
    component: InputField,
    props: {
      label: "Amount",
      placeholder: "0.00",
      icon: Wallet,
      type: "number",
    },
  },
  {
    name: "category",
    component: SelectField,
    props: {
      label: "Category",
      icon: FolderOpen,
      options: EXPENSE_CATEGORIES,
    },
  },
  {
    name: "date",
    component: InputField,
    props: {
      label: "Date spent",
      placeholder: "Select date",
      icon: CalendarDays,
      type: "date",
    },
  },
  {
    name: "account",
    component: SelectField,
    props: {
      label: "Account",
      icon: CreditCard,
      options: ACCOUNTS,
    },
  },
  {
    name: "merchant",
    component: InputField,
    props: {
      label: "Merchant(optional)",
      placeholder: "Enter merchant name",
      icon: ShoppingBasket,
      type: "text",
    },
  },
];
