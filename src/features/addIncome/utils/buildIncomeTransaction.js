export const buildIncomeTransaction = (form, file) => {
  return {
    id: crypto.randomUUID(),
    type: "income",
    ...form,
    title: form.title.trim(),
    amount: parseFloat(form.amount),
    source: form.source.trim(),
    account: form.account.trim(),
    notes: form.notes.trim(),
    file: file,
  };
};
