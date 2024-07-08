import { UserSpecialAttendanceColumnType, columns } from "@/components/userspecialattendance/UserSpecialAttendanceTableColumns"
import { DataTable } from "@/components/userspecialattendance/UserSpecialAttendanceDataTable"
import { AttendanceType, getUserSpecialAttendanceList } from "@/actions/userspecialattendance"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "date-fns"
import { ja } from "date-fns/locale"

interface UserSpecialAttendanceListProps {
  userUid: string
  attendanceTypeList: AttendanceType[]
}

// ユーザ特別勤務一覧ページ
const UserSpecialAttendanceList = async ({ userUid, attendanceTypeList }: UserSpecialAttendanceListProps) => {
  // ユーザプロジェクト一覧を取得
  const { success, userspecialattendances } = await getUserSpecialAttendanceList({ userUid })

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザ特別勤務一覧の取得に失敗しました
      </div>
    )
  }

  if (userspecialattendances.length == 0) {
    return (
      <div className="container mx-auto py-10 w-full">
        <div className="text-2xl font-bold text-left mb-5">ユーザ特別勤務一覧</div>
        <div className="text-right mb-5">
          <Button asChild className="font-bold">
            <Link href="/userspecialattendance/new">新規登録</Link>
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">ユーザ特別勤務データがありません</div>
      </div>
    )
  }

  const usa_disp: UserSpecialAttendanceColumnType[] = userspecialattendances.map((data) => {
    const found = attendanceTypeList.find((x) => x.id === data.attendance_type)
    return {
      date_day: formatDate(new Date(data.date_day), 'yyyy年MM月dd日(E)', {locale: ja}),
      attendance_name: found ? found.attendance_name : "",
      note: data.note,
      updated_at: data.updated_at
    }
  })

  return (
    <div className="container mx-auto py-10 w-full">
      <div className="text-2xl font-bold text-left mb-5">ユーザ特別勤務一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/userspecialattendance/new">新規登録</Link>
        </Button>
      </div>
      <div className="w-full">
        <DataTable columns={columns} data={usa_disp} />
      </div>
    </div>
  )
}

export default UserSpecialAttendanceList