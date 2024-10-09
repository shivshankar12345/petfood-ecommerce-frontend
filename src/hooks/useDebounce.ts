// useDebounce.ts
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => {
        console.log("setting the timeout");
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
      console.log("cleaing the timeout");
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
