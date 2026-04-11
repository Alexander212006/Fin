import { X } from "lucide-react";
import { FormRenderer } from "../../../form/FormRenderer";
import { useI18n } from "../../../i18n";
import { useEditTransactionForm } from "../hooks/useEditTransactionForm";
import { buildUpdatedTransaction } from "../utils/editTransaction";

export const EditTransactionForm = ({ transaction, onSave, onCancel }) => {
  const { t } = useI18n();
  const { fields, formData, handleChange } = useEditTransactionForm(transaction);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTransaction = buildUpdatedTransaction(transaction, formData);
    onSave(updatedTransaction);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/35 px-3 py-6 sm:flex sm:items-center sm:justify-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="mx-auto my-6 w-full max-w-[92vw] sm:max-w-xl">
        <div className="overflow-hidden rounded-[28px] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex max-h-[84vh] flex-col sm:max-h-[88vh]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-700 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 sm:text-2xl">
                  {t("dashboard.editTransaction.title")}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {t("dashboard.editTransaction.subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-800"
                aria-label={t("dashboard.editTransaction.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <FormRenderer
                fields={fields}
                values={formData}
                onChange={handleChange}
                idPrefix="edit-transaction"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-200 dark:border-zinc-700 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onCancel}
                className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-600 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 sm:w-auto sm:text-base"
              >
                {t("dashboard.editTransaction.cancel")}
              </button>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700 sm:w-auto sm:text-base"
              >
                {t("dashboard.editTransaction.saveChanges")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
