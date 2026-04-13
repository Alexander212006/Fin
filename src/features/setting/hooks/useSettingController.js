import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CURRENCIES, LANGUAGE_REGIONS } from "../../../constants/currencies";
import { formatCurrency } from "../../../utils/currency";
import {
  enableNotifications,
  getStoredFcmToken,
} from "../../notification/firebaseConfig";
import { getCurrentMonthExpense } from "../../notification/budgetAlerts";
import { setInitialUserProfile } from "../utils/setInitialUserProfile";
import {
  loadStoredPassword,
  loadStoredPasswordUpdatedAt,
  saveStoredPassword,
} from "../utils/passwordManager";
import { handleExportFinancialData } from "../utils/handleExportFinancialData";

const user = {
  userId: crypto.randomUUID(),
  firstName: "Alex",
  lastName: "Francisco",
  email: "alex@gmail.com",
};

const getRelativePasswordUpdateText = (updatedAt, nowMs, t) => {
  if (!updatedAt) {
    return t(
      "settings.sections.security.changePasswordDescriptionNever",
      "Password has not been updated yet",
    );
  }

  const diffMs = Math.max(0, nowMs - updatedAt.getTime());
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return t(
      "settings.sections.security.changePasswordDescriptionJustNow",
      "Last updated just now",
    );
  }

  if (diffMinutes < 60) {
    return t(
      "settings.sections.security.changePasswordDescriptionMinutesAgo",
      "Last updated {count} minutes ago",
      { count: String(diffMinutes) },
    );
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return t(
      "settings.sections.security.changePasswordDescriptionHoursAgo",
      "Last updated {count} hours ago",
      { count: String(diffHours) },
    );
  }

  const diffDays = Math.floor(diffHours / 24);

  return t(
    "settings.sections.security.changePasswordDescriptionDaysAgo",
    "Last updated {count} days ago",
    { count: String(diffDays) },
  );
};

export const useSettingController = ({
  t,
  currency,
  setCurrency,
  languageRegion,
  setLanguageRegion,
  budgetAlertSettings,
  setBudgetAlertSettings,
  transactions,
}) => {
  const [notifications, setNotifications] = useState(
    () =>
      (typeof Notification !== "undefined" &&
        Notification.permission === "granted") ||
      Boolean(getStoredFcmToken()),
  );
  const [notificationStatus, setNotificationStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(() =>
    setInitialUserProfile(user),
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTimeMs(Date.now());
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const selectedCurrency =
    CURRENCIES.find(({ code }) => code === currency) ?? CURRENCIES[0];
  const selectedLanguageRegion =
    LANGUAGE_REGIONS.find(({ value }) => value === languageRegion) ??
    LANGUAGE_REGIONS[0];

  const monthlyExpense = useMemo(
    () => getCurrentMonthExpense(transactions),
    [transactions],
  );
  const monthlyLimitValue = Number(budgetAlertSettings?.monthlyLimit) || 0;
  const isBudgetAlertEnabled = Boolean(budgetAlertSettings?.enabled);
  const hasStoredPassword = Boolean(loadStoredPassword());
  const passwordLastUpdatedAt = loadStoredPasswordUpdatedAt();
  const passwordLastUpdatedText = getRelativePasswordUpdateText(
    passwordLastUpdatedAt,
    currentTimeMs,
    t,
  );
  const budgetUsageText = `${formatCurrency(monthlyExpense, currency, languageRegion)} / ${formatCurrency(monthlyLimitValue, currency, languageRegion)}`;

  const handleSaveEdit = (updatedProfile) => {
    setCurrentUser((previousUser) => ({
      ...previousUser,
      ...updatedProfile,
    }));
    setIsEditingProfile(false);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLanguageRegionChange = (event) => {
    setLanguageRegion(event.target.value);
  };

  const handleBudgetAlertToggle = () => {
    setBudgetAlertSettings((previous) => ({
      ...previous,
      enabled: !previous.enabled,
    }));
  };

  const handleBudgetLimitChange = (event) => {
    const rawValue = event.target.value.trim();

    if (rawValue === "") {
      setBudgetAlertSettings((previous) => ({
        ...previous,
        monthlyLimit: 0,
      }));
      return;
    }

    const parsedValue = Number(rawValue);
    if (!Number.isFinite(parsedValue) || parsedValue < 0) {
      return;
    }

    setBudgetAlertSettings((previous) => ({
      ...previous,
      monthlyLimit: parsedValue,
    }));
  };

  const handleNotificationToggle = async () => {
    if (notifications) {
      setNotifications(false);
      setNotificationStatus(
        "Notifications disabled in app. Browser permission and saved token remain available for testing.",
      );
      return;
    }

    try {
      const token = await enableNotifications();
      setNotifications(true);
      setNotificationStatus(
        "Push notifications are enabled. Copy the token below and use Firebase Console -> Messaging -> Send test message.",
      );
      console.log("FCM registration token:", token);
    } catch (error) {
      setNotifications(false);
      setNotificationStatus(error.message);
      console.error("Unable to enable notifications:", error);
    }
  };

  const handleChangePassword = ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    const savedPassword = loadStoredPassword();
    const hasExistingPassword = Boolean(savedPassword);

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(
        t(
          "settings.changePassword.validation.required",
          "Please fill in all password fields.",
        ),
      );
      return false;
    }

    if (hasExistingPassword && currentPassword !== savedPassword) {
      toast.error(
        t(
          "settings.changePassword.validation.currentMismatch",
          "Current password is incorrect.",
        ),
      );
      return false;
    }

    if (newPassword.length < 8) {
      toast.error(
        t(
          "settings.changePassword.validation.minLength",
          "New password must be at least 8 characters.",
        ),
      );
      return false;
    }

    if (hasExistingPassword && newPassword === currentPassword) {
      toast.error(
        t(
          "settings.changePassword.validation.sameAsCurrent",
          "New password must be different from current password.",
        ),
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        t(
          "settings.changePassword.validation.confirmMismatch",
          "New password and confirmation do not match.",
        ),
      );
      return false;
    }

    saveStoredPassword(newPassword);
    setIsChangingPassword(false);
    toast.success(
      t("settings.changePassword.success", "Password updated successfully."),
    );
    return true;
  };

  const onExportFinancialData = () => {
    handleExportFinancialData({
      transactions,
      t,
      messages: {
        emptyKey: "settings.dangerZone.exportEmpty",
        emptyFallback: "No financial data available to export.",
        failedKey: "settings.dangerZone.exportFailed",
        failedFallback: "Unable to export CSV right now.",
        successKey: "settings.dangerZone.exportSuccess",
        successFallback: "Financial data exported as CSV.",
      },
    });
  };

  return {
    notifications,
    notificationStatus,
    currentUser,
    isEditingProfile,
    isChangingPassword,
    selectedCurrency,
    selectedLanguageRegion,
    isBudgetAlertEnabled,
    hasStoredPassword,
    passwordLastUpdatedText,
    budgetUsageText,
    handleSaveEdit,
    handleCurrencyChange,
    handleLanguageRegionChange,
    handleBudgetAlertToggle,
    handleBudgetLimitChange,
    handleNotificationToggle,
    handleChangePassword,
    onExportFinancialData,
    openProfileEditor: () => setIsEditingProfile(true),
    closeProfileEditor: () => setIsEditingProfile(false),
    openPasswordEditor: () => setIsChangingPassword(true),
    closePasswordEditor: () => setIsChangingPassword(false),
  };
};
