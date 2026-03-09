import { useEffect, useState } from "react";

export default function useCountdown(endTime?: string) {

  const calculateTime = () => {

    if (!endTime) return "Loading...";

    const diff = new Date(endTime).getTime() - Date.now();

    if (diff <= 0) {
      return "Ended";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);

  }, [endTime]);

  return timeLeft;
}