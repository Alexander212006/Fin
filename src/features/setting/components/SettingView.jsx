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
import { EditProfileForm } from "./EditProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";
import { Toggle } from "./Toggle";
import { CURRENCIES, LANGUAGE_REGIONS } from "../../../constants/currencies";

export const SettingView = ({
  t,
  darkMode,
  setDarkMode,
  currency,
  languageRegion,
  budgetAlertSettings,
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
  openProfileEditor,
  closeProfileEditor,
  openPasswordEditor,
  closePasswordEditor,
}) => (
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
        onCancel={closeProfileEditor}
      />
    )}
    {isChangingPassword && (
      <ChangePasswordForm
        onSubmit={handleChangePassword}
        hasStoredPassword={hasStoredPassword}
        onCancel={closePasswordEditor}
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
                onClick={openProfileEditor}
              >
                {t("settings.sections.profile.edit")}
              </button>
            }
          />
          <SettingRow
            icon={Wallet}
            title={t("settings.sections.profile.defaultCurrency")}
            description={`${selectedCurrency.name} (${selectedCurrency.code})`}
            titleClassName="truncate"
            descriptionClassName="truncate sm:whitespace-normal"
            action={
              <select
                value={currency}
                onChange={handleCurrencyChange}
                onClick={(event) => event.stopPropagation()}
                className="w-[42vw] max-w-[170px] rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500 sm:w-[220px] sm:max-w-none"
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
            titleClassName="truncate"
            descriptionClassName="truncate sm:whitespace-normal"
            action={
              <select
                value={languageRegion}
                onChange={handleLanguageRegionChange}
                onClick={(event) => event.stopPropagation()}
                className="w-[42vw] max-w-[170px] rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500 sm:w-[220px] sm:max-w-none"
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
            titleClassName="truncate"
            descriptionClassName="truncate sm:whitespace-normal"
            action={
              <input
                type="number"
                min="0"
                step="0.01"
                value={budgetAlertSettings?.monthlyLimit ?? 0}
                onChange={handleBudgetLimitChange}
                className={`w-[42vw] max-w-[140px] rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-200 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500 sm:w-32 sm:max-w-none ${
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
            titleClassName="truncate"
            descriptionClassName="truncate sm:whitespace-normal"
            action={
              <span
                aria-disabled={!isBudgetAlertEnabled}
                className={`inline-block w-[42vw] max-w-[180px] truncate rounded-2xl bg-[#fafafa] dark:bg-zinc-800 px-3 py-2 text-right text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:w-auto sm:max-w-none sm:text-left sm:truncate-none ${
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
            description={t("settings.sections.appearance.darkModeDescription")}
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
            description={t("settings.sections.appearance.accentColorDescription")}
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
                onClick={openPasswordEditor}
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
              onClick={onExportFinancialData}
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
