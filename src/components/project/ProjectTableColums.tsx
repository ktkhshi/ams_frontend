"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ProjectContext } from "@/app/context"
import { useContext, useState } from "react"
import { ClipboardCheck } from "lucide-react"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  uid: string
  main_name: string
  sub_name: string
  note: string
}

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const org_project = row.original
      const context = useContext(ProjectContext())
      const [ project, setProject ] = useState(context)
      
      const updateContext = () => { 
        // context.setProject({ uid: org_project.uid, main_name: org_project.main_name })
        project.project.uid = org_project.uid
        project.project.main_name = org_project.main_name
        setProject(project)
        toast.success(project.project.uid)
      }

      return (
        <Button variant="outline"
          onClick={updateContext}
        >
          <ClipboardCheck className="h-4 w-4" />
        </Button>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 1,
  },
  {
    accessorKey: "uid",
    header: "キー",
  },
  {
    accessorKey: "main_name",
    header: "メイン名",
    size: 60,
  },
  {
    accessorKey: "sub_name",
    header: "サブ名",
    size: 100,
  },
  {
    accessorKey: "note",
    header: "備考",
    size: 220,
  },
]