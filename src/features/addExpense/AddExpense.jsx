import { Check, Image, Receipt } from "lucide-react";
import { FileUpload } from "../../form/FileUpload";
import { expenseFieldConfig } from "./config/formFields";
import { useExpenseForm } from "./hooks/useExpenseForm";

export const AddExpense = ({ setTransactions, toast }) => {
  const { form, setFile, updateField, handleSubmit } = useExpenseForm({
    toast,
    setTransactions,
  });

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-800 sm:text-[42px]">
            Add expense
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Log a new expense and keep your spending records updated.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-600">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Budget tracked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form
          className="rounded-[30px] border border-zinc-200 bg-white p-5 sm:p-7"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-8 flex items-start gap-4">
            <div className="rounded-2xl bg-rose-100 p-3 text-rose-500">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-zinc-800">
                Expense details
              </h3>
              <p className="text-sm text-zinc-500">
                Fill in the form fields below
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {expenseFieldConfig.map(
              ({ name, component: Component, props, colSpan }) => (
                <div key={name} className={colSpan}>
                  <Component
                    {...props}
                    value={form[name]}
                    onChange={(e) => updateField(name, e.target.value)}
                  />
                </div>
              ),
            )}

            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-zinc-700 sm:text-base">
                  Notes(optional)
                </span>
                <div className="rounded-2xl border border-zinc-200 bg-[#fafafa] px-4 py-3 transition focus-within:border-zinc-300 focus-within:bg-white">
                  <textarea
                    rows={5}
                    value={form.notes}
                    onChange={(e) => {
                      updateField("notes", e.target.value);
                    }}
                    placeholder="Add a short note"
                    className="w-full resize-none bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 sm:text-base"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-[#fafafa] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-sm">
                  <Image className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-800">
                    Attach receipt(optional)
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500">
                    Upload a receipt, invoice, or payment confirmation.
                  </p>
                </div>
              </div>

              <FileUpload setFile={setFile} />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 sm:text-base">
              Save as draft
            </button>
            <button
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 sm:text-base"
              type="submit"
            >
              Add expense
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-zinc-200 bg-white p-6 sm:p-7">
            <h3 className="text-2xl font-medium text-zinc-800">Quick tips</h3>
            <div className="mt-5 space-y-4 text-sm text-zinc-600 sm:text-base">
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Pick the right category to keep reports accurate.
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Add merchant names for easier history search later.
              </div>
              <div className="rounded-2xl bg-[#f7f7f7] p-4">
                Keep receipts to match your recorded expenses.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
