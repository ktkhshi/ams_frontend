"use client"

import { ColumnDef } from "@tanstack/react-table"

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