import { getAttendanceTypeList } from "@/actions/userspecialattendance"
import UserSpecialAttendanceList from "@/components/userspecialattendance/UserSpecialAttendanceList"

interface UserSpecialAttendanceListProps {
  params: {
    uid: string
  }
}


export default async function UserSpecialAttendanceListPage({ params }: UserSpecialAttendanceListProps) {
  const { uid } = params

  const data = await getAttendanceTypeList()
  
  return (
    <UserSpecialAttendanceList userUid={uid} attendanceTypeList={data.attendancetypes}/>
  )
}