import React, { useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  Languages,
  Lock,
  Moon,
  Palette,
  Settings,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";

import { EditProfileForm } from "./components/EditProfileForm";
import { SectionCard } from "./components/SectionCard";
import { SettingRow } from "./components/SettingRow";
import { Toggle } from "./components/Toggle";
import { setInitialUserProfile } from "./utils/setInitialUserProfile";
import { CURRENCIES, LANGUAGE_REGIONS } from "../../constants/currencies";
import { useI18n } from "../../i18n";
import {
  enableNotifications,
  getStoredFcmToken,
} from "../notification/firebaseConfig";

const user = {
  userId: crypto.randomUUID(),
  firstName: "Alex",
  lastName: "Francisco",
  email: "alex@gmail.com",
};



export const Setting = ({ currency, setCurrency, languageRegion, setLanguageRegion}) => {
  const { t } = useI18n();
  const [notifications, setNotifications] = useState(
    () => Notification.permission === "granted" || Boolean(getStoredFcmToken()),
  );
  const [notificationStatus, setNotificationStatus] = useState("");
  const [fcmToken, setFcmToken] = useState(() => getStoredFcmToken() ?? "");
  const [darkMode, setDarkMode] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [currentUser, setCurrentUser] = useState(() =>
    setInitialUserProfile(user),
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);


  const selectedCurrency =
    CURRENCIES.find(({ code }) => code === currency) ?? CURRENCIES[0];
    
  const selectedLanguageRegion = LANGUAGE_REGIONS.find(({value}) => value === languageRegion) ?? LANGUAGE_REGIONS[0];

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

  const hadleLanguageRegionChange = (event) => {
    setLanguageRegion(event.target.value);
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
      setFcmToken(token);
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

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 sm:text-[42px]">
          {t("settings.title")}
        </h2>
        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <SectionCard
            title={t("settings.sections.profile.title")}
            subtitle={t("settings.sections.profile.subtitle")}
          >
            <SettingRow
              icon={User}
              title={t("settings.sections.profile.profileInformation")}
              description={`${currentUser.firstName} ${currentUser.lastName} • ${currentUser.email}`}
              action={
                <button
                  className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-2 text-sm font-medium text-zinc-700"
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
                  className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-3 py-2 text-sm font-medium text-zinc-700 outline-none transition focus:border-zinc-400"
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
                  onChange={hadleLanguageRegionChange}
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-3 py-2 text-sm font-medium text-zinc-700 outline-none transition focus:border-zinc-400"
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
              description={t("settings.sections.notifications.pushNotificationsDescription")}
              action={
                <Toggle
                  enabled={notifications}
                  onToggle={handleNotificationToggle}
                />
              }
            />
            {notificationStatus ? (
              <div className="rounded-2xl bg-[#f7f7f7] p-4 text-sm text-zinc-600">
                {notificationStatus}
              </div>
            ) : null}
            {fcmToken ? (
              <div className="rounded-2xl bg-[#f7f7f7] p-4 text-sm text-zinc-600">
                <div className="font-medium text-zinc-800">FCM token</div>
                <div className="mt-2 break-all font-mono text-xs text-zinc-500">
                  {fcmToken}
                </div>
              </div>
            ) : null}
            <SettingRow
              icon={ShieldCheck}
              title={t("settings.sections.notifications.budgetAlerts")}
              description={t("settings.sections.notifications.budgetAlertsDescription")}
              action={
                <Toggle
                  enabled={budgetAlerts}
                  onToggle={() => setBudgetAlerts((value) => !value)}
                />
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
              action={<ChevronRight className="h-5 w-5 text-zinc-400" />}
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
              description={t("settings.sections.security.changePasswordDescription")}
              action={
                <button className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-2 text-sm font-medium text-zinc-700">
                  {t("settings.sections.security.update")}
                </button>
              }
              noBorder
            />
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-zinc-200 bg-white p-6 sm:p-7">
            <div className="mb-5 flex items-start gap-4">
              <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-zinc-800">
                  {t("settings.appPreferences.title")}
                </h3>
                <p className="text-sm text-zinc-500">
                  {t("settings.appPreferences.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                {t("settings.appPreferences.notifications")}:{" "}
                <span className="font-medium text-zinc-800">{t("settings.appPreferences.enabled")}</span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                {t("settings.appPreferences.defaultCurrency")}:{" "}
                <span className="font-medium text-zinc-800">
                  {selectedCurrency.code}
                </span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                {t("settings.appPreferences.loginSecurity")}:{" "}
                <span className="font-medium text-zinc-800">{t("settings.appPreferences.biometric")}</span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                {t("settings.appPreferences.themeMode")}:{" "}
                <span className="font-medium text-zinc-800">{t("settings.appPreferences.light")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-zinc-200 bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-medium text-zinc-800">{t("settings.dangerZone.title")}</h3>
            <p className="mt-2 text-sm text-zinc-500">
              {t("settings.dangerZone.subtitle")}
            </p>
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-3 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
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
