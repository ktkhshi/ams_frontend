"use client"

import { ColumnDef } from "@tanstack/react-table"

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