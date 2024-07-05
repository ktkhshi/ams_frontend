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
} from "@/components/ui/table-shallow"
import { 
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { addMonths, formatDate } from "date-fns"
import { ja } from 'date-fns/locale'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ContractType } from "@/actions/contract"

interface UserOnProjectMonthDetailProps {
  month: UserOnProjectMonthType
  contract: ContractType
  userUid: string
  projectUid: string
}

// プロジェクト勤務付月詳細
const UserOnProjectMonthDetail = async ({ month, contract, userUid, projectUid }: UserOnProjectMonthDetailProps) => {
  const router = useRouter()
  const today = new Date()
  let totalWorkHours: number = 0
  let thisMonth = new Date(month.days[0].date_day)

  const handlePreviousMonth = () => {
    thisMonth = addMonths(thisMonth, -1)
    const date_ym = formatDate(thisMonth, "yyyyMM")
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${projectUid}`)
  }

  const handleThisMonth = () => {
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const date_ym = formatDate(thisMonth, "yyyyMM")
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${projectUid}`)
  }

  const handleNextMonth = () => {
    thisMonth = addMonths(thisMonth, 1)
    const date_ym = formatDate(thisMonth, "yyyyMM")
    router.push(`/useronprojectmonth/${userUid}/${date_ym}/${projectUid}`)
  }

  return (
    <div className="container mx-auto py-10 w-full">
    <div className="flex justify-between">
      <div className="text-2xl font-bold text-left mb-5">プロジェクト勤務表</div>
      <div className="flex justify-normal m-2">
        <Button className="m-2 bg-emerald-400 hover:bg-emerald-500 rounded-lg p-2" onClick={handlePreviousMonth}>
          <ArrowLeft className="mr-2 h-4 w-4" /> 先月
        </Button>
        <Button className="m-2 bg-emerald-400 hover:bg-emerald-500 rounded-lg p-2" onClick={handleThisMonth}>
          <CalendarCheck className="mr-2 h-4 w-4" /> 今月
        </Button>
        <Button className="m-2 bg-emerald-400 hover:bg-emerald-500 rounded-lg p-2" onClick={handleNextMonth}>
          <ArrowRight className="mr-2 h-4 w-4" /> 来月
        </Button>
      </div>
    </div>
    {/* 月を取得した時に1月が0から始まるため＋1する */}
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
            <TableHead className="w-[005px] text-center font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {month.days.map((uopday) => {
            const dateDay = new Date(uopday.date_day)
            const isSunday = dateDay.getDay() == 0
            const isSaturday = dateDay.getDay() == 6
            const workHours = uopday.work_started_at != null && uopday.work_ended_at != null && uopday.rest_hours != null ? 
                              (
                                ((
                                  new Date(uopday.date_day + " " + uopday.work_ended_at).getTime() 
                                  - 
                                  new Date(uopday.date_day + " " + uopday.work_started_at).getTime()
                                ).valueOf() / (1000 * 60 * 60) - parseFloat(uopday.rest_hours))
                              )
                              : (0)
            totalWorkHours = totalWorkHours + workHours
            const overWorkHours = workHours == 0 ? 0 : workHours - contract.work_hours_a_day
            return (
              <TableRow key={uopday.uid} className="h-1 p-0 m-0">
                <TableCell className="text-center text-xl">{uopday.should_work_day ? "●": ""}</TableCell>
                <TableCell className={cn("text-center", isSunday ? 
                                                        ("bg-red-200") : 
                                                        (
                                                          isSaturday ? ("bg-blue-200") : ("")
                                                        )
                                        )}>
                  {formatDate(dateDay, 'MM/dd(E)', {locale: ja})}
                </TableCell>
                <TableCell className={cn("text-center", dateDay.getTime() > today.getTime() ? "text-slate-300" : "")}>{uopday.work_started_at}</TableCell>
                <TableCell className={cn("text-center", dateDay.getTime() > today.getTime() ? "text-slate-300" : "")}>{uopday.work_ended_at}</TableCell>
                <TableCell className={cn("text-center", dateDay.getTime() > today.getTime() ? "text-slate-300" : "")}>{workHours.toFixed(2)}</TableCell>
                <TableCell className={cn("text-center", dateDay.getTime() > today.getTime() ? "text-slate-300" : "")}>{uopday.rest_hours}</TableCell>
                <TableCell className={cn("text-center", dateDay.getTime() > today.getTime() ? "text-slate-300" : "")}>{overWorkHours.toFixed(2)}</TableCell>
                <TableCell className="text-center">{uopday.private_note}</TableCell>
                <TableCell> 
                  <Button 
                    className="bg-violet-400 hover:bg-violet-500"
                    onClick={() => { router.push(`/useronprojectday/${uopday.uid}`)}}>編集</Button>
                </TableCell>
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