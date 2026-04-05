import { useState, useRef, useEffect } from "react";
import { EditTransactionForm } from "./EditTransactionForm";
import { TransactionHistoryItem } from "./TransactionHistoryItem";
import { useI18n } from "../../../i18n";

export const TransactionHistory = ({
  transactions,
  setTransactions,
  currency,
  languageRegion,
}) => {
  const { t } = useI18n();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const transactionActions = [
    { label: t("dashboard.actions.addAgain"), key: "add-again" },
    { label: t("dashboard.actions.edit"), key: "edit" },
    { label: t("dashboard.actions.delete"), key: "delete", danger: true },
  ];

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
    const found = transactions.find((item) => item.id === transactionId);
    if (!found) return;

    const duplicatedTransaction = {
      ...found,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString("en-GB"),
    };

    setTransactions((prev) => [...prev, duplicatedTransaction]);
  };

  const handleDelete = (transactionId) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== transactionId),
    );
  };

  const handleEdit = (transactionId) => {
    const found = transactions.find((item) => item.id === transactionId);
    if (!found) return;

    setEditingTransaction(found);
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
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item,
      ),
    );
    setEditingTransaction(null);
  };

  const displayedTransactions = transactions.toReversed();

  return (
    <div className="rounded-[30px] border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium text-zinc-800">
            {t("dashboard.transactionHistory")}
          </h3>
        </div>
        <button className="text-sm font-medium text-sky-600 hover:text-sky-700 sm:text-lg">
          {t("dashboard.showAll")}
        </button>
      </div>

      <p className="mb-6 text-lg text-zinc-600">{t("dashboard.today")}</p>

      <div className="relative space-y-6">
        <div className="absolute bottom-3 left-1.5 top-3 w-px bg-zinc-300" />

        {editingTransaction && (
          <EditTransactionForm
            transaction={editingTransaction}
            onSave={handleSaveEdit}
            onCancel={() => setEditingTransaction(null)}
          />
        )}

        {transactions.length === 0 ? (
          <p className="text-center text-zinc-500">{t("dashboard.noTransactions")}</p>
        ) : (
          displayedTransactions.map((transaction) => (
            <TransactionHistoryItem
              key={transaction.id}
              transaction={transaction}
              currency={currency}
              languageRegion={languageRegion}
              actions={transactionActions}
              isMenuOpen={openMenuId === transaction.id}
              menuRef={openMenuId === transaction.id ? menuRef : null}
              onToggleMenu={() =>
                setOpenMenuId((prev) =>
                  prev === transaction.id ? null : transaction.id,
                )
              }
              onAction={(actionKey) =>
                handleTransactionAction(actionKey, transaction.id)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
