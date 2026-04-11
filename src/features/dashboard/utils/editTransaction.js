export const buildUpdatedTransaction = (transaction, formData) => {
  const { wallet, ...transactionWithoutWallet } = transaction || {};

  return {
    ...transactionWithoutWallet,
    ...formData,
  };
};
