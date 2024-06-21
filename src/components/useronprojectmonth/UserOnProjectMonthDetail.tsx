"use client"

import { UserOnProjectMonthType } from "@/actions/useronprojectmonth"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate } from "date-fns"
import { ja } from 'date-fns/locale'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface UserOnProjectMonthDetailProps {
  month: UserOnProjectMonthType
}

// 投稿詳細
const UserOnProjectMonthDetail = async ({ month }: UserOnProjectMonthDetailProps) => {
  const router = useRouter()
  let totalWorkHours: number = 0
  const thisMonth = new Date(month.days[0].date_day)

  const handlePreviousMonth = () => {
    router.push(`/`)
  }

  const handleThisMonth = () => {
    router.push(`/`)
  }

  const handleNextMonth = () => {
    router.push(`/`)
  }

  // 月を取得した時に1月が0から始まるため＋1する
  return (
    <div className="container mx-auto py-10 w-full">
    <div className="flex justify-between">
      <div className="text-2xl font-bold text-left mb-5">プロジェクト勤務表</div>
      <div className="flex justify-normal m-2">
        <Button className="m-2" onSelect={handlePreviousMonth}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 先月
        </Button>
        <Button className="m-2" onSelect={handleThisMonth}>
          <CalendarCheck className="mr-2 h-4 w-4" /> 今月
        </Button>
        <Button className="m-2" onSelect={handleNextMonth}>
          <ArrowRight className="mr-2 h-4 w-4" /> 来月
        </Button>
      </div>
    </div>
    <div className="text-2xl font-bold">{thisMonth.getFullYear() + "年" + (thisMonth.getMonth() + 1) + "月"}</div>
    <div className="w-full">
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[055px] text-center font-bold">稼働日</TableHead>
            <TableHead className="w-[005px] text-center font-bold">日付</TableHead>
            <TableHead className="w-[100px] text-center font-bold">開始時刻</TableHead>
            <TableHead className="w-[100px] text-center font-bold">終了時刻</TableHead>
            <TableHead className="w-[100px] text-center font-bold">稼働時間</TableHead>
            <TableHead className="w-[100px] text-center font-bold">休憩時間</TableHead>
            <TableHead className="w-[100px] text-center font-bold">残業時間</TableHead>
            <TableHead className="w-[150px] text-center font-bold">備考</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {month.days.map((day) => {
            const isSunday = (new Date(day.date_day)).getDay() == 0
            const isSaturday = (new Date(day.date_day)).getDay() == 6
            const workHours = day.work_started_at != null && day.work_ended_at != null && day.rest_hours != null ? 
                              (
                                ((
                                  new Date(day.date_day + " " + day.work_ended_at).getTime() 
                                  - 
                                  new Date(day.date_day + " " + day.work_started_at).getTime()
                                ).valueOf() / (1000 * 60 * 60) - parseFloat(day.rest_hours))
                              ) 
                              : (0)
            totalWorkHours = totalWorkHours + workHours
            return (
              <TableRow key={day.uid}>
                <TableCell className="text-center text-xl">{day.should_work_day ? "●": ""}</TableCell>
                <TableCell className={cn("text-center", isSunday ? 
                                                        ("bg-red-200") : 
                                                        (
                                                          isSaturday ? ("bg-blue-200") : ("")
                                                        )
                                        )}>
                  {formatDate(new Date(day.date_day), 'MM/dd(E)', {locale: ja})}
                </TableCell>
                <TableCell className="text-center">{day.work_started_at}</TableCell>
                <TableCell className="text-center">{day.work_ended_at}</TableCell>
                <TableCell className="text-center">{workHours.toFixed(2)}</TableCell>
                <TableCell className="text-center">{day.rest_hours}</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center">{day.private_note}</TableCell>
              </TableRow>
            )})}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-center">{totalWorkHours.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  </div>

  )
}
export default UserOnProjectMonthDetail