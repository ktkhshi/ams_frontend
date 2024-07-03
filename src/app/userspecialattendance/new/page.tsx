import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import UserSpecialAttendanceNew from "@/components/userspecialattendance/UserSpecialAttendanceNew"
import { getAttendanceTypeList } from "@/actions/userspecialattendance"

// 新規ユーザ特別勤務ページ
const UserSpecialAttendanceNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  const data = await getAttendanceTypeList()

  if (!user) {
    redirect("/login")
  }

  return <UserSpecialAttendanceNew user={user} attendanceTypeList={data.attendancetypes}/>
}

export default UserSpecialAttendanceNewPage