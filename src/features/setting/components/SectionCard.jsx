export const SectionCard = ({ title, subtitle, children }) => {
  return (
    <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 sm:p-7">
      <div className="mb-5">
        <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">{title}</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
