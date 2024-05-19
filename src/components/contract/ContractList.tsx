import { Contract, columns } from "@/components/contract/ContractTableColums"
import { DataTable } from "@/components/contract/ContractDataTable"
import { getContractList } from "@/actions/contract"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// 契約一覧ページ
const ContractList = async () => {
  // 契約一覧を取得
  const { success,  contracts } = await getContractList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        契約一覧の取得に失敗しました
      </div>
    )
  }

  if (contracts.length == 0) {
    return (
      <div className="text-center text-sm text-gray-500">契約データがありません</div>
    )
  }

  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <div className="text-2xl font-bold text-left mb-5">契約一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/contract/new">新規登録</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={contracts} />
      </div>
    </div>
  )
}

export default ContractList