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
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => setUser(data.results[0]));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex -space-x-2">
      <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#1b2316]">
        <img src={user.picture.medium} alt="User" className="rounded-full" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#1b2316]">
        <img src={user.picture.medium} alt="User" className="rounded-full" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1b2316]">
        <img src={user.picture.medium} alt="User" className="rounded-full" />
      </div>
    </div>
  );
}
