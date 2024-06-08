import { columns } from "@/components/project/ProjectTableColumns"
import { DataTable } from "@/components/project/ProjectDataTable"
import { getProjectList } from "@/actions/project"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// プロジェクト一覧ページ
const ProjectList = async () => {
  // プロジェクト一覧を取得
  const { success,  projects } = await getProjectList()

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        プロジェクト一覧の取得に失敗しました
      </div>
    )
  }

  if (projects.length == 0) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクトデータがありません</div>
    )
  }

  return (
    <div className="container mx-auto py-10 w-screen-2xl">
      <div className="text-2xl font-bold text-left mb-5">プロジェクト一覧</div>
      <div className="text-right mb-5">
        <Button asChild className="font-bold">
          <Link href="/project/new">新規登録</Link>
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  )
}

export default ProjectList