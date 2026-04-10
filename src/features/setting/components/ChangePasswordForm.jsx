import { useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "../../../i18n";

const initialPasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePasswordForm = ({ onSubmit, onCancel, hasStoredPassword }) => {
  const { t } = useI18n();
  const [values, setValues] = useState(initialPasswordValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = onSubmit(values);

    if (success) {
      setValues(initialPasswordValues);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div className="w-full max-w-2xl rounded-[32px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              {t("settings.changePassword.title", "Change password")}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              {t(
                "settings.changePassword.subtitle",
                "Update your login password.",
              )}
            </p>
            {!hasStoredPassword && (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                {t(
                  "settings.changePassword.firstTimeHint",
                  "No password is set yet. Enter any current password value to create one.",
                )}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-zinc-700"
            aria-label={t("settings.changePassword.close", "Close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {t(
                "settings.changePassword.currentPassword",
                "Current password",
              )}
            </span>
            <input
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-600 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:focus:border-zinc-400 sm:text-base"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {t("settings.changePassword.newPassword", "New password")}
            </span>
            <input
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-600 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:focus:border-zinc-400 sm:text-base"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {t(
                "settings.changePassword.confirmNewPassword",
                "Confirm new password",
              )}
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-600 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:focus:border-zinc-400 sm:text-base"
              required
            />
          </label>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-base"
            >
              {t("settings.changePassword.cancel", "Cancel")}
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:text-base"
            >
              {t("settings.changePassword.update", "Update password")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
