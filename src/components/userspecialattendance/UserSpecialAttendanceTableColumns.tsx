"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserSpecialAttendanceColumnType = {
  date_day: string
  attendance_name: string
  note: string
  updated_at: string
}

export const columns: ColumnDef<UserSpecialAttendanceColumnType>[] = [
  {
    accessorKey: "date_day",
    header: "日付",
    size: 100,
  },
  {
    accessorKey: "attendance_name",
    header: "勤務タイプ名",
    size: 100,
  },
  {
    accessorKey: "note",
    header: "備考",
    size: 200,
  },
  {
    accessorKey: "updated_at",
    header: "更新日",
    size: 100,
  },
]