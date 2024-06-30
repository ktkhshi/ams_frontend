import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth" 
import { getUserOnProjectDayDetail } from "@/actions/useronprojectday"
import UserOnProjectDayDetail from "@/components/useronprojectday/UserOnProjectDayDetail"

interface UserOnProjectDayProps {
  params: {
    uid: string
  }
}

// ユーザプロジェクト勤務日詳細ページ
export default async function UserOnProjectDayPage({ params }: UserOnProjectDayProps ) {
  const { uid } = params
  const { success, day } = await getUserOnProjectDayDetail({ uid })
  
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }
  
  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        プロジェクト勤務日詳細の取得に失敗しました
      </div>
    )
  }

  if (!day) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクト勤務日詳細はありません</div>
    )
  }

  return (
    <UserOnProjectDayDetail user={user} day={day}/>
  )
}