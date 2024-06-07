"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { useClientContext } from "@/components/contexts/ClientContext"
import { ClipboardCheck } from "lucide-react"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  uid: string
  person_in_charge: string
  address: string
  note: string
}

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const org_project = row.original

      const { client, setClient } = useClientContext();

      const updateContext = () => { 
        client.uid = org_project.uid
        client.person_in_charge = org_project.person_in_charge
        setClient(client)

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
  },
  {
    accessorKey: "person_in_charge",
    header: "担当者名",
    size: 60,
  },
  {
    accessorKey: "address",
    header: "住所",
    size: 100,
  },
  {
    accessorKey: "note",
    header: "備考",
    size: 220,
  },
]