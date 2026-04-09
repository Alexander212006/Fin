import { TransactionItem } from "./TransactionItem";
import { TRANSACTION_TABLE_HEADERS } from "../constants/transactionConstants";
import { formatCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/date";
import { ACCOUNTS } from "../../../constants/accounts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getTransactionAccount } from "../utils/buildTransactions";
import { useI18n } from "../../../i18n";

export const TransactionTable = ({ transactions, currency, languageRegion }) => {
  const { t } = useI18n();
  return (
    <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">
            {t("history.recentTransactions")}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {t(
              "history.showingTransactionsThisMonth",
              "Showing {count} transaction{suffix} this month",
              {
                count: String(transactions.length),
                suffix: transactions.length === 1 ? "" : "s",
              },
            )}
          </p>
        </div>
        <button className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {t("history.export")}
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t("history.noTransactionsThisMonth")}
        </div>
      ) : null}

      <div className="space-y-3 lg:hidden">
        {transactions.map((item) => {
          const isIncome = item.type === "income";
          const account = getTransactionAccount(item);
          const accountLabel =
            t(
              `options.accounts.${account}`,
              ACCOUNTS.find((acc) => acc.value === account)?.label ?? t("history.emptyValue"),
            );

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-100">{item.title}</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      isIncome ? "text-emerald-600" : "text-rose-500"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(item.amount, currency, languageRegion)}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {item.category || t("history.emptyValue")}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                    isIncome
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-500"
                  }`}
                >
                  {isIncome ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {isIncome ? t("history.types.income") : t("history.types.expense")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white dark:bg-zinc-900 px-3 py-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    {t("history.tableHeaders.account")}
                  </p>
                  <p className="mt-1 text-zinc-700 dark:text-zinc-200">{accountLabel}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-zinc-900 px-3 py-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    {t("history.tableHeaders.date")}
                  </p>
                  <p className="mt-1 text-zinc-700 dark:text-zinc-200">{formatDate(item.date)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 lg:block">
        <table className="w-full border-collapse">
          <thead className="bg-[#fafafa] dark:bg-zinc-800 text-left">
            <tr className="text-sm text-zinc-500 dark:text-zinc-400">
              {TRANSACTION_TABLE_HEADERS.map((header) => (
                <th className="px-5 py-4 font-medium" key={header}>
                  {t(`history.tableHeaders.${header.toLowerCase()}`, header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <TransactionItem
                key={item.id}
                item={item}
                currency={currency}
                languageRegion={languageRegion}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
