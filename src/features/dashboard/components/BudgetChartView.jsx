import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../../utils/currency";

const TOTAL_COLORS = ["#10b981", "#ef4444"];
const INCOME_BREAKDOWN_COLORS = [
  "#0ea5e9",
  "#10b981",
  "#14b8a6",
  "#22c55e",
  "#06b6d4",
  "#84cc16",
  "#38bdf8",
  "#34d399",
];
const EXPENSE_WARNING_COLORS = [
  "#dc2626",
  "#ea580c",
  "#f59e0b",
  "#f97316",
  "#e11d48",
  "#ef4444",
  "#fb7185",
  "#fbbf24",
  "#f97316",
];

const renderTooltip = (value, payload, currency, languageRegion) => {
  const label = payload?.payload?.label || payload?.name || "";
  return [formatCurrency(Number(value), currency, languageRegion), label];
};

export const BudgetChartView = ({
  t,
  totalData,
  incomeBySource,
  expenseByCategory,
  hasIncomeBreakdown,
  hasExpenseBreakdown,
  currency,
  languageRegion,
}) => (
  <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 sm:p-6">
    <h3 className="mb-4 text-lg font-medium text-zinc-800 dark:text-zinc-100 sm:text-xl">
      {t("dashboard.budgetOverview")}
    </h3>

    <div className="h-[250px] min-w-0 w-full sm:h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={totalData}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
          >
            {totalData.map((_, index) => (
              <Cell key={index} fill={TOTAL_COLORS[index]} />
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
      {totalData.map((item, index) => (
        <div key={item.name} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: TOTAL_COLORS[index] }}
          />
          <span className="text-zinc-600 dark:text-zinc-300">{item.name}</span>
        </div>
      ))}
    </div>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
        <h4 className="mb-4 text-base font-medium text-zinc-800 dark:text-zinc-100">
          {t("dashboard.income")} - {t("forms.fields.source")}
        </h4>
        {!hasIncomeBreakdown ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("dashboard.noTransactions")}</p>
        ) : (
          <>
            <div className="h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeBySource}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={45}
                    outerRadius={82}
                    paddingAngle={2}
                  >
                    {incomeBySource.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={
                          INCOME_BREAKDOWN_COLORS[
                            index % INCOME_BREAKDOWN_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, payload) =>
                      renderTooltip(value, payload, currency, languageRegion)
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {incomeBySource.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                            INCOME_BREAKDOWN_COLORS[
                              index % INCOME_BREAKDOWN_COLORS.length
                            ],
                      }}
                    />
                    <span className="text-zinc-600 dark:text-zinc-300">{item.label}</span>
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-100">
                    {formatCurrency(item.value, currency, languageRegion)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
        <h4 className="mb-4 text-base font-medium text-zinc-800 dark:text-zinc-100">
          {t("dashboard.expense")} - {t("forms.fields.category")}
        </h4>
        {!hasExpenseBreakdown ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("dashboard.noTransactions")}</p>
        ) : (
          <>
            <div className="h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={45}
                    outerRadius={82}
                    paddingAngle={2}
                  >
                    {expenseByCategory.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={
                          EXPENSE_WARNING_COLORS[
                            index % EXPENSE_WARNING_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, payload) =>
                      renderTooltip(value, payload, currency, languageRegion)
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {expenseByCategory.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                            EXPENSE_WARNING_COLORS[
                              index % EXPENSE_WARNING_COLORS.length
                            ],
                      }}
                    />
                    <span className="text-zinc-600 dark:text-zinc-300">{item.label}</span>
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-100">
                    {formatCurrency(item.value, currency, languageRegion)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
