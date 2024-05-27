import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addTokenToLocalStorage = (
  firstName: string,
  imgLink: string,
  token: string
) => {
  const authItem = { firstName, imgLink, token };
  localStorage.setItem("auth", JSON.stringify(authItem));
};

export const getAuthFromLocalStorage = (key: string) => {
  const authData = localStorage.getItem(key);
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
};
