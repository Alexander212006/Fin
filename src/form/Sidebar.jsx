import {
  LayoutDashboard,
  BadgeDollarSign,
  Receipt,
  CreditCard,
  Settings,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n";

export const Sidebar = ({ mobile = false, onClose }) => {
  const { t } = useI18n();
  const sidebarItems = [
    { label: t("nav.dashboard"), icon: LayoutDashboard, path: "/Dashboard" },
    { label: t("nav.addIncome"), icon: BadgeDollarSign, path: "/AddIncome" },
    { label: t("nav.addExpense"), icon: Receipt, path: "/AddExpense" },
    { label: t("nav.history"), icon: CreditCard, path: "/History" },
    { label: t("nav.settings"), icon: Settings, path: "/Setting" },
  ];

  return (
    <aside
      className={`flex h-full w-67.5 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-700 bg-[#f7f7f7] dark:bg-zinc-800 px-5 py-6 ${
        mobile ? "shadow-2xl" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Fin</h1>
        {mobile && (
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-600 dark:text-zinc-300 transition hover:bg-zinc-200 dark:hover:bg-zinc-600"
            aria-label={t("header.closeMenu")}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="mt-12 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={({isActive}) => 
                `flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition ${
                isActive
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900"
              }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-[15px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
