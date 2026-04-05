import { useState } from "react";
import { X } from "lucide-react";

import { FormRenderer } from "../../../form/FormRenderer";
import { EDIT_PROFILE_FIELDS } from "../config/editProfileFields";
import { setInitialUserProfile } from "../utils/setInitialUserProfile";
import { useI18n } from "../../../i18n";

export const EditProfileForm = ({ currentUser, onSave, onCancel }) => {
  const { t } = useI18n();
  const [userProfile, setUserProfile] = useState(() =>
    setInitialUserProfile(currentUser),
  );
  const fields = EDIT_PROFILE_FIELDS.map((field) => ({
    ...field,
    label: t(
      `forms.fields.${field.name === "email" ? "emailAddress" : field.name}`,
      field.label,
    ),
    placeholder:
      field.name === "firstName"
        ? t("forms.placeholders.enterFirstName", field.placeholder)
        : field.name === "lastName"
          ? t("forms.placeholders.enterLastName", field.placeholder)
          : field.name === "email"
            ? t("forms.placeholders.enterEmailAddress", field.placeholder)
            : field.placeholder,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(userProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div className="w-full max-w-2xl rounded-[32px] border border-zinc-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-zinc-800 sm:text-3xl">
              {t("settings.editProfile.title")}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              {t("settings.editProfile.subtitle")}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-zinc-200 bg-white p-3 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-700"
            aria-label={t("settings.editProfile.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormRenderer
            fields={fields}
            values={userProfile}
            onChange={handleChange}
            idPrefix="edit-profile"
          />

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 sm:text-base"
            >
              {t("settings.editProfile.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:text-base"
            >
              {t("settings.editProfile.saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
