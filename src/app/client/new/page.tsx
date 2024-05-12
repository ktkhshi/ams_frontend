import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import ClientNew from "@/components/client/ClientNew"

// 新規クライアントページ
const ClientNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <ClientNew user={user}/>
}

export default ClientNewPage