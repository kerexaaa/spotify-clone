import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebauncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebauncedValue(value);
    }, delay || 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
