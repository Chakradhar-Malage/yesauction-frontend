import { useEffect, useState } from "react";
import { getSellerStats } from "../api/profileApis";

export interface SellerStats {
  totalAuctions: number;
  activeBids: number;
  totalEarnings: number;
}

export const useSellerStats = () => {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getSellerStats()
      .then((data) => setStats(data))
      .catch((err) => {
        console.error("Failed to fetch seller stats:", err);
        setError("Failed to load stats");
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
};