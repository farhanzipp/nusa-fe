"use client"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import UserInfo from "./user-info";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export default function SidebarNav({ items, ...props }: SidebarNavProps) {
    const pathname = usePathname()
    return (
        <nav className={cn("flex flex-col h-full justify-between")}
          {...props}
        >
          <div className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div>
            <UserInfo />
          </div>
      </nav>
    );
}