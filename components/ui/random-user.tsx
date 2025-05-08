"use client"

import { useEffect, useState } from "react"

interface RandomUser {
  picture: {
    medium: string;
  };
}

export default function RandomUser() {
  const [user, setUser] = useState<RandomUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="flex -space-x-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#1b2316]">
        <img src={user.picture.medium} alt="User" className="rounded-full" />
      </div>
    </div>
  );
}
