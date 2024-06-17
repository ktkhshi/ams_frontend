import { columns } from "@/components/useronproject/UserOnProjectTableColumns"
import { DataTable } from "@/components/useronproject/UserOnProjectDataTable"
import { getUserOnProjectList } from "@/actions/useronproject"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// ユーザプロジェクト一覧ページ
const UserOnProjectList = async () => {
  // ユーザプロジェクト一覧を取得
  const { success, useronprojects } = await getUserOnProjectList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザプロジェクト一覧の取得に失敗しました
      </div>
    )
  }

  if (useronprojects.length == 0) {
    return (
      <div className="container mx-auto py-10 w-full">
        <div className="text-2xl font-bold text-left mb-5">ユーザプロジェクト一覧</div>
        <div className="text-right mb-5">
          <Button asChild className="font-bold">
            <Link href="/useronproject/new">新規登録</Link>
          </Button>
        </div>
        <div className="text-center text-sm text-gray-500">ユーザプロジェクトデータがありません</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 w-full">
      <div className="text-2xl font-bold text-left mb-5">ユーザプロジェクト一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/useronproject/new">新規登録</Link>
        </Button>
      </div>
      <div className="w-full">
        <DataTable columns={columns} data={useronprojects} />
      </div>
    </div>
  )
}

export default UserOnProjectList