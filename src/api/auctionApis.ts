import AuctionCard from "../Components/Auction/auctionCard";
import axiosClient from "./axiosClient";
// import 

export const fetchAuctions = async () => {
  const response = await axiosClient.get("/auctions");
  return response.data;
};

export const fetchAuctionById = async (id: number) => {
  const response = await axiosClient.get(`/auctions/${id}`);
  return response.data;
}

export const placeBid = async (auctionId: number, amount: number) => {
  const response = await axiosClient.post(`/auctions/${auctionId}/bid`, { amount });
  return response.data; 
}