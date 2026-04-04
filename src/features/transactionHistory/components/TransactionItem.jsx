import { formatCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/date";
import { ACCOUNTS } from "../../../constants/accounts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getTransactionAccount } from "../utils/buildTransactions";

export const TransactionItem = ({ item }) => {
  const isIncome = item.type === "income";
  const account = getTransactionAccount(item);
  const accountLabel =
    ACCOUNTS.find((acc) => acc.value === account)?.label ?? "N/A";

  return (
    <tr className="border-t border-zinc-200 text-sm text-zinc-700">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl p-2 ${
              isIncome
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-rose-500"
            }`}
          >
            {isIncome ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
          <span className="font-medium text-zinc-800">{item.title}</span>
        </div>
      </td>
      <td className="px-5 py-4">{item.category || "N/A"}</td>
      <td className="px-5 py-4">{accountLabel}</td>
      <td className="px-5 py-4">{formatDate(item.date)}</td>
      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </td>
      <td
        className={`px-5 py-4 text-right font-semibold ${
          isIncome ? "text-emerald-600" : "text-rose-500"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(item.amount)}
      </td>
    </tr>
  );
};
