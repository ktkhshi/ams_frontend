"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contract = {
  uid: string
  unit_price: number
  contract_type: number
  lower_hours_a_month: number
  upper_hours_a_month: number
  work_hours_a_day: number
  started_on: Date
  ended_on: Date | undefined
  contract_name: string
  note: string
}

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "uid",
    header: "キー",
    size: 2,
  },
  {
    accessorKey: "unit_price",
    header: "単価",
    size: 5,
  },
  {
    accessorKey: "contract_type",
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
    accessorKey: "work_hours_a_day",
    header: "所定勤務時間",
    size: 1,
  },
  {
    accessorKey: "started_on",
    header: "契約開始日",
    size: 5,
  },
  {
    accessorKey: "ended_on",
    header: "契約終了日",
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
]