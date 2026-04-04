import { useMemo, useState } from "react";
import { ALL_ACCOUNTS_VALUE } from "../constants/transactionConstants";
import {
  filterTransactions,
  getTransactionSummary,
} from "../utils/buildTransactions";

export const useTransactionHistory = ({ transactions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("all-types");
  const [selectedAccount, setSelectedAccount] = useState(ALL_ACCOUNTS_VALUE);
  const [searchTransaction, setSearchTransaction] = useState("");

  const filteredTransactions = useMemo(
    () =>
      filterTransactions({
        transactions,
        selectedDate,
        selectedType,
        selectedAccount,
        searchTransaction,
      }),
    [
      transactions,
      selectedDate,
      selectedType,
      selectedAccount,
      searchTransaction,
    ],
  );

  const summary = useMemo(
    () => getTransactionSummary(filteredTransactions),
    [filteredTransactions],
  );

  return {
    filters: {
      selectedDate,
      setSelectedDate,
      selectedType,
      setSelectedType,
      selectedAccount,
      setSelectedAccount,
      searchTransaction,
      setSearchTransaction,
    },
    filteredTransactions,
    summary,
  };
};
