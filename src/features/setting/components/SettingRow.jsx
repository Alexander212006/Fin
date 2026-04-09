export const SettingRow = ({
  icon: Icon,
  title,
  description,
  action,
  noBorder = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        noBorder ? "" : "border-b border-zinc-200 dark:border-zinc-700"
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-3 text-zinc-600 dark:text-zinc-300">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-zinc-800 dark:text-zinc-100">{title}</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
};
