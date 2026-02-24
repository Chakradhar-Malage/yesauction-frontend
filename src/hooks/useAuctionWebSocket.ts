import { useEffect, useRef, useState } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuctionUpdateDto } from '../dto/AuctionUpdateDto';

// We'll define interface matching backend DTO
interface AuctionUpdate {
  auctionId: number;
  currentPrice: string; // BigDecimal → string in JSON
  latestBid?: {
    amount: string;
    bidderUsername: string;
    bidTime: string;
  };
}

const WS_URL = 'http://localhost:8081/ws'; // match your backend endpoint

export const useAuctionWebSocket = (auctionId: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const [updates, setUpdates] = useState<AuctionUpdate[]>([]); // or use Redux
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auctionId) return;

    // Create client only once
    if (!clientRef.current) {
      const socket = new SockJS(WS_URL);
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log(str), // remove in prod
      });

      client.onConnect = () => {
        console.log('WebSocket Connected');
        setConnected(true);
        setError(null);

        // Subscribe to this specific auction topic
        subscriptionRef.current = client.subscribe(
          `/topic/auction/${auctionId}`,
          (message: IMessage) => {
            try {
              const update: AuctionUpdate = JSON.parse(message.body);
              setUpdates((prev) => [...prev, update]); // or update current state
              console.log('Received bid update:', update);
            } catch (err) {
              console.error('Parse error:', err);
            }
          }
        );

        client.subscribe('/user/queue/notifications', (message: IMessage) => {
          const notif = JSON.parse(message.body);
          console.log('Personal notification:', notif);
          alert(`Outbid alert: ${notif.newBidderUsername} bid $${notif.newAmount} on ${notif.auctionTitle}`);
        });
      };

      client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        setError(frame.headers['message']);
      };

      client.onWebSocketClose = () => {
        console.log('WebSocket Closed');
        setConnected(false);
      };

      client.activate();
      clientRef.current = client;
    }

    // Cleanup on unmount or auctionId change
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      // Do NOT deactivate here if you want persistent connection across pages
      // For single-page auction view: clientRef.current?.deactivate();
    };
  }, [auctionId]);

  // Optional: manual disconnect if needed
  const disconnect = () => {
    clientRef.current?.deactivate();
    clientRef.current = null;
    setConnected(false);
  };

  return { updates, connected, error, disconnect };
};