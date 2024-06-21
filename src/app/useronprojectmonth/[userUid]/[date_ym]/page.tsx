import { ClientType } from "@/actions/client"
import { ContractType } from "@/actions/contract"
import { ProjectType } from "@/actions/project"
import { getMyUserOnProjectList, UserOnProjectIndexType } from "@/actions/useronproject"
import UserOnProjectMonthBase from "@/components/useronprojectmonth/UserOnProjectMonthBase"

interface UserOnProjectMonthProps {
  params: {
    userUid: string
    date_ym: string
  }
}

// ユーザプロジェクト勤務勤務表（ベース）
export default async function UserOnProjectMonthPage({ params }: UserOnProjectMonthProps ) {
  const { userUid, date_ym } = params
  const { success, uoplist } = await getMyUserOnProjectList({ userUid, date_ym })
  
  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        プロジェクト勤務基本データの取得に失敗しました
      </div>
    )
  }

  if (!uoplist) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクト勤務基本データはありません</div>
    )
  }

  let projects = new Array<ProjectType>()

  uoplist.forEach((element: 
    { uid: string;
      project: ProjectType;
      contract: ContractType;
      client: ClientType;
      indexes: UserOnProjectIndexType;
      updated_at: string;
      created_at: string;
    }) => {
      let data = {} as ProjectType
      data.uid = element.project.uid
      data.main_name = element.project.main_name
      data.sub_name = element.project.sub_name
      data.note = element.project.note
      data.created_at = element.project.created_at
      data.updated_at = element.project.updated_at
      projects.push(data)
  })

  return (
     <UserOnProjectMonthBase userUid={userUid} projects={projects}/>
  )
}