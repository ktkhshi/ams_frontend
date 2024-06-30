import { columns } from "@/components/user/UserTableColumns"
import { DataTable } from "@/components/user/UserDataTable"
import { getUserList } from "@/actions/user"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// ユーザ一覧ページ
const UserList = async () => {
  // ユーザ一覧を取得
  const { success,  users } = await getUserList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        ユーザ一覧の取得に失敗しました
      </div>
    )
  }

  if (users.length == 0) {
    return (
      <div className="text-center text-sm text-gray-500">ユーザデータがありません</div>
    )
  }

  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <div className="text-2xl font-bold text-left mb-5">ユーザ一覧</div>
      {/* <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/user/new">新規登録</Link>
        </Button>
      </div> */}
      <div className="w-4/5">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  )
}

export default UserList