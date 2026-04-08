import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/currency";
import {
  getBudgetAlertLevel,
  getCurrentMonthExpense,
  getMonthKey,
  loadBudgetAlertProgress,
  saveBudgetAlertProgress,
} from "./budgetAlerts";

const showBrowserNotification = (title, body) => {
  if (typeof Notification === "undefined") {
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
};

export const useBudgetAlerts = ({
  transactions,
  budgetAlertSettings,
  currency,
  languageRegion,
}) => {
  useEffect(() => {
    if (!budgetAlertSettings?.enabled) {
      return;
    }

    const monthlyLimit = Number(budgetAlertSettings.monthlyLimit);
    if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
      return;
    }

    const spent = getCurrentMonthExpense(transactions);
    const level = getBudgetAlertLevel(spent, monthlyLimit);
    const monthKey = getMonthKey();
    const previousProgress = loadBudgetAlertProgress();

    if (level === null) {
      if (previousProgress.monthKey === monthKey && previousProgress.level) {
        saveBudgetAlertProgress(monthKey, null);
      }
      return;
    }

    if (
      previousProgress.monthKey === monthKey &&
      previousProgress.level === level
    ) {
      return;
    }

    const spentText = formatCurrency(spent, currency, languageRegion);
    const limitText = formatCurrency(monthlyLimit, currency, languageRegion);

    if (level === "warning") {
      const title = "Budget alert";
      const body = `You have spent ${spentText} out of ${limitText} this month.`;
      toast(body);
      showBrowserNotification(title, body);
    }

    if (level === "exceeded") {
      const title = "Budget limit reached";
      const body = `You have exceeded your monthly limit: ${spentText} spent vs ${limitText}.`;
      toast.error(body);
      showBrowserNotification(title, body);
    }

    saveBudgetAlertProgress(monthKey, level);
  }, [
    budgetAlertSettings?.enabled,
    budgetAlertSettings?.monthlyLimit,
    currency,
    languageRegion,
    transactions,
  ]);
};
