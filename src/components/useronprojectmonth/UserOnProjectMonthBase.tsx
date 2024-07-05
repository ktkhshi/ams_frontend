"use client"

import { useState } from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ProjectType } from "@/actions/project"
import { ContractType } from "@/actions/contract"
import { formatDate } from "date-fns"
import { useRouter } from "next/navigation"

interface UserOnProjectMonthBaseProps {
  userUid: string
  uopInfos: Array<[ProjectType, ContractType]>
}

// 投稿詳細
const UserOnProjectMonthBase = async ({ userUid, uopInfos }: UserOnProjectMonthBaseProps) => {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined)

  const today = new Date()
  const date = new Date(today.getFullYear(), today.getMonth(), 1)
  const date_ym = formatDate(date as Date, "yyyyMM")

  if (uopInfos.length == 1) {
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${uopInfos[0][0].uid}?cUid=${uopInfos[0][1].uid}`)
  }

  const handleChange = (value: string) => {
    setSelectedItem(value);
    const tuple = uopInfos.find((tuple) => tuple[0].main_name == value)
    const projectUid: string = tuple == undefined ? "" : tuple[0].uid as string
    const contractUid: string = tuple == undefined ? "" : tuple[1].uid as string
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${projectUid}?cUid=${contractUid}`)
  }

  return (  
    <div className="container mx-auto py-10 w-full">
      <Select onValueChange={(e) => handleChange(e)}>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent className="w-[400px]">
          <SelectGroup>
            {uopInfos.map((tuple) => (
              <SelectItem 
                key={tuple[0].uid} 
                value={tuple[0].main_name}
              >
                {tuple[0].main_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
export default UserOnProjectMonthBase