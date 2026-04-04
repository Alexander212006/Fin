import { useForm } from "../../../hooks/useForm";
import { validateIncomeForm } from "../utils/validateIncomeForm";
import { buildIncomeTransaction } from "../utils/buildIncomeTransaction";
import { INITIAL_FORM_STATE } from "../constants/incomeForm";

export const useIncomeForm = ({ toast, setTransactions }) => {
  const { form, file, setFile, resetForm, updateField } =
    useForm(INITIAL_FORM_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateIncomeForm(form, file);
    if (error) {
      toast.error(error);
      return;
    }

    const newTransaction = buildIncomeTransaction(form, file);

    setTransactions((prev) => [...prev, newTransaction]);
    toast.success("Income added successfully!");
    resetForm();
  };

  return { form, setFile, updateField, handleSubmit };
};
