import { useCallback } from "react";
import { useForm } from "../../../hooks/useForm";
import { validateExpenseForm } from "../utils/validateExpenseForm";
import { buildExpenseTransaction } from "../utils/buildExpenseTransaction";
import { INITIAL_FORM_STATE } from "../constants/expenseForm";

export const useExpenseForm = ({ toast, setTransactions }) => {
  const { form, file, setFile, resetForm, updateField } =
    useForm(INITIAL_FORM_STATE);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const error = validateExpenseForm(form, file);
    if (error) {
      toast.error(error);
      return;
    }

    const newTransaction = buildExpenseTransaction(form, file);

    setTransactions((prev) => [...prev, newTransaction]);
    toast.success("Expense added successfully!");
    resetForm();
  }, [file, form, resetForm, setTransactions, toast]);

  return { form, setFile, updateField, handleSubmit };
};
