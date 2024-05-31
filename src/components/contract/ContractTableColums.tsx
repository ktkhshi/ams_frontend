"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContractColumnType = {
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
    accessorKey: "unit_price",
    header: "単価",
    size: 5,
  },
  {
    accessorKey: "contract_type_text",
    header: "契約形態",
    size: 1,
  },
  {
    accessorKey: "lower_hours_a_month",
    header: "下限時間",
    size: 5,
  },
  {
    accessorKey: "upper_hours_a_month",
    header: "上限時間",
    size: 5,
  },
  {
    accessorKey: "started_on",
    header: "契約開始日",
    size: 5,
  },
  {
    accessorKey: "contract_name",
    header: "契約名",
    size: 10,
  },
  {
    accessorKey: "note",
    header: "備考",
    size: 10,
  },
  {
    accessorKey: "updated_at",
    header: "更新日",
    size: 10,
  },
]