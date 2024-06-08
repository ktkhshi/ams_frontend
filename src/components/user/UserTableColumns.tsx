"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { useUserContext } from "@/components/contexts/UserContext"
import { ClipboardCheck } from "lucide-react"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  uid: string
  name: string
  created_at: string
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const org_project = row.original

      const { user, setUser } = useUserContext();
      
      const updateContext = () => { 
        user.uid = org_project.uid
        user.name = org_project.name
        setUser(user)

        toast.success("コピーしました")
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
    size: 1,
  },
  {
    accessorKey: "name",
    header: "名前",
    size: 200,
  },
  {
    accessorKey: "created_at",
    header: "作成日",
    size: 200,
  },
]