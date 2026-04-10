const PASSWORD_STORAGE_KEY = "fin:userPassword";

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
};
