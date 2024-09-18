import { FilterName } from "./types";

export const addUrlParam = (key: string, value: any) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, JSON.stringify(value));
  window.history.pushState({}, "", url.toString());
};
export const removeUrlParam = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, "", url.toString());
};
export const clearUrlParams = () => {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.pushState({}, "", url.toString());
};

export const getUrlParam = (key: FilterName): string | object | null => {
  const url = new URL(window.location.href);
  const paramValue = url.searchParams.get(key);

  if (!paramValue) return null;
  try {
    const parsedObject = JSON.parse(paramValue);
    if (typeof parsedObject === "object" && parsedObject !== null) return parsedObject;
  } catch (error) {
    // Not a JSON object, return the raw string value
  }

  return paramValue;
};

export function includesValue<T>(arr: T[], obj: T) {
  return arr !== null && arr.some((item) => JSON.stringify(item) === JSON.stringify(obj));
}
