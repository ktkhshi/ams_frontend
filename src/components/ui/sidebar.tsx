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
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Sidebar() {
  const router = useRouter()
  
  const menuList = [
    {
      group: "User Menu",
      items: [
        {
          link: "/",
          icon: <ArrowLeft/>,
          text: "先月"
        },
        {
          link: "/",
          icon: <CalendarCheck/>,
          text: "今月"
        },
        {
          link: "/",
          icon: <ArrowRight/>,
          text: "来月"
        },
      ]
    },
    {
      group: "Settings",
      items: [
        {
          link: "/",
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
      ]
    },
  ]

  return (
  <div className="flex flex-col gap-2 ml-4 min-w-40 border-r-2 min-h-screen">
    <div>
      <SidebarUserItem />
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