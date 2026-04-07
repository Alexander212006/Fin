/* eslint-env serviceworker */
/* global firebase, importScripts */


importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAiAwC6wRVy4kXDWj68iZs7JqwmS7OYkBQ",
  authDomain: "fin-notification.firebaseapp.com",
  projectId: "fin-notification",
  storageBucket: "fin-notification.firebasestorage.app",
  messagingSenderId: "171897396442",
  appId: "1:171897396442:web:c17aa0d3e1cc20ed2699e3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Notification";
  const options = {
    body: payload.notification?.body || "",
    icon: "/favicon.svg",
  };

  self.registration.showNotification(title, options);
});
