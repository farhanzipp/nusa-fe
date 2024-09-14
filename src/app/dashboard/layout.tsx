"use client"
import SidebarNav from '@/components/nav/sidebar-nav'
import { useCurrentUser } from '@/hooks/auth/useCurrentUser'
import React from 'react'

export interface LayoutChildrenProps {
    children: React.ReactNode
  }

const sidebarNavItems = [
    {
        title: "Home",
        href: "/dashboard",
    },
    {
        title: "Master",
        href: "/dashboard/master",
    },
    {
        title: "PSB",
        href: "/dashboard/psb",
    }
]

export default function DashboardLayout({ children }: LayoutChildrenProps) {
    useCurrentUser();
    return (
    <>
        <div className="p-7">
            <div className='flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
                <aside className='hidden md:block -mx-4 md:w-1/5'>
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex-1 lg:max-w-2xl'>
                    {children}
                </div>
            </div>
        </div>
    </>
  )
}
