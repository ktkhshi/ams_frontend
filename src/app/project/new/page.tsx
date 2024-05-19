import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import ProjectNew from "@/components/project/ProjectNew"

// 新規プロジェクトページ
const ProjectNewPage = async () => {
  // 認証情報取得
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <ProjectNew user={user}/>
}

export default ProjectNewPage