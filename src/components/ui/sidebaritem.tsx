"use client"

import { UserType } from "@/lib/nextauth";

interface SidebarUserItemProps {
  user: UserType
}

export default function SidebarUserItem({ user }: SidebarUserItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="avatar rounded-full min-h-8 min-w-8 bg-emerald-500 text-white font-[700] 
                      flex itmes-center justify-center">
        <p>KT</p>
      </div>
      <div className="grow">
        <p className="text-[16px] font-bold"> {user.name}</p>
        <p className="text-[12px] text-neutral-500">{user.email}</p>
      </div>
    </div>
  );
}