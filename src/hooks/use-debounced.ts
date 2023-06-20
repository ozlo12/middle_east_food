"use clinet";

import { useCallback, useEffect, useRef } from "react";

export default function useDebounced(time: number) {
  const timeRef = useRef<NodeJS.Timeout>();
  const debouned = useCallback(
    (fun: () => void) => {
      if (timeRef.current) clearTimeout(timeRef.current);
      timeRef.current = setTimeout(fun, time);
    },
    [time]
  );
  useEffect(
    () => () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    },
    []
  );
  return { debouned };
}
