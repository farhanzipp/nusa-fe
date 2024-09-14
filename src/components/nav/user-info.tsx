import { currentUserAtom } from '@/hooks/auth/useCurrentUser';
import { useAtom } from 'jotai'
import React from 'react'
import {Button} from '@/components/ui/button'
import { useLogout } from '@/hooks/auth/useLogout';
import { useRouter } from 'next/navigation';

export default function UserInfo() {
    const [currentUser] = useAtom(currentUserAtom);
    const { logout } = useLogout();
    const router = useRouter();
    const onLogout = () => {
        logout();
        router.push("/login");
    }
  return (
    <div>
        <p>{currentUser?.username}</p>
        <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
