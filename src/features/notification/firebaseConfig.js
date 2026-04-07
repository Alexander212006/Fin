import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const FCM_TOKEN_STORAGE_KEY = "fcmToken";

const firebaseConfig = {
  apiKey: "AIzaSyAiAwC6wRVy4kXDWj68iZs7JqwmS7OYkBQ",
  authDomain: "fin-notification.firebaseapp.com",
  projectId: "fin-notification",
  storageBucket: "fin-notification.firebasestorage.app",
  messagingSenderId: "171897396442",
  appId: "1:171897396442:web:c17aa0d3e1cc20ed2699e3",
  measurementId: "G-1VQM9X9B9D",
};

const app = initializeApp(firebaseConfig);
const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export function getStoredFcmToken() {
  return localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
}

export async function enableNotifications() {
  if (!(await isSupported())) {
    throw new Error("This browser does not support Firebase Messaging.");
  }

  if (!vapidKey) {
    throw new Error("Set VITE_FIREBASE_VAPID_KEY in your .env file first.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const serviceWorkerRegistration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
  );

  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
  });

  if (!token) {
    throw new Error("FCM did not return a registration token.");
  }

  localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);

  return token;
}

export async function setupForegroundNotifications(onForegroundMessage) {
  if (!(await isSupported())) {
    return () => {};
  }

  const messaging = getMessaging(app);

  return onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    onForegroundMessage?.(payload);
    console.log("Foreground message:", payload);
  });
}
