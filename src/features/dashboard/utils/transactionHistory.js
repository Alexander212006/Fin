export const findTransactionById = (transactions, transactionId) =>
  transactions.find((transaction) => transaction.id === transactionId);

export const duplicateTransactionById = (transactions, transactionId) => {
  const transaction = findTransactionById(transactions, transactionId);
  if (!transaction) {
    return null;
  }

  return {
    ...transaction,
    id: crypto.randomUUID(),
    date: new Date().toLocaleDateString("en-GB"),
  };
};

export const removeTransactionById = (transactions, transactionId) =>
  transactions.filter((transaction) => transaction.id !== transactionId);

export const replaceTransactionById = (transactions, updatedTransaction) =>
  transactions.map((transaction) =>
    transaction.id === updatedTransaction.id ? updatedTransaction : transaction,
  );
