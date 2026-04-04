export const StatCard = ({ title, value, subtitle, icon: Icon, tone = "default" }) => {
  const tones = {
    default: "bg-zinc-100 text-zinc-700",
    income: "bg-emerald-100 text-emerald-600",
    expense: "bg-rose-100 text-rose-500",
  };

  return (
    <div className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className={`rounded-2xl p-3 ${tones[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-800 sm:text-3xl">{value}</p>
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
