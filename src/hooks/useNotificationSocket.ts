import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { WS_BASE_URL, WS_TOPICS } from "../api/apiConfig";
import { Notification } from "../types/Notification";

/**
 * Opens a personal STOMP connection authenticated with the current JWT and
 * subscribes to /user/queue/notifications. Unlike useAuctionWebSocket, this
 * is NOT tied to an auctionId — it stays connected on every page as long as
 * the component using it is mounted, so outbid alerts arrive app-wide.
 */
export const useNotificationSocket = (
  onNotification: (notification: Notification) => void
) => {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  // Keep the latest callback without re-running the connection effect
  const onNotificationRef = useRef(onNotification);
  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // not logged in — nothing to subscribe to

    const socket = new SockJS(WS_BASE_URL);

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);
      client.subscribe(WS_TOPICS.USER_NOTIFICATIONS, (message: IMessage) => {
        try {
          const notification: Notification = JSON.parse(message.body);
          onNotificationRef.current(notification);
        } catch (err) {
          console.error("Failed to parse notification:", err);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Notification socket STOMP error:", frame.headers["message"]);
    };

    client.onWebSocketClose = () => setConnected(false);

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, []);

  return { connected };
};