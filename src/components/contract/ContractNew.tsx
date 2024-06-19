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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { createContract } from "@/actions/contract"
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
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { TimePickerEx } from "@/components/ui/time-picker"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ContractTypeEnum, ContractTypeOptions } from "./ContractType"

// 入力データの検証ルールを定義
const schema = z.object({
  unit_price: z.coerce.number().positive({ message: "正の値で入力必要があります" } ),
  contract_type: z.nativeEnum(ContractTypeEnum),
  lower_hours_a_month: z.coerce.number().positive({ message: "正の値で入力必要があります" } )
                                 .lte(744, { message: "744以下の値にする必要があります"}),
  upper_hours_a_month: z.coerce.number().positive({ message: "正の値で入力必要があります" } )
                                 .lte(744, { message: "744以下の値にする必要があります"}),
  latest_work_started_at: z.date({ required_error: "規定の開始時刻を入力する必要があります" }),
  earliest_work_ended_at: z.date({ required_error: "規定の終了時刻を入力する必要があります" }),
  work_hours_a_day: z.coerce.number().positive({ message: "正の値で入力必要があります" } )
                                      .lte(24, { message: "24以下の値にする必要があります"}),
  rest_hours_a_day: z.coerce.number().positive({ message: "正の値で入力必要があります" } )
                                      .lte(24, { message: "24以下の値にする必要があります"}),
  started_on: z.date({ required_error: "契約開始日を入力する必要があります" }),
  ended_on: z.date().optional(),
  contract_name: z.string().min(1, { message: "必須項目です" })
                          .max(255, { message: "255文字以下で入力する必要があります"}),
                            
  note: z.string().max(255, { message: "255文字以下で入力する必要があります"}),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface ContractNewProps {
  user: UserType
}

// 新規契約
const ContractNew = ({ user }: ContractNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      unit_price: 1000000,
      contract_type: ContractTypeEnum.TimeAndMaterial,
      lower_hours_a_month: 140,
      upper_hours_a_month: 180,
      latest_work_started_at: new Date(2020, 1, 1, 9, 0, 0),
      earliest_work_ended_at: new Date(2020, 1, 1, 18, 0, 0),
      work_hours_a_day: 8,
      rest_hours_a_day: 1,
      started_on: new Date(),
      ended_on: undefined,
      contract_name: "",
      note: "",
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // 新規契約
      const res = await createContract({
        accessToken: user.accessToken,
        unit_price: data.unit_price,
        contract_type: data.contract_type,
        lower_hours_a_month: data.lower_hours_a_month,
        upper_hours_a_month: data.upper_hours_a_month,
        latest_work_started_at: data.latest_work_started_at,
        earliest_work_ended_at: data.earliest_work_ended_at,
        work_hours_a_day: data.work_hours_a_day,
        rest_hours_a_day: data.rest_hours_a_day,
        started_on: data.started_on,
        ended_on: data.ended_on,
        contract_name: data.contract_name,
        note: data.note,
      })

      if (!res.success || !res.contract) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      router.push(`/contract`)
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
        <div className="text-2xl font-bold text-center mb-5">新規契約</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="unit_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>単価</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="単価" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contract_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>契約形態</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="契約形態" />
                      </SelectTrigger>
                      <SelectContent>
                        {ContractTypeOptions.map(({ value, label }) => (
                          <SelectItem
                            key={value}
                            value={value.toString()}
                            className="w-[180px]"
                          >
                            {label}  
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 下限時間と上限時間 */}
            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="lower_hours_a_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>下限時間</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="下限時間" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="upper_hours_a_month"
                render={({ field }) => (
                  <FormItem className="ml-5">
                    <FormLabel>上限時間</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="上限時間"　{...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            
            {/* 規定の開始時刻と規定の終了時刻 */}
            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="latest_work_started_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>規定の開始時刻</FormLabel>
                    <FormControl>
                      <TimePickerEx
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="earliest_work_ended_at"
                render={({ field }) => (
                  <FormItem　className="ml-5">
                    <FormLabel>規定の終了時刻</FormLabel>
                    <FormControl>
                      <TimePickerEx
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="work_hours_a_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所定勤務時間</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="所定勤務時間" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rest_hours_a_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所定休憩時間</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="所定休憩時間" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="started_on"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>契約開始日</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ended_on"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>契約終了日</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value as Date, "yyyy-MM-dd") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
                        
            <FormField
              control={form.control}
              name="contract_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>契約名</FormLabel>
                  <FormControl>
                    <Input placeholder="契約名" {...field} />
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
                  <Link href="/contract">戻る</Link>
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

export default ContractNew