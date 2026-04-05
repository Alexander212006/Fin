import { Bell, Menu } from "lucide-react";
import { useI18n } from "../i18n";

export const Header = ({ onOpenMenu }) => {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-[#f7f7f7] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 lg:hidden"
          aria-label={t("header.openMenu")}
        >
          <Menu className="h-5 w-5" />
          {t("header.menu")}
        </button>

        <div className="hidden lg:block">
          <p className="text-sm text-zinc-500">{t("header.welcomeBack")}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-800">
            {t("header.overview")}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="   p-3 text-zinc-600  transition hover:bg-zinc-50"
          aria-label={t("header.notifications")}
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
            AR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-zinc-800">Alex Rivera</p>
            <p className="text-xs text-zinc-500">{t("header.premiumAccount")}</p>
          </div>
        </button>
      </div>
    </header>
  );
};
