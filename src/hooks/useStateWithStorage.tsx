import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

function useStateWithStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>] {
  const storedValue = localStorage.getItem(key);
  const initialState: T = storedValue ? JSON.parse(storedValue) : defaultValue;
  const [value, setValue] = useState<T>(initialState);
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStateWithStorage;
