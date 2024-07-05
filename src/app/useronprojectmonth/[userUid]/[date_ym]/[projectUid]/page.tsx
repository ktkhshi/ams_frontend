import { getContract } from "@/actions/contract"
import { getUserOnProjectMonthDetail } from "@/actions/useronprojectmonth"
import UserOnProjectMonthDetail from "@/components/useronprojectmonth/UserOnProjectMonthDetail"
import toast from "react-hot-toast"

interface UserOnProjectMonthProps {
  params: {
    userUid: string
    date_ym: string
    projectUid: string
  },
  searchParams: { 
    cUid? : string 
  }
}

// ユーザプロジェクト勤務月詳細ージ
export default async function UserOnProjectMonthPage({ params, searchParams }: UserOnProjectMonthProps ) {
  const { userUid, date_ym, projectUid } = params
  const { success, month } = await getUserOnProjectMonthDetail({ userUid, date_ym, projectUid })
  const { cUid } = searchParams
  const contractUid = cUid == undefined ? "" : cUid

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        プロジェクト勤務詳細の取得に失敗しました
      </div>
    )
  }

  if (!month) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクト勤務詳細はありません</div>
    )
  }

  const { contract } = await getContract(contractUid)  

  if (!contract) {
    return (
      <div className="text-center text-sm text-gray-500">プロジェクト契約詳細はありません</div>
    )
  }

  return (
    <UserOnProjectMonthDetail month={month} contract={contract} userUid={userUid} projectUid={projectUid}/>
  )
}