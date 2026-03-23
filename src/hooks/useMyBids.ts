import { useEffect, useState } from "react";
import { getMyBidHistory } from "../api/profileApis";

export const useMyBids = () => {
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBidHistory()
      .then((res) => {
        console.log("RES:", res); 

        setBids(res || []); 
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { bids, loading };
};