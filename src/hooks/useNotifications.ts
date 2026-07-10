import { useState, useEffect, useCallback } from "react";
import { notificationApi } from "../api/notificationApis";
import { Notification } from "../types/Notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

const fetchNotifications = useCallback(async () => {
  try {
    setLoading(true);
    console.log("Fetching notifications with token:", localStorage.getItem("token") ? "Present" : "Missing");
    const res = await notificationApi.getNotifications();
    console.log("✅ Notifications received:", res.data);
    setNotifications(res.data);
  } catch (err: any) {
    console.error("❌ Failed to fetch notifications", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
}, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await notificationApi.getUnreadCount();
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
  };
};