import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import UserOnProjectNew from "@/components/useronproject/UserOnProjectNew"

// 新規ユーザプロジェクトページ
const UserOnProjectNewPage = async () => {
  // 認証情報取得
  const loginuser = await getAuthSession()

  if (!loginuser) {
    redirect("/login")
  }

  return <UserOnProjectNew loginuser={loginuser}/>
}

export default UserOnProjectNewPage