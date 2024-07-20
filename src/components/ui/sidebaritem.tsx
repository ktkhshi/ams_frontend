"use client"

import { UserType } from "@/lib/nextauth"
import Image from "next/image"

interface SidebarUserItemProps {
  user: UserType
}

export default function SidebarUserItem({ user }: SidebarUserItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={user.avatar || "/default.png"}
          className="rounded-full object-cover"
          alt={user.name || "avatar"}
          fill
        />
      </div>
      <div className="grow">
        <p className="text-[16px] font-bold"> {user.name}</p>
        <p className="text-[12px] text-neutral-500">{user.email}</p>
      </div>
    </div>
  )
}
