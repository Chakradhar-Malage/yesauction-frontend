import { useEffect, useState } from "react";
import { getMyAuctions } from "../api/profileApis";

export const useMyAuctions = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    getMyAuctions(page)
      .then((res) => {
        setAuctions(res.content || []);
        setTotalPages(res.totalPages || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch my auctions:", err);
        setAuctions([]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const removeAuction = (id: number) => {
    setAuctions((prev) => prev.filter((a) => a.id !== id));
  };

  return { auctions, page, setPage, totalPages, loading, removeAuction };
};