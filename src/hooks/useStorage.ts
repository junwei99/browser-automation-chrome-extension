import { useState, useEffect } from "react";

type StorageValue<T> = [T, (value: T) => void];

export const useStorage = <T>(
  key: string,
  initialValue: T
): StorageValue<T> => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      area: string
    ) => {
      if (area === "sync" && changes[key]) {
        setState(changes[key].newValue as T);
      }
    };

    chrome.storage.sync.get(key, (data) => {
      console.log({ data });
      if (data && data[key] !== undefined) {
        console.log("entered 1");
        setState(data[key] as T);
      } else {
        console.log("entered 2");
        chrome.storage.sync.set({ [key]: initialValue });
      }
    });

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ [key]: state });
  }, [state]);

  return [state, setState];
};
