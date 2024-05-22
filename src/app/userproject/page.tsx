import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import UserOnProjectNew from "@/components/useronproject/UserOnProjectNew"

// 新規ユーザプロジェクト（仮）ページ
const UserOnProjectNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <UserOnProjectNew user={user}/>
}

export default UserOnProjectNewPage