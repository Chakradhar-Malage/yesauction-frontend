import { useEffect, useState } from "react";
import { fetchWonAuctionsCount } from "../api/profileApis";

export function useWonAuctionsCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchWonAuctionsCount()
      .then((data) => {
        if (cancelled) return;
        // handles both `5` and `{ count: 5 }` responses
        setCount(typeof data === "number" ? data : data?.count ?? 0);
      })
      .catch((err) => console.error("Failed to fetch won count:", err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return { count, loading };
}