import { useEffect } from "react";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";
import { LandingPage } from "./LandingPage";
import { setupForegroundNotifications } from "./features/notification/firebaseConfig";

function App() {
  useEffect(() => {
    let unsubscribe = () => {};

    setupForegroundNotifications((payload) => {
      const title = payload.notification?.title ?? "Notification";
      const body = payload.notification?.body ?? "";
      const sentAt = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      toast.custom(
        (toastInstance) => (
          <div
            className={`pointer-events-auto w-[340px] rounded-[24px] border border-zinc-200 bg-white p-4 shadow-[0_20px_50px_rgba(24,24,27,0.14)] transition-all ${
              toastInstance.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-50 p-2 text-emerald-600">
                <Bell className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {title}
                  </p>
                  <span className="shrink-0 text-xs text-zinc-400">
                    {sentAt}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-5 text-zinc-600">
                  {body || "You received a new foreground notification."}
                </p>
              </div>
            </div>
          </div>
        ),
        {
          duration: 5000,
        },
      );
    }).then((cleanup) => {
      unsubscribe = cleanup;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
  
      <LandingPage />

    </>
  );
}

export default App;
