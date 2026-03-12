import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/profileApis";
import { User } from "../types/User"
export const useCurrentUser = () => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));

  }, []);

  return { user, loading };
};