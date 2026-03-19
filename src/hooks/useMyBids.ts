import { useEffect, useState } from "react";
import { getMyBidHistory } from "../api/profileApis";

export const useMyBids = () => {
  const [bids, setBids] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBidHistory()
      .then((res) => setBids(res || []))
      .finally(() => setLoading(false));
  }, []);

  return { bids, loading };
};