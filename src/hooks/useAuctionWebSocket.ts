import { useEffect, useRef, useState } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { AuctionUpdateDto, BidUpdate } from "../dto/AuctionUpdateDto";
import { WS_BASE_URL, WS_TOPICS } from "../api/apiConfig";

// NOTE: Personal /user/queue/notifications handling has moved to
// useNotificationSocket.ts (used inside useNotifications). Keeping it here
// too would open a second authenticated socket and cause every outbid
// notification to be handled/alerted twice while viewing an auction page.
export const useAuctionWebSocket = (auctionId: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const auctionSubscriptionRef = useRef<StompSubscription | null>(null);

  const [updates, setUpdates] = useState<BidUpdate[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auctionId) return;

    const socket = new SockJS(WS_BASE_URL);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);
      setError(null);

      // Auction updates
      auctionSubscriptionRef.current = client.subscribe(
        WS_TOPICS.AUCTION(auctionId),
        (message: IMessage) => {
          try {
            const update: BidUpdate = JSON.parse(message.body);
            setUpdates((prev) => [...prev, update]);
          } catch (err) {
            console.error("WebSocket parse error:", err);
          }
        }
      );
    };

    client.onStompError = (frame) => {
      setError(frame.headers["message"]);
    };

    client.onWebSocketClose = () => {
      setConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      auctionSubscriptionRef.current?.unsubscribe();
      client.deactivate();
    };
  }, [auctionId]);

  const disconnect = () => {
    clientRef.current?.deactivate();
    clientRef.current = null;
    setConnected(false);
  };

  return {
    updates,
    connected,
    error,
    disconnect,
  };
};