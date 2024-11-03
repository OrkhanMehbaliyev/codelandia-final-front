import { useEffect, useRef, useState } from "react";

export const useDebouncing = <T>(delay = 1000, initInput = "") => {
  const [input, setInput] = useState<string>(initInput);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => setInput(initInput), [initInput]);
  const updateSearch = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setInput(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setState(value);
    }, delay);
  };
  const updateQuery = (
    value: string,
    queryObjSetter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T
  ) => {
    setInput(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      queryObjSetter((queryObj) => ({
        ...queryObj,
        [field]: value,
      }));
    }, delay);
  };

  return { input, updateQuery, updateSearch };
};
