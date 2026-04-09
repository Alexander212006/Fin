import {
  Search,
  Funnel,
  CalendarDays,
  Wallet,
  ChevronDown,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ACCOUNTS } from "../../../constants/accounts";
import {
  ALL_ACCOUNTS_VALUE,
  TRANSACTION_TYPE_OPTIONS,
} from "../constants/transactionConstants";
import { useI18n } from "../../../i18n";

export const FilterBar = ({
  selectedDate,
  setSelectedDate,
  selectedType,
  setSelectedType,
  selectedAccount,
  setSelectedAccount,
  searchTransaction,
  setSearchTransaction,
}) => {
  const { t } = useI18n();

  return (
    <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex w-full items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-3 lg:flex-[1.8]">
          <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
          <input
            value={searchTransaction}
            onChange={(e) => {
              setSearchTransaction(e.target.value);
            }}
            placeholder={t("history.searchTransaction")}
            className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto lg:flex lg:flex-shrink-0 lg:justify-end">
          <div className="relative w-full lg:min-w-[148px]">
            <Funnel className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
            <select
              className="w-full appearance-none rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-3 pl-9 pr-9 text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {TRANSACTION_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === "all-types"
                    ? t("history.types.all", option.label)
                    : t(`history.types.${option.value}`, option.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 lg:px-4 lg:whitespace-nowrap">
            <CalendarDays className="h-4 w-4" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="w-[78px] bg-transparent text-center outline-none"
            />
          </div>
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 lg:px-4 lg:whitespace-nowrap">
            <Wallet className="h-4 w-4" />
            <select
              name="account"
              id="account"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value={ALL_ACCOUNTS_VALUE}>{t("history.allAccounts")}</option>
              {ACCOUNTS.map((account) => (
                <option key={account.value} value={account.value}>
                  {t(`options.accounts.${account.value}`, account.label)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
