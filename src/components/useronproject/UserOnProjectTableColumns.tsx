"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserOnProject = {
  uid: string
  user_name: string
  project_name: string
  person_in_charge: string
  contract_name: string
  updated_at: string
}

export const columns: ColumnDef<UserOnProject>[] = [
  {
    accessorKey: "uid",
    header: "キー",
  },
  {
    accessorKey: "user_name",
    header: "ユーザ名",
    size: 100,
  },
  {
    accessorKey: "project_name",
    header: "プロジェクト名",
    size: 200,
  },
  {
    accessorKey: "contract_name",
    header: "契約名",
    size: 200,
  },
  {
    accessorKey: "person_in_charge",
    header: "担当者名",
    size: 100,
  },
  {
    accessorKey: "updated_at",
    header: "更新日",
    size: 100,
  },
]