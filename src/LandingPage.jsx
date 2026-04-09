import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./form/Header";
import { Sidebar } from "./form/Sidebar";
import { Dashboard } from "./features/dashboard/Dashboard";
import { AddIncome } from "./features/addIncome/AddIncome";
import { AddExpense } from "./features/addExpense/AddExpense";
import { History } from "./features/transactionHistory/History";
import { Setting } from "./features/setting/Setting";
import toast, { Toaster } from "react-hot-toast";
import { I18nProvider } from "./i18n";
import {
  loadBudgetAlertSettings,
  saveBudgetAlertSettings,
} from "./features/notification/budgetAlerts";
import { useBudgetAlerts } from "./features/notification/useBudgetAlerts";

const THEME_STORAGE_KEY = "themeMode";

const getInitialDarkMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark") {
    return true;
  }

  if (storedTheme === "light") {
    return false;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
};

const initialTransactions = {
  id: crypto.randomUUID(),
  title: "Salary",
  amount: 5000,
  type: "income",
  source: "Company",
  date: "2026-04-04",
  account: "mainAccount",
  notes: "Monthly salary",
};

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([initialTransactions]);
  const [currency, setCurrency] = useState("PHP");
  const [languageRegion, setLanguageRegion] = useState("en-PH");
  const [darkMode, setDarkMode] = useState(() => getInitialDarkMode());
  const [budgetAlertSettings, setBudgetAlertSettings] = useState(() =>
    loadBudgetAlertSettings(),
  );

  useEffect(() => {
    saveBudgetAlertSettings(budgetAlertSettings);
  }, [budgetAlertSettings]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";

    const value = darkMode ? "dark" : "light";
    if(localStorage.getItem(THEME_STORAGE_KEY) !== value) {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
    }
  }, [darkMode]);

  useBudgetAlerts({
    transactions,
    budgetAlertSettings,
    currency,
    languageRegion,
  });

  return (
    <I18nProvider languageRegion={languageRegion}>
      <div className="min-h-screen bg-[#efefef] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-[270px]">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[270px]">
            <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className="lg:ml-[270px]">
        {/* Fixed header */}
        <div className="fixed top-0 right-0 left-0 z-30 lg:left-[270px]">
          <Header onOpenMenu={() => setMobileMenuOpen(true)} />
        </div>

        {/* Main content */}
        <main className="pt-[88px] sm:pt-[96px]">
          <div className="min-h-[calc(100vh-88px)] px-4 py-4 sm:min-h-[calc(100vh-96px)] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <div className=" p-4  sm:p-6 lg:p-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      transactions={transactions}
                      setTransactions={setTransactions}
                      currency={currency}
                      languageRegion={languageRegion}
                    />
                  }
                />
                <Route
                  path="/Dashboard"
                  element={
                    <Dashboard
                      transactions={transactions}
                      setTransactions={setTransactions}
                      currency={currency}
                      languageRegion={languageRegion}
                    />
                  }
                />
                <Route
                  path="/AddIncome"
                  element={
                    <AddIncome
                      setTransactions={setTransactions}
                      toast={toast}
                    />
                  }
                />
                <Route
                  path="/AddExpense"
                  element={
                    <AddExpense
                      setTransactions={setTransactions}
                      toast={toast}
                    />
                  }
                />
                <Route
                  path="/History"
                  element={
                    <History
                      transactions={transactions}
                      currency={currency}
                      languageRegion={languageRegion}
                    />
                  }
                />
                <Route
                  path="/Setting"
                  element={
                    <Setting
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      currency={currency}
                      setCurrency={setCurrency}
                      languageRegion={languageRegion}
                      setLanguageRegion={setLanguageRegion}
                      budgetAlertSettings={budgetAlertSettings}
                      setBudgetAlertSettings={setBudgetAlertSettings}
                      transactions={transactions}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
    </I18nProvider>
  );
};
