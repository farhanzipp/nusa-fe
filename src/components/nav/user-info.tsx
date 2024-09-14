import { currentUserAtom } from '@/hooks/auth/useCurrentUser';
import { useAtom } from 'jotai'
import React from 'react'
import {Button} from '@/components/ui/button'
import { useLogout } from '@/hooks/auth/useLogout';
import { useRouter } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';

export default function UserInfo() {
    const [currentUser] = useAtom(currentUserAtom);
    const { logout } = useLogout();
    const router = useRouter();
    const onLogout = () => {
        logout();
        router.push("/login");
    }
  return (
    <div className='w-full h-36 flex flex-col justify-center items-center bg-slate-100'>
        <CircleUserRound />
        <p className='mb-3'>{currentUser?.username}</p>
        <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
