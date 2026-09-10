import { useCallback, useEffect, useState } from "react";
import {
  getContactMessages,
  markContactMessageAsRead,
} from "../api/contactApis";
import { ContactMessage } from "../types/ContactMessage";

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getContactMessages();

      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch contact messages", err);

      setError("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await markContactMessageAsRead(id);

      setMessages((previousMessages) =>
        previousMessages.map((message) =>
          message.id === id
            ? { ...message, read: true }
            : message
        )
      );
    } catch (err) {
      console.error("Failed to mark message as read", err);

      throw err;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
    markAsRead,
  };
};
