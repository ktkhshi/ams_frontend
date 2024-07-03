"use client"

import * as React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { UserType } from "@/lib/nextauth"
import toast from "react-hot-toast"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AttendanceType, createUserSpecialAttendance } from "@/actions/userspecialattendance";
import { ja } from "date-fns/locale";

// 入力データの検証ルールを定義
const schema = z.object({
  date_day: z.date({ required_error: "日付を入力する必要があります" }),
  attendance_type: z.coerce.number(),
  note: z.string().max(255, { message: "255文字以下で入力する必要があります"}),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface UserSpecialAttendanceNewProps {
  user: UserType
  attendanceTypeList: AttendanceType[]
}

// 新規契約
const UserSpecialAttendanceNew = ({ user, attendanceTypeList }: UserSpecialAttendanceNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      date_day: new Date(),
      attendance_type: 0,
      note: "",
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // 新規ユーザ特別勤務
      const res = await createUserSpecialAttendance({
        accessToken: user.accessToken,
        date_day: data.date_day,
        attendance_type: data.attendance_type,
        note: data.note,
      })

      if (!res.success || !res.userspecialattendance) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      router.push(`/userspecialattendance-list/${user.uid}`)
      router.refresh()
    } catch (error) {
      toast.error("作成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="text-2xl font-bold text-center mb-5">新規特別勤務登録</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="date_day"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of attendance</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                          {field.value ? (
                            formatDate(field.value, 'yyyy年MM月dd日(E)', {locale: ja})
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendance_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>勤務タイプ</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="勤務タイプ" />
                      </SelectTrigger>
                      <SelectContent>
                        {attendanceTypeList.map(({ id, attendance_name }) => (
                          <SelectItem
                            key={id}
                            value={id.toString()}
                            className="w-[180px]"
                          >
                            {attendance_name}  
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>備考</FormLabel>
                  <FormControl>
                    <Textarea placeholder="備考" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <div className="w-1/2 flex items-center mx-5">
                <Button asChild className="font-bold w-full">
                  <Link href={"/userspecialattendance-list" + user.uid}>戻る</Link>
                </Button>
              </div>
              <div className="w-1/2 flex items-center mx-5">
                <Button disabled={isLoading} type="submit" className="w-full font-bold">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  作成
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UserSpecialAttendanceNew