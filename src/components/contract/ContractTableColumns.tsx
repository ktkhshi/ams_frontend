"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { UseContractContext } from "@/components/contexts/ContractContext"
import { ClipboardCheck } from "lucide-react"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContractColumnType = {
  uid: string
  unit_price: number
  contract_type_text: string 
  lower_hours_a_month: number
  upper_hours_a_month: number
  started_on: Date
  contract_name: string
  note: string
  updated_at: string
}

export const columns: ColumnDef<ContractColumnType>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const org_contract = row.original

      const { contract, setContract } = UseContractContext();
      
      const updateContext = () => { 
        contract.uid = org_contract.uid
        contract.name = org_contract.contract_name
        setContract(contract)

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
    size: 200,
  },
  {
    accessorKey: "unit_price",
    header: "単価",
    size: 10,
  },
  {
    accessorKey: "contract_type_text",
    header: "契約形態",
    size: 100,
  },
  {
    accessorKey: "lower_hours_a_month",
    header: "下限時間",
    size: 10,
  },
  {
    accessorKey: "upper_hours_a_month",
    header: "上限時間",
    size: 10,
  },
  {
    accessorKey: "started_on",
    header: "契約開始日",
    size: 100,
  },
  {
    accessorKey: "contract_name",
    header: "契約名",
    size: 100,
  },
  {
    accessorKey: "note",
    header: "備考",
    size: 100,
  },
  {
    accessorKey: "updated_at",
    header: "更新日",
    size: 200,
  },
]