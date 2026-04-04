import React, { useState } from "react";
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

import { EditProfileForm } from "./components/EditProfileForm";
import { SectionCard } from "./components/SectionCard";
import { SettingRow } from "./components/SettingRow";
import { Toggle } from "./components/Toggle";
import { setInitialUserProfile } from "./utils/setInitialUserProfile";

const user = {
  userId: crypto.randomUUID(),
  firstName: "Alex",
  lastName: "Francisco",
  email: "alex@gmail.com",
};

export const Setting = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [currentUser, setCurrentUser] = useState(() =>
    setInitialUserProfile(user),
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveEdit = (updatedProfile) => {
    setCurrentUser((previousUser) => ({
      ...previousUser,
      ...updatedProfile,
    }));
    setIsEditingProfile(false);
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 sm:text-[42px]">
          Settings
        </h2>
        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
          Manage your account, preferences, security, and app behavior.
        </p>
      </div>

      {isEditingProfile ? (
        <EditProfileForm
          currentUser={currentUser}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditingProfile(false)}
        />
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <SectionCard
            title="Profile"
            subtitle="Basic account information and currency preferences"
          >
            <SettingRow
              icon={User}
              title="Profile information"
              description={`${currentUser.firstName} ${currentUser.lastName} • ${currentUser.email}`}
              action={
                <button
                  className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-2 text-sm font-medium text-zinc-700"
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit
                </button>
              }
            />
            <SettingRow
              icon={Wallet}
              title="Default currency"
              description="Philippine Peso (PHP)"
              action={<ChevronRight className="h-5 w-5 text-zinc-400" />}
            />
            <SettingRow
              icon={Globe}
              title="Language & region"
              description="English • Philippines"
              action={<ChevronRight className="h-5 w-5 text-zinc-400" />}
              noBorder
            />
          </SectionCard>

          <SectionCard
            title="Notifications"
            subtitle="Control reminders and account alerts"
          >
            <SettingRow
              icon={Bell}
              title="Push notifications"
              description="Receive alerts for transactions and account activity"
              action={
                <Toggle
                  enabled={notifications}
                  onToggle={() => setNotifications((value) => !value)}
                />
              }
            />
            <SettingRow
              icon={ShieldCheck}
              title="Budget alerts"
              description="Get notified when spending is close to your limit"
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
            title="Appearance"
            subtitle="Customize how the app looks on your device"
          >
            <SettingRow
              icon={Moon}
              title="Dark mode"
              description="Switch between light and dark appearance"
              action={
                <Toggle
                  enabled={darkMode}
                  onToggle={() => setDarkMode((value) => !value)}
                />
              }
            />
            <SettingRow
              icon={Palette}
              title="Accent color"
              description="Neutral gray theme with clean dashboard styling"
              action={<ChevronRight className="h-5 w-5 text-zinc-400" />}
              noBorder
            />
          </SectionCard>

          <SectionCard
            title="Security"
            subtitle="Protect your account and sensitive financial data"
          >
            <SettingRow
              icon={Lock}
              title="Change password"
              description="Last updated 3 months ago"
              action={
                <button className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-2 text-sm font-medium text-zinc-700">
                  Update
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
                  App preferences
                </h3>
                <p className="text-sm text-zinc-500">
                  Quick overview of your current setup
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Notifications:{" "}
                <span className="font-medium text-zinc-800">Enabled</span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Default currency:{" "}
                <span className="font-medium text-zinc-800">PHP</span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Login security:{" "}
                <span className="font-medium text-zinc-800">Biometric</span>
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Theme mode:{" "}
                <span className="font-medium text-zinc-800">Light</span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-zinc-200 bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-medium text-zinc-800">Danger zone</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Manage destructive account actions carefully.
            </p>
            <div className="mt-5 space-y-3">
              <button className="w-full rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-3 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
                Export all financial data
              </button>
              <button className="w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-100">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
