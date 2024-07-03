"use client"

import SidebarUserItem from "./sidebaritem"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { 
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CalendarHeart,
  NotebookTabs,
  Users,
  BriefcaseBusiness,
  Building2,
  Handshake,
  Rocket,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { UserType } from "@/lib/nextauth"
import { ja } from "date-fns/locale"
import { formatDate } from "date-fns"

interface SidebarProps {
  user: UserType
}

export default function Sidebar({ user }: SidebarProps) {
  const router = useRouter()
  const date_ym = formatDate(Date.now(), 'yyyyMM', {locale: ja})

  const menuList = [
    {
      group: "User Menu",
      items: [
        {
          link: `/useronprojectmonth/${user.uid}/${date_ym}/`,
          icon: <CalendarCheck/>,
          text: "勤務プロジェクト"
        },
      ]
    },
    {
      group: "Settings",
      items: [
        {
          link: `/userspecialattendance/${user.uid}`,
          icon: <CalendarHeart/>,
          text: "休暇"
        },
        {
          link: "/",
          icon: <NotebookTabs/>,
          text: "プロジェクト詳細"
        },
      ]
    },
    {
      group: "Admin Menu",
      items: [
        {
          link: "/user",
          icon: <Users/>,
          text: "ユーザ"
        },
        {
          link: "/project",
          icon: <BriefcaseBusiness/>,
          text: "プロジェクト"
        },
        {
          link: "/client",
          icon: <Building2/>,
          text: "クライアント"
        },
        {
          link: "/contract",
          icon: <Handshake/>,
          text: "契約"
        },
        {
          link: "/useronproject",
          icon: <Rocket />,
          text: "ユーザプロジェクト"
        },
      ]
    },
  ]

  return (
  <div className="flex flex-col gap-2 ml-4 min-w-40 border-r-2 min-h-screen">
    <div>
      <SidebarUserItem user={user}/>
    </div>    
    <div className="grow">
      <Command style={{ overflow: 'visible' }}>
        <CommandList style={{ overflow: 'visible' }}>
          {menuList.map((menu: any, key: number) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((item: any, itemKey: number) => 
                <CommandItem key={itemKey} className="flex gap-2 cursor-pointer"
                  onSelect={() => router.push(item.link)}>
                  {item.icon}
                  {item.text}
                </CommandItem>
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  </div>)
}