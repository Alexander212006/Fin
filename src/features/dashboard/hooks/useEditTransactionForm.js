import { useMemo, useState } from "react";
import { useI18n } from "../../../i18n";
import {
  EDIT_TRANSACTION_FIELDS,
  getInitialEditTransactionValues,
} from "../config/editTransactionFields";

export const useEditTransactionForm = (transaction) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState(() =>
    getInitialEditTransactionValues(transaction),
  );

  const fields = useMemo(
    () =>
      EDIT_TRANSACTION_FIELDS.map((field) => ({
        ...field,
        label: t(
          `forms.fields.${field.name === "source" ? "source" : field.name}`,
          field.label,
        ),
        placeholder:
          field.name === "title"
            ? t("forms.placeholders.enterTitle", field.placeholder)
            : field.name === "amount"
              ? t("forms.placeholders.enterAmount", field.placeholder)
              : field.name === "notes"
                ? t("forms.placeholders.addNotes", field.placeholder)
                : field.placeholder,
        options:
          field.name === "type"
            ? [
                { label: t("history.types.income", "Income"), value: "income" },
                {
                  label: t("history.types.expense", "Expense"),
                  value: "expense",
                },
              ]
            : field.options,
      })),
    [t],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  return {
    fields,
    formData,
    handleChange,
  };
};
