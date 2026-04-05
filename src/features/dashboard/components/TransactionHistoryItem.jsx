import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { formatCompactPeso } from "../../../utils/currency";
import { useI18n } from "../../../i18n";

export const TransactionHistoryItem = ({
  transaction,
  actions,
  isMenuOpen,
  menuRef,
  onToggleMenu,
  onAction,
  currency,
  languageRegion
}) => {
  const { t } = useI18n();
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? TrendingUp : TrendingDown;
  const dotColor = isIncome ? "bg-emerald-500" : "bg-rose-500";
  const iconBgColor = isIncome
    ? "bg-emerald-100 text-emerald-600"
    : "bg-rose-100 text-rose-500";

  return (
    <div className="relative flex items-center gap-3 pl-6 sm:gap-4">
      <span
        className={`absolute left-0 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-white ${dotColor}`}
      />

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBgColor}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-700 sm:text-lg">
          {transaction.title}
        </p>
      </div>

      <p
        className={`text-sm font-medium sm:text-lg ${
          isIncome ? "text-emerald-500" : "text-rose-500"
        }`}
      >
        {formatCompactPeso(transaction.amount, transaction.type, currency, languageRegion)}
      </p>

      <div className="relative" ref={menuRef}>
        <button
          onClick={onToggleMenu}
          className="rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
          aria-label={`${t("dashboard.actions.edit")} ${transaction.title}`}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={() => onAction(action.key)}
                className={`flex w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  action.danger
                    ? "text-rose-500 hover:bg-rose-50"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
