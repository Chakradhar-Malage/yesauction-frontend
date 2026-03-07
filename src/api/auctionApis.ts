import axiosClient from "./axiosClient";

export const fetchAuctions = async () => {
  const response = await axiosClient.get("/auctions");
  return response.data;
};