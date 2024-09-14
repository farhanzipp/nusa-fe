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
        <div>
            <div className='flex flex-col md:flex-row '>
                <aside className='hidden px-2 py-4 md:block md:w-1/5'>
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex-1 lg:max-w-2xl h-screen overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    </>
  )
}
