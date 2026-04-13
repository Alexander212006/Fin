import toast from "react-hot-toast";
import { exportFinancialDataCsv } from "./exportFinancialData";

export const handleExportFinancialData = ({
  transactions,
  t,
  messages,
}) => {
  const {
    emptyKey,
    emptyFallback,
    failedKey,
    failedFallback,
    successKey,
    successFallback,
  } = messages;

  if (!transactions?.length) {
    toast.error(t(emptyKey, emptyFallback));
    return;
  }

  const success = exportFinancialDataCsv(transactions);
  if (!success) {
    toast.error(t(failedKey, failedFallback));
    return;
  }

  toast.success(t(successKey, successFallback));
};
