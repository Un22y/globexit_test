import { useCallback, useState } from "react";

export const useFetching = (
  callback: () => Promise<void>
): [() => Promise<void>, boolean] => {
  const [isLoading, setIsLoading] = useState(false);
  const fetching = useCallback(async () => {
    try {
      setIsLoading(true);
      await callback();
    } finally {
      setIsLoading(false);
    }
  }, [callback]);
  return [fetching, isLoading];
};
