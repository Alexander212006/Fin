import { Wallet } from "lucide-react";

export const Balance = ({ balance }) => {
  return (
    <div className="rounded-[30px] border border-zinc-200 bg-white p-6 sm:p-7">
      <div className="mb-10 flex items-start gap-4">
        <div className="rounded-2xl bg-zinc-300 p-3 text-white">
          <Wallet className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-2xl font-medium text-zinc-800">My balance</h3>
          <p className="text-sm text-zinc-500">Account balance overview</p>
        </div>
      </div>

      <p className="text-4xl font-semibold tracking-tight text-zinc-800 sm:text-[48px]">
        {balance}
      </p>
    </div>
  );
};
