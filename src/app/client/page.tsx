import { Client, columns } from "@/components/client/ClientTableColums"
import { DataTable } from "@/components/client/ClientDataTable"
import { getClientList } from "@/actions/client"

async function getData(): Promise<Client[]> {
  // クライアント一覧取得
  const { success, clients } = await getClientList()
  return clients
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <DataTable columns={columns} data={data} />
    </div>
  )
}