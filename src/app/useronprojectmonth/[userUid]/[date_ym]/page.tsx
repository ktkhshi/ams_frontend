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

  let array = new Array<[ProjectType, ContractType]>()

  uoplist.forEach((element: 
    { uid: string;
      project: ProjectType;
      contract: ContractType;
      client: ClientType;
      indexes: UserOnProjectIndexType;
      updated_at: string;
      created_at: string;
    }) => {
      let project = {} as ProjectType
      project.uid = element.project.uid
      project.main_name = element.project.main_name
      project.sub_name = element.project.sub_name
      project.note = element.project.note
      project.created_at = element.project.created_at
      project.updated_at = element.project.updated_at
      let contract = {} as ContractType
      contract.uid = element.contract.uid
      contract.unit_price = element.contract.unit_price
      contract.contract_type = element.contract.contract_type
      contract.lower_hours_a_month = element.contract.lower_hours_a_month
      contract.upper_hours_a_month = element.contract.upper_hours_a_month
      contract.latest_work_started_at = element.contract.latest_work_started_at
      contract.earliest_work_ended_at = element.contract.earliest_work_ended_at
      contract.work_hours_a_day = element.contract.work_hours_a_day
      contract.started_on = element.contract.started_on
      contract.ended_on = element.contract.ended_on
      contract.contract_name = element.contract.contract_name
      array.push([project, contract])
  })

  return (
     <UserOnProjectMonthBase userUid={userUid} arrayOfProjectandContract={array}/>
  )
}