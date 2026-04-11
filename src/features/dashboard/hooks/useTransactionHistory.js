import { useEffect, useMemo, useRef, useState } from "react";
import {
  duplicateTransactionById,
  findTransactionById,
  removeTransactionById,
  replaceTransactionById,
} from "../utils/transactionHistory";

export const useTransactionHistory = ({ transactions, setTransactions }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (openMenuId === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenuId]);

  const handleDuplicate = (transactionId) => {
    const duplicatedTransaction = duplicateTransactionById(
      transactions,
      transactionId,
    );

    if (!duplicatedTransaction) {
      return;
    }

    setTransactions((previousTransactions) => [
      ...previousTransactions,
      duplicatedTransaction,
    ]);
  };

  const handleDelete = (transactionId) => {
    setTransactions((previousTransactions) =>
      removeTransactionById(previousTransactions, transactionId),
    );
  };

  const handleEdit = (transactionId) => {
    const transaction = findTransactionById(transactions, transactionId);
    if (!transaction) {
      return;
    }

    setEditingTransaction(transaction);
  };

  const handleTransactionAction = (actionKey, transactionId) => {
    setOpenMenuId(null);

    const handlers = {
      "add-again": () => handleDuplicate(transactionId),
      delete: () => handleDelete(transactionId),
      edit: () => handleEdit(transactionId),
    };

    handlers[actionKey]?.();
  };

  const handleSaveEdit = (updatedTransaction) => {
    setTransactions((previousTransactions) =>
      replaceTransactionById(previousTransactions, updatedTransaction),
    );
    setEditingTransaction(null);
  };

  const toggleMenu = (transactionId) => {
    setOpenMenuId((previousOpenMenuId) =>
      previousOpenMenuId === transactionId ? null : transactionId,
    );
  };

  const displayedTransactions = useMemo(
    () => transactions.toReversed(),
    [transactions],
  );

  return {
    openMenuId,
    menuRef,
    editingTransaction,
    displayedTransactions,
    setEditingTransaction,
    handleTransactionAction,
    handleSaveEdit,
    toggleMenu,
  };
};
