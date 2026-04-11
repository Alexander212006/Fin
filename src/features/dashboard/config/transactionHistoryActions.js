export const getTransactionHistoryActions = (t) => [
  { label: t("dashboard.actions.addAgain"), key: "add-again" },
  { label: t("dashboard.actions.edit"), key: "edit" },
  { label: t("dashboard.actions.delete"), key: "delete", danger: true },
];
