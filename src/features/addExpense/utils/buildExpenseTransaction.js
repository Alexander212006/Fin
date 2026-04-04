

export const buildExpenseTransaction = (form, file) => {
  return {
    id: crypto.randomUUID(),
    type: "expense",
    ...form,
    title: form.title.trim(),
    amount: parseFloat(form.amount),
    category: form.category.trim(),
    account: form.account.trim(),
    notes: form.notes.trim(),
    file: file,
  };
};
