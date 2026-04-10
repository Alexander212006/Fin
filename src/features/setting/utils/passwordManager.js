const PASSWORD_STORAGE_KEY = "fin:userPassword";
const PASSWORD_UPDATED_AT_STORAGE_KEY = "fin:userPasswordUpdatedAt";

export const loadStoredPassword = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const password = window.localStorage.getItem(PASSWORD_STORAGE_KEY);
  return password?.trim() ? password : null;
};

export const saveStoredPassword = (password) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PASSWORD_STORAGE_KEY, password);
  window.localStorage.setItem(
    PASSWORD_UPDATED_AT_STORAGE_KEY,
    new Date().toISOString(),
  );
};

export const loadStoredPasswordUpdatedAt = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(PASSWORD_UPDATED_AT_STORAGE_KEY);
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
