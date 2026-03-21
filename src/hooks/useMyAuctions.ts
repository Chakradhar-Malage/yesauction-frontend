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
        // console.log("My Auctions Response:", res.content);
        setAuctions(res.content || []);
        setTotalPages(res.totalPages || 0);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return { auctions, page, setPage, totalPages, loading };
};