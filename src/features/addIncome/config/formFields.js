import {
  FileText,
  FolderOpen,
  Wallet,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import { InputField } from "../../../form/InputField";
import { SelectField } from "../../../form/SelectField";
import { INCOME_SOURCES } from "../constants/incomeForm";
import { ACCOUNTS } from "../../../constants/accounts";

export const incomeFieldConfig = [
  {
    name: "title",
    component: InputField,
    props: {
      label: "Income title",
      placeholder: "Enter income title",
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
    name: "source",
    component: SelectField,
    props: {
      label: "Source",
      icon: FolderOpen,
      options: INCOME_SOURCES,
    },
  },
  {
    name: "date",
    component: InputField,
    props: {
      label: "Date received",
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
];
