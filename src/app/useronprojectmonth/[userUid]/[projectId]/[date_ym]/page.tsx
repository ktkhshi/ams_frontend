import { getUserOnProjectMonthDetail } from "@/actions/useronprojectmonth"
import UserOnProjectMonthDetail from "@/components/useronprojectmonth/UserOnProjectMonthDetail"

interface UserOnProjectMonthProps {
  params: {
    userUid: string
    projectId: string
    date_ym: string
  }
}

// ユーザプロジェクト勤務月詳細ージ
export default async function UserOnProjectMonthPage({ params }: UserOnProjectMonthProps ) {
  const { userUid, projectId, date_ym } = params
  const { success, month } = await getUserOnProjectMonthDetail({ userUid, projectId, date_ym })
  
  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        プロジェクト勤務詳細の取得に失敗しました
      </div>
    )
  }

  if (!month) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクト勤務詳細はありません</div>
    )
  }

  return (
    <UserOnProjectMonthDetail month={month}/>
  )
}