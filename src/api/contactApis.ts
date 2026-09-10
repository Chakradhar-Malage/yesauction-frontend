import axiosClient from "./axiosClient";
import { ContactMessage } from "../types/ContactMessage";

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const response = await axiosClient.get<ContactMessage[]>("/admin/contact-messages");

  return response.data;
};

export const markContactMessageAsRead = async (
  id: number
): Promise<void> => {
  await axiosClient.put(`/admin/contact-messages/${id}/read`);
};
