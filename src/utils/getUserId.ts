export const getUserId = () => {
  if (typeof window === "undefined") return "user-1";

  return window.location.hash === "#2"
    ? "user-2"
    : "user-1";
};
