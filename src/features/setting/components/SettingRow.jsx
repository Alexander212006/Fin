export const SettingRow = ({
  icon: Icon,
  title,
  description,
  action,
  noBorder = false,
  stackOnMobile = false,
  actionClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <div
      className={`${stackOnMobile ? "flex flex-col items-stretch gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4" : "flex items-center justify-between gap-4 py-4"} ${
        noBorder ? "" : "border-b border-zinc-200 dark:border-zinc-700"
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-3 text-zinc-600 dark:text-zinc-300">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className={`font-medium text-zinc-800 dark:text-zinc-100 ${titleClassName}`.trim()}>
            {title}
          </p>
          <p
            className={`mt-1 text-sm text-zinc-500 dark:text-zinc-400 ${descriptionClassName}`.trim()}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className={`${stackOnMobile ? "w-full sm:w-auto" : "shrink-0"} ${actionClassName}`.trim()}
      >
        {action}
      </div>
    </div>
  );
};
