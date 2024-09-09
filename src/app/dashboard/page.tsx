"use client"
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useLogout } from '@/hooks/auth/useLogout';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DashBoardPage() {
  const currentUser = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/login");
  }

  return (
    <div>
      <h1>Hello, {currentUser?.username}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}
