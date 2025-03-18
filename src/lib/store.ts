"use client";

export const setToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof localStorage === "undefined") {
    return null; // or throw an error, depending on your use case
  }
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const deleteFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
export const appendToLocalStorage = <T>(key: string, value: T) => {
  const existingItems = getFromLocalStorage<T[]>(key);
  if (existingItems) {
    const newItems = [...existingItems, value];
    setToLocalStorage(key, newItems);
  } else {
    setToLocalStorage(key, [value]);
  }
};
