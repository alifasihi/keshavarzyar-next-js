"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Mock user data for demonstration
const mockUserData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  joinDate: "May 2023",
  avatar: "/placeholder.svg?height=100&width=100",
}

type ProfileContextType = {
  user: {
    name: string
    email: string
    joinDate: string
    avatar: string
  }
  updateProfileImage: (imageUrl: string) => void
  isLoggedIn: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(mockUserData)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simulate checking if user is logged in
  useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      setIsLoggedIn(true);

      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No users found');
      }

      const randomUser = data[Math.floor(Math.random() * data.length)];

      setUser({
        name: randomUser.name || 'مهمان',
        email: randomUser.email || 'مهمان',
        joinDate: "مهمان",
        avatar: randomUser.avatar || '/placeholder.svg',
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  checkLoginStatus();
}, []);

  const updateProfileImage = (imageUrl: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: imageUrl,
    }))
  }

  return <ProfileContext.Provider value={{ user, updateProfileImage, isLoggedIn }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
