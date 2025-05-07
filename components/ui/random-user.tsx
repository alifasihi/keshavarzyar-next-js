"use client"

import { useEffect, useState } from "react"

interface RandomUser {
  picture: {
    medium: string;
  };
}

export default function RandomUser() {
  const [users, setUsers] = useState<RandomUser[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3')
      .then(res => res.json())
      .then(data => setUsers(data.results));
  }, []);

  if (users.length === 0) return <p>Loading...</p>;

  return (
    <div className="flex -space-x-2">
      {users.map((user, index) => (
        <div key={index} className={`w-8 h-8 rounded-full bg-gray-${500 + index * 100} border-2 border-[#1b2316]`}>
          <img src={user.picture.medium} alt="User" className="rounded-full" />
        </div>
      ))}
    </div>
  );
}
