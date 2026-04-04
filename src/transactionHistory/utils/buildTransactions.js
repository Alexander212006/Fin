import { ALL_ACCOUNTS_VALUE } from "../constants/transactionConstants";

export const getTransactionAccount = (item) => item.account;

export const matchesSearchTerm = (item, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (normalizedSearch === "") {
    return true;
  }

  const account = getTransactionAccount(item);

  return [item.title, item.category, item.amount, account]
    .filter(Boolean)
    .some((value) => value.toString().toLowerCase().includes(normalizedSearch));
};

export const filterTransactions = ({
  transactions,
  selectedDate,
  selectedType,
  selectedAccount,
  searchTransaction,
}) => {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  return transactions.filter((item) => {
    const transactionDate = new Date(item.date);
    const account = getTransactionAccount(item);

    if (Number.isNaN(transactionDate.getTime())) {
      return false;
    }

    const matchesMonth =
      transactionDate.getFullYear() === currentYear &&
      transactionDate.getMonth() === currentMonth;
    const matchesType =
      selectedType === "all-types" || item.type === selectedType;
    const matchesAccount =
      selectedAccount === ALL_ACCOUNTS_VALUE || account === selectedAccount;

    return (
      matchesMonth &&
      matchesType &&
      matchesAccount &&
      matchesSearchTerm(item, searchTransaction)
    );
  });
};

export const getTransactionSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    total: transactions.length,
    income,
    expense,
  };
};
