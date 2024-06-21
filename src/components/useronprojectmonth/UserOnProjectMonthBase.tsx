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
import { formatDate } from "date-fns"
import { useRouter } from "next/navigation"

interface UserOnProjectMonthBaseProps {
  userUid: string
  projects: ProjectType[]
}

// 投稿詳細
const UserOnProjectMonthBase = async ({ userUid, projects }: UserOnProjectMonthBaseProps) => {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined)

  const handleChange = (value: string) => {
    setSelectedItem(value);
    const project = projects.find((projects) => projects.main_name == value)

    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth(), 1)
    const date_ym = formatDate(date as Date, "yyyyMM")
    const projectUid: string= project?.uid as string
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${projectUid}`)
  }

  return (  
    <div className="container mx-auto py-10 w-full">
      <Select onValueChange={(e) => handleChange(e)}>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent className="w-[400px]">
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem 
                key={project.uid} 
                value={project.main_name}
              >
                {project.main_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
export default UserOnProjectMonthBase