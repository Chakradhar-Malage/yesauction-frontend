import exp from "constants";
import axiosClient from "./axiosClient";

export const getCurrentUser = async () => {
  const response = await axiosClient.get("/users/me");
  return response.data;
};

//my all bidhistory
export const getMyBidHistory = async () => {
  const response = await axiosClient.get("/users/me/bids?page=0&size=7");
  return response.data.content;
}

//my all auctions
export const getMyAuctions = async (page: number) => {
  const response = await axiosClient.get(`/users/me/auctions?page=${page}&size=7`);
  return response.data;
};

//update profile
export const updateProfile = async (formData: { username: string; email: string }) => {
  const response = await axiosClient.put("/users/me", formData);
  return response.data;
}
