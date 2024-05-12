import { getClientList } from "@/actions/client"

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
      <div className="text-center text-sm text-gray-500">クライアントデータがありません</div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {/* {clients.map((client) => (
        <ClientItem key={client.uid} client={client}/>
      ))} */}
    </div>
  )
}

export default ClientList