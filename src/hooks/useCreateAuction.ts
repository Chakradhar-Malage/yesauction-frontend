import { useState } from "react";
import { createAuction } from "../api/auctionApis";

export const useCreateAuction = () => {
  const [loading, setLoading] = useState(false);

  const submitAuction = async (data: any) => {
    setLoading(true);
    try {
      const res = await createAuction(data);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { submitAuction, loading };
};