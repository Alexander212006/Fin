import { useI18n } from "../../i18n";
import { SettingView } from "./components/SettingView";
import { useSettingController } from "./hooks/useSettingController";

export const Setting = ({
  darkMode,
  setDarkMode,
  currency,
  setCurrency,
  languageRegion,
  setLanguageRegion,
  budgetAlertSettings,
  setBudgetAlertSettings,
  transactions,
}) => {
  const { t } = useI18n();
  const controller = useSettingController({
    t,
    currency,
    setCurrency,
    languageRegion,
    setLanguageRegion,
    budgetAlertSettings,
    setBudgetAlertSettings,
    transactions,
  });

  return (
    <SettingView
      t={t}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      currency={currency}
      languageRegion={languageRegion}
      budgetAlertSettings={budgetAlertSettings}
      {...controller}
    />
  );
};
