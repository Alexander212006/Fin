import { EditTransactionForm } from "./EditTransactionForm";
import { TransactionHistoryItem } from "./TransactionHistoryItem";
import { useI18n } from "../../../i18n";
import { NavLink } from "react-router-dom";
import { useTransactionHistory } from "../hooks/useTransactionHistory";
import { getTransactionHistoryActions } from "../config/transactionHistoryActions";

export const TransactionHistory = ({
  transactions,
  setTransactions,
  currency,
  languageRegion,
}) => {
  const { t } = useI18n();
  const {
    openMenuId,
    menuRef,
    editingTransaction,
    displayedTransactions,
    setEditingTransaction,
    handleTransactionAction,
    handleSaveEdit,
    toggleMenu,
  } = useTransactionHistory({ transactions, setTransactions });
  const transactionActions = getTransactionHistoryActions(t);

  return (
    <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">
            {t("dashboard.transactionHistory")}
          </h3>
        </div>
        <NavLink className="text-sm font-medium text-sky-600 hover:text-sky-700 sm:text-lg"
        to={"/History"}>
          {t("dashboard.showAll")}
        </NavLink>
      </div>

      <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-300">{t("dashboard.today")}</p>

      <div className="relative space-y-6">
        <div className="absolute bottom-3 left-1.5 top-3 w-px bg-zinc-300 dark:bg-zinc-600" />

        {editingTransaction && (
          <EditTransactionForm
            transaction={editingTransaction}
            onSave={handleSaveEdit}
            onCancel={() => setEditingTransaction(null)}
          />
        )}

        {transactions.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400">{t("dashboard.noTransactions")}</p>
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
              onToggleMenu={() => toggleMenu(transaction.id)}
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
