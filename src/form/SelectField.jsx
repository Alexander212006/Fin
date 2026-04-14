import { memo } from "react";
import { useI18n } from "../i18n";

export const SelectField = memo(({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}) => {
  const { t } = useI18n();

  return (
    <label className="block">
      <span className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:text-base">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-3 transition focus-within:border-zinc-300 dark:focus-within:border-zinc-500 focus-within:bg-white dark:focus-within:bg-zinc-700">
        <Icon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
        <select
          value={value || ""}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-100 outline-none sm:text-base"
        > 
        <option value="">{t("forms.selectPrompt", "Select a {label}", { label: label.toLowerCase() })}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
} )


