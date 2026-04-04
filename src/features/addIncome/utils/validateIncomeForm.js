import { REQUIRED_FIELDS } from "../constants/incomeForm";

export const validateIncomeForm = (form, file) => {
  for (const key of REQUIRED_FIELDS) {
    if (!form[key]?.toString().trim()) {
      return "Please fill in all required fields.";
    }
  }

  const amount = Number(form.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    return "Please enter a valid income amount.";
  }

  if (file) {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Please upload a JPG or PNG image.";
    }
  }

  return null;
};
