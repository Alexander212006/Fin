import { memo, useCallback } from "react";
import { Check, Image, Receipt } from "lucide-react";
import { FileUpload } from "../../form/FileUpload";
import { expenseFieldConfig } from "./config/formFields";
import { useExpenseForm } from "./hooks/useExpenseForm";
import { useI18n } from "../../i18n";

export const AddExpense = memo(({ setTransactions, toast }) => {
  const { t } = useI18n();
  const { form, setFile, updateField, handleSubmit } = useExpenseForm({
    toast,
    setTransactions,
  });
  const handleFormSubmit = useCallback(
    (event) => {
      handleSubmit(event);
    },
    [handleSubmit],
  );
  const handleNotesChange = useCallback(
    (event) => {
      updateField("notes", event.target.value);
    },
    [updateField],
  );
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      updateField(name, value);
    },
    [updateField],
  );

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-[42px]">
            {t("addExpense.title")}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
            {t("addExpense.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-600">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">{t("addExpense.badge")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form
          className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 sm:p-7"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-8 flex items-start gap-4">
            <div className="rounded-2xl bg-rose-100 p-3 text-rose-500">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">
                {t("addExpense.detailsTitle")}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("addExpense.detailsSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {expenseFieldConfig.map(
              ({ name, component: Component, props, colSpan }) => (
                <div key={name} className={colSpan}>
                  <Component
                    {...props}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                  />
                </div>
              ),
            )}

            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:text-base">
                  {t("addExpense.notes")}
                </span>
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-[#fafafa] dark:bg-zinc-800 px-4 py-3 transition focus-within:border-zinc-300 dark:focus-within:border-zinc-500 focus-within:bg-white dark:focus-within:bg-zinc-700">
                  <textarea
                    rows={5}
                    value={form.notes}
                    onChange={handleNotesChange}
                    placeholder={t("addExpense.notesPlaceholder")}
                    className="w-full resize-none bg-transparent text-sm text-zinc-800 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 sm:text-base"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-[#fafafa] dark:bg-zinc-800 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white dark:bg-zinc-900 p-3 shadow-sm">
                  <Image className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-800 dark:text-zinc-100">
                    {t("addExpense.attachTitle")}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {t("addExpense.attachSubtitle")}
                  </p>
                </div>
              </div>

              <FileUpload setFile={setFile} />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-base">
              {t("addExpense.saveDraft")}
            </button>
            <button
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:text-base"
              type="submit"
            >
              {t("addExpense.submit")}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 sm:p-7">
            <h3 className="text-2xl font-medium text-zinc-800 dark:text-zinc-100">{t("addExpense.quickTips")}</h3>
            <div className="mt-5 space-y-4 text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("addExpense.tips.pickCategory")}
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("addExpense.tips.addMerchant")}
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-zinc-800 p-4">
                {t("addExpense.tips.keepReceipts")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
