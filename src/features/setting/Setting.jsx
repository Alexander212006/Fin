import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Moon,
  Palette,
  Settings,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";

import { EditProfileForm } from "./components/EditProfileForm";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { SectionCard } from "./components/SectionCard";
import { SettingRow } from "./components/SettingRow";
import { Toggle } from "./components/Toggle";
import { setInitialUserProfile } from "./utils/setInitialUserProfile";
import {
  loadStoredPassword,
  loadStoredPasswordUpdatedAt,
  saveStoredPassword,
} from "./utils/passwordManager";
import { exportFinancialDataCsv } from "./utils/exportFinancialData";
import { CURRENCIES, LANGUAGE_REGIONS } from "../../constants/currencies";
import { useI18n } from "../../i18n";
import { formatCurrency } from "../../utils/currency";
import {
  enableNotifications,
  getStoredFcmToken,
} from "../notification/firebaseConfig";
import { getCurrentMonthExpense } from "../notification/budgetAlerts";

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

export const Setting = ({
  darkMode,
  setDarkMode,
  currency,
  setCurrency,
  languageRegion,
  setLanguageRegion,
  budgetAlertSettings,
  setBudgetAlertSettings,
  transactions,
}) => {
  const { t } = useI18n();
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

  const handleExportFinancialData = () => {
    if (!transactions?.length) {
      toast.error(
        t(
          "settings.dangerZone.exportEmpty",
          "No financial data available to export.",
        ),
      );
      return;
    }

    const success = exportFinancialDataCsv(transactions);
    if (!success) {
      toast.error(
        t(
          "settings.dangerZone.exportFailed",
          "Unable to export CSV right now.",
        ),
      );
      return;
    }

    toast.success(
      t("settings.dangerZone.exportSuccess", "Financial data exported as CSV."),
    );
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[42px]">
          {t("settings.title")}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
          {t("settings.subtitle")}
        </p>
      </div>

      {isEditingProfile && (
        <EditProfileForm
          currentUser={currentUser}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditingProfile(false)}
        />
      )}
      {isChangingPassword && (
        <ChangePasswordForm
          onSubmit={handleChangePassword}
          hasStoredPassword={hasStoredPassword}
          onCancel={() => setIsChangingPassword(false)}
        />
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <SectionCard
            title={t("settings.sections.profile.title")}
            subtitle={t("settings.sections.profile.subtitle")}
          >
            <SettingRow
              icon={User}
              title={t("settings.sections.profile.profileInformation")}
              description={`${currentUser.firstName} ${currentUser.lastName} - ${currentUser.email}`}
              action={
                <button
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200"
                  onClick={() => setIsEditingProfile(true)}
                >
                  {t("settings.sections.profile.edit")}
                </button>
              }
            />
            <SettingRow
              icon={Wallet}
              title={t("settings.sections.profile.defaultCurrency")}
              description={`${selectedCurrency.name} (${selectedCurrency.code})`}
              action={
                <select
                  value={currency}
                  onChange={handleCurrencyChange}
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500"
                >
                  {CURRENCIES.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name} ({code})
                    </option>
                  ))}
                </select>
              }
            />
            <SettingRow
              icon={Globe}
              title={t("settings.sections.profile.languageRegion")}
              description={t(
                `options.languageRegions.${selectedLanguageRegion.value}`,
                selectedLanguageRegion.label,
              )}
              action={
                <select
                  value={languageRegion}
                  onChange={handleLanguageRegionChange}
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500"
                >
                  {LANGUAGE_REGIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              }
              noBorder
            />
          </SectionCard>

          <SectionCard
            title={t("settings.sections.notifications.title")}
            subtitle={t("settings.sections.notifications.subtitle")}
          >
            <SettingRow
              icon={Bell}
              title={t("settings.sections.notifications.pushNotifications")}
              description={t(
                "settings.sections.notifications.pushNotificationsDescription",
              )}
              action={
                <Toggle
                  enabled={notifications}
                  onToggle={handleNotificationToggle}
                />
              }
            />

            {notificationStatus && (
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-300">
                {notificationStatus}
              </div>
            )}

            <SettingRow
              icon={ShieldCheck}
              title={t("settings.sections.notifications.budgetAlerts")}
              description={t(
                "settings.sections.notifications.budgetAlertsDescription",
              )}
              action={
                <Toggle
                  enabled={isBudgetAlertEnabled}
                  onToggle={handleBudgetAlertToggle}
                />
              }
            />
            <SettingRow
              icon={Wallet}
              title={t(
                "settings.sections.notifications.monthlyBudgetLimit",
                "Monthly budget limit",
              )}
              description={t(
                "settings.sections.notifications.monthlyBudgetLimitDescription",
                "Alerts trigger at 80% and 100% of this limit.",
              )}
              action={
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={budgetAlertSettings?.monthlyLimit ?? 0}
                  onChange={handleBudgetLimitChange}
                  className={`w-32 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500 ${
                    !isBudgetAlertEnabled
                      ? "cursor-not-allowed opacity-50 focus:border-zinc-200 dark:focus:border-zinc-700"
                      : ""
                  }`}
                  disabled={!isBudgetAlertEnabled}
                />
              }
            />
            <SettingRow
              icon={Wallet}
              title={t(
                "settings.sections.notifications.thisMonthBudgetUsage",
                "This month usage",
              )}
              description={t(
                "settings.sections.notifications.thisMonthBudgetUsageDescription",
                "Current expenses compared to your monthly limit.",
              )}
              action={
                <span
                  aria-disabled={!isBudgetAlertEnabled}
                  className={`rounded-2xl bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 ${
                    !isBudgetAlertEnabled ? "opacity-50" : ""
                  }`}
                >
                  {budgetUsageText}
                </span>
              }
              noBorder
            />
          </SectionCard>

          <SectionCard
            title={t("settings.sections.appearance.title")}
            subtitle={t("settings.sections.appearance.subtitle")}
          >
            <SettingRow
              icon={Moon}
              title={t("settings.sections.appearance.darkMode")}
              description={t(
                "settings.sections.appearance.darkModeDescription",
              )}
              action={
                <Toggle
                  enabled={darkMode}
                  onToggle={() => setDarkMode((value) => !value)}
                />
              }
            />
            <SettingRow
              icon={Palette}
              title={t("settings.sections.appearance.accentColor")}
              description={t(
                "settings.sections.appearance.accentColorDescription",
              )}
              action={
                <ChevronRight className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              }
              noBorder
            />
          </SectionCard>

          <SectionCard
            title={t("settings.sections.security.title")}
            subtitle={t("settings.sections.security.subtitle")}
          >
            <SettingRow
              icon={Lock}
              title={t("settings.sections.security.changePassword")}
              description={passwordLastUpdatedText}
              action={
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200"
                >
                  {t("settings.sections.security.update")}
                </button>
              }
              noBorder
            />
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 sm:p-7">
            <div className="mb-5 flex items-start gap-4">
              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-700 p-3 text-zinc-700 dark:text-zinc-200">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">
                  {t("settings.appPreferences.title")}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("settings.appPreferences.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("settings.appPreferences.notifications")}:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {notifications
                    ? t("settings.appPreferences.enabled")
                    : t("settings.appPreferences.disabled", "Disabled")}
                </span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("settings.appPreferences.defaultCurrency")}:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {selectedCurrency.code}
                </span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("settings.sections.notifications.budgetAlerts")}:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {budgetAlertSettings?.enabled
                    ? t("settings.appPreferences.enabled")
                    : t("settings.appPreferences.disabled", "Disabled")}
                </span>
              </div>

              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("settings.appPreferences.themeMode")}:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {darkMode
                    ? t("settings.appPreferences.dark", "Dark")
                    : t("settings.appPreferences.light")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 sm:p-7">
            <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">
              {t("settings.dangerZone.title")}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {t("settings.dangerZone.subtitle")}
            </p>
            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={handleExportFinancialData}
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-3 text-left text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
              >
                {t("settings.dangerZone.exportData")}
              </button>
              <button className="w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-100">
                {t("settings.dangerZone.deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
