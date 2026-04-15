import { memo } from "react";

export const InputField = memo(
  ({ label, placeholder, icon: Icon, type = "text", name, value, onChange }) => {
    return (
      <label className="block">
        <span className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:text-base">
          {label}
        </span>
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-3 transition focus-within:border-zinc-300 dark:focus-within:border-zinc-500 focus-within:bg-white dark:focus-within:bg-zinc-700">
          <Icon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 sm:text-base"
          />
        </div>
      </label>
    );
  },
);
