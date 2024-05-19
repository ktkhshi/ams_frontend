import * as React from "react";
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import ContractNew from "@/components/contract/ContractNew"

// 新規契約ページ
const ContractNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <ContractNew user={user}/>
}

export default ContractNewPage