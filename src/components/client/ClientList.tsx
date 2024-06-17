import { columns } from "@/components/client/ClientTableColumns"
import { DataTable } from "@/components/client/ClientDataTable"
import { getClientList } from "@/actions/client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


// クライアント一覧ページ
const ClientList = async () => {
  // クライアント一覧を取得
  const { success,  clients } = await getClientList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        クライアント一覧の取得に失敗しました
      </div>
    )
  }

  if (clients.length == 0) {
    return (
      <div className="container mx-auto py-10 w-screen-2xl">
        <div className="text-2xl font-bold text-left mb-5">クライアント一覧</div>
        <div className="text-right mb-5">
          <Button asChild className="font-bold">
            <Link href="/client/new">新規登録</Link>
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">クライアントデータがありません</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <div className="text-2xl font-bold text-left mb-5">クライアント一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/client/new">新規登録</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  )
}

export default ClientList