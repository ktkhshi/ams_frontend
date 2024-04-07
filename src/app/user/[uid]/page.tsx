import { getUserDetail } from "@/actions/user"
import UserDetail from "@/components/user/UserDetail"
import { string } from "zod"

interface UserDetailPageProps {
  params: {
    uid: string
  }
}

// ユーザ詳細ページ
const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { uid } = params

  console.error(uid)

  // ユーザ投稿詳細取得
  const { success, user } = await getUserDetail({ uid })

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザの取得に失敗しました
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザは存在しません
      </div>
    )
  }
  return <UserDetail user={user} />
}

export default UserDetailPage