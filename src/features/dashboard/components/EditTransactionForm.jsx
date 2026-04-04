import { useState } from "react";
import { X } from "lucide-react";
import { FormRenderer } from "../../../form/FormRenderer";
import {
  EDIT_TRANSACTION_FIELDS,
  getInitialEditTransactionValues,
} from "../config/editTransactionFields";

export const EditTransactionForm = ({ transaction, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() =>
    getInitialEditTransactionValues(transaction),
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { wallet, ...transactionWithoutWallet } = transaction || {};
    const updatedTransaction = {
      ...transactionWithoutWallet,
      ...formData,
    };
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
        <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex max-h-[84vh] flex-col sm:max-h-[88vh]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800 sm:text-2xl">
                  Edit Transaction
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Update the transaction details below.
                </p>
              </div>

              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                aria-label="Close edit form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <FormRenderer
                fields={EDIT_TRANSACTION_FIELDS}
                values={formData}
                onChange={handleChange}
                idPrefix="edit-transaction"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onCancel}
                className="w-full rounded-2xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 sm:w-auto sm:text-base"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700 sm:w-auto sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
