"use client"

import { useEffect, useState } from "react"
import { fetchApi } from "@/utils/api";
import Loader from "@/components/ui/loader";

interface RandomUser {
  picture: {
    medium: string;
  };
}

export default function RandomUser() {
  const [user, setUser] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('https://randomuser.me/api/');
      setUser(data.results[0]);
    } catch (error) {
      console.error('Error fetching random user:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  if (loading) return <div>

    <Loader />

  </div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="flex -space-x-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#1b2316]">
        <img src={user.picture.medium} alt="User" className="rounded-full" />
      </div>
    </div>
  );
}
