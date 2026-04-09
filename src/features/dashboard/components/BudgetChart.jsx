import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useI18n } from "../../../i18n";
import { formatCurrency } from "../../../utils/currency";

const COLORS = ["#10b981", "#ef4444"];

export const BudgetChart = ({ transactions = [], currency, languageRegion }) => {
  const { t } = useI18n();

  const data = [
    {
      name: t("dashboard.income"),
      value: transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    },
    {
      name: t("dashboard.expense"),
      value: transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    },
  ];

  return (
    <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-100 sm:text-xl">
        {t("dashboard.budgetOverview")}
      </h3>

      <div className="h-[250px] min-w-0 w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                formatCurrency(Number(value), currency, languageRegion)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-zinc-600 dark:text-zinc-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
