const BUDGET_ALERT_SETTINGS_KEY = "budgetAlertSettings";
const BUDGET_ALERT_PROGRESS_KEY = "budgetAlertProgress";

export const DEFAULT_BUDGET_ALERT_SETTINGS = {
  enabled: true,
  monthlyLimit: 3000,
};

const isPositiveNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const parseTransactionDate = (value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const dayMonthYearMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dayMonthYearMatch) {
    const [, day, month, year] = dayMonthYearMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const getMonthKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const getCurrentMonthExpense = (
  transactions = [],
  referenceDate = new Date(),
) => {
  const targetYear = referenceDate.getFullYear();
  const targetMonth = referenceDate.getMonth();

  return transactions.reduce((total, transaction) => {
    if (transaction?.type !== "expense") {
      return total;
    }

    const transactionDate = parseTransactionDate(transaction.date);
    if (
      !transactionDate ||
      transactionDate.getFullYear() !== targetYear ||
      transactionDate.getMonth() !== targetMonth
    ) {
      return total;
    }

    const amount = Number(transaction.amount);
    return Number.isFinite(amount) ? total + amount : total;
  }, 0);
};

export const getBudgetAlertLevel = (spent, monthlyLimit) => {
  if (!isPositiveNumber(monthlyLimit) || monthlyLimit === 0) {
    return null;
  }

  if (spent >= monthlyLimit) {
    return "exceeded";
  }

  if (spent >= monthlyLimit * 0.8) {
    return "warning";
  }

  return null;
};

export const loadBudgetAlertSettings = () => {
  const rawValue = localStorage.getItem(BUDGET_ALERT_SETTINGS_KEY);

  if (!rawValue) {
    return DEFAULT_BUDGET_ALERT_SETTINGS;
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    return {
      enabled:
        typeof parsedValue.enabled === "boolean"
          ? parsedValue.enabled
          : DEFAULT_BUDGET_ALERT_SETTINGS.enabled,
      monthlyLimit: isPositiveNumber(parsedValue.monthlyLimit)
        ? parsedValue.monthlyLimit
        : DEFAULT_BUDGET_ALERT_SETTINGS.monthlyLimit,
    };
  } catch {
    return DEFAULT_BUDGET_ALERT_SETTINGS;
  }
};

export const saveBudgetAlertSettings = (settings) => {
  localStorage.setItem(BUDGET_ALERT_SETTINGS_KEY, JSON.stringify(settings));
};

export const loadBudgetAlertProgress = () => {
  const rawValue = localStorage.getItem(BUDGET_ALERT_PROGRESS_KEY);

  if (!rawValue) {
    return {
      monthKey: "",
      level: null,
    };
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return {
      monthKey:
        typeof parsedValue.monthKey === "string" ? parsedValue.monthKey : "",
      level:
        parsedValue.level === "warning" || parsedValue.level === "exceeded"
          ? parsedValue.level
          : null,
    };
  } catch {
    return {
      monthKey: "",
      level: null,
    };
  }
};

export const saveBudgetAlertProgress = (monthKey, level) => {
  localStorage.setItem(
    BUDGET_ALERT_PROGRESS_KEY,
    JSON.stringify({
      monthKey,
      level,
    }),
  );
};
