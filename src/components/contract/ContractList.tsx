import { ContractColumnType, columns } from "@/components/contract/ContractTableColumns"
import { DataTable } from "@/components/contract/ContractDataTable"
import { getContractList } from "@/actions/contract"
import { GetContractTypeText } from "./ContractType"

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
      <div className="container mx-auto py-10 w-screen-2xl">
        <div className="text-2xl font-bold text-left mb-5">契約一覧</div>
        <div className="text-right mb-5">
          <Button asChild className="font-bold">
            <Link href="/contract/new">新規登録</Link>
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">契約データがありません</div>
      </div>
    )
  }

  const contracts_disp: ContractColumnType[] = contracts.map((data) => ({
    uid: data.uid,
    unit_price: data.unit_price,
    contract_type_text: GetContractTypeText(data.contract_type),
    lower_hours_a_month: data.lower_hours_a_month,
    upper_hours_a_month: data.upper_hours_a_month,
    started_on: data.started_on,
    contract_name: data.contract_name,
    note: data.note,
    updated_at: data.updated_at,
  }))

  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <div className="text-2xl font-bold text-left mb-5">契約一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/contract/new">新規登録</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={contracts_disp} />
      </div>
    </div>
  )
}

export default ContractList