import AuctionCard from "../Components/Auction/auctionCard";
import axiosClient from "./axiosClient";


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

export const fetchBidHistory = async (auctionId: number) => {
  const response = await axiosClient.get(`/auctions/${auctionId}/bids`);
  return response.data;
}

export const deleteAuction = async (id: number) => {
  const response = await axiosClient.delete(`/auctions/${id}`);
  return response.data;
};

export const updateAuction = async (id: number, data: any) => {
  const response = await axiosClient.put(`/auctions/${id}`, data);
  return response.data;
};

export const createAuction = async (data: any) => {
  const response = await axiosClient.post("/auctions", data);
  return response.data;
};

