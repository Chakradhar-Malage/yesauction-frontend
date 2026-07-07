import axiosClient from "./axiosClient";
import { Notification, UnreadCountResponse } from "../types/Notification";

const NOTIFICATION_BASE = "/api/notifications";

export const notificationApi = {
  getNotifications: () =>
    axiosClient.get<Notification[]>(`${NOTIFICATION_BASE}`),

  getUnreadCount: () =>
    axiosClient.get<UnreadCountResponse>(`${NOTIFICATION_BASE}/unread-count`),

  markAsRead: (id: number) =>
    axiosClient.put(`${NOTIFICATION_BASE}/${id}/read`),

  markAllAsRead: () =>
    axiosClient.put(`${NOTIFICATION_BASE}/mark-all-read`),
};