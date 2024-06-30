"use client"

import { UserOnProjectDayType, CreateUserOnProjectTimeType, createUserOnProjectDayDetail, UserOnProjectTimeType } from "@/actions/useronprojectday"

import { useForm, UseFormProps, useFieldArray, Controller, SubmitHandler } from "react-hook-form"
import { date, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { formatDate, intervalToDuration } from "date-fns"
import { da, ja } from "date-fns/locale"
import toast from "react-hot-toast"
import { UserType, getAuthSession } from "@/lib/nextauth"
import { TimePickerEx } from "../ui/time-picker"

interface UserOnProjectDayDetailProps {
  day: UserOnProjectDayType
}

const schema = z.object({
  times: z.array(z.object({ timeIndex: z.coerce.number(),
                            work_started_at: z.date({ required_error: "開始時刻を入力する必要があります" }),
                            work_ended_at: z.date({ required_error: "終了時刻を入力する必要があります" }), 
                            rest_started_at: z.date({ required_error: "休憩開始時刻を入力する必要があります" }),
                            rest_ended_at: z.date({ required_error: "休憩終了時刻を入力する必要があります" }), 
                            private_note: z.string().max(255, { message: "255文字以下で入力する必要があります"}),  
                            public_note: z.string().max(255, { message: "255文字以下で入力する必要があります"}),
  }))
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>["times"][number]

const timesIntial: InputType[] = [
  { 
    timeIndex: 1,  
    work_started_at: new Date("2020-01-01T09:00:00"),
    work_ended_at: new Date("2020-01-01T18:00:00"),
    rest_started_at: new Date("2020-01-01T12:00:00"),
    rest_ended_at: new Date("2020-01-01T13:00:00"),
    private_note: "",
    public_note: "",
  }
]

function getTimesData(times: UserOnProjectTimeType[]) : InputType[] {
  let resultArray = new Array<InputType>()
  times.forEach(element => {
    let input = {} as InputType
    input.timeIndex = element.time_index
    input.work_started_at = new Date("2020-01-01T" + element.work_started_at)
    input.work_ended_at = new Date("2020-01-01T" + element.work_ended_at)
    input.rest_started_at = new Date("2020-01-01T" + element.rest_started_at)
    input.rest_ended_at = new Date("2020-01-01T" + element.rest_ended_at)
    input.private_note = element.private_note
    input.public_note = element.public_note
    resultArray.push(input)
  })
  return resultArray  
} 

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      //rawValues: true
    })
  })

  return form
}

interface UserOnProjectDayDetailProps {
  user: UserType
  day: UserOnProjectDayType
}

// プロジェクト勤務日詳細
const UserOnProjectDayDetail = async ({ user, day }: UserOnProjectDayDetailProps) => {
  const router = useRouter()
  const [times, setTimes] = useState<InputType[]>(() => day.times.length > 0 ? getTimesData(day.times) : timesIntial)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isValidating, isDirty },
  } = useZodForm({
    schema: schema,
    defaultValues: { times: day.times.length > 0 ? getTimesData(day.times) : timesIntial },
    mode: "onChange"
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "times",
  })

  // 送信
  const onSubmit: SubmitHandler<InputType[]> = async (data) => {
    setIsLoading(true)

    try {
      let arrayTimes = new Array<CreateUserOnProjectTimeType>()
      let total_rest_hours: number = 0
      let timeIndex = 0
      data.forEach((element: 
      {
        work_started_at: Date
        work_ended_at: Date
        rest_started_at: Date
        rest_ended_at: Date
        private_note: string
        public_note: string        
      }) => {
        let d = {} as CreateUserOnProjectTimeType
        timeIndex++
        d.time_index = timeIndex
        d.work_started_at = formatDate(element.work_started_at, 'HH:mm', {locale: ja})
        d.work_ended_at = formatDate(element.work_ended_at, 'HH:mm', {locale: ja})
        d.rest_started_at = formatDate(element.rest_started_at, 'HH:mm', {locale: ja})
        d.rest_ended_at = formatDate(element.rest_ended_at, 'HH:mm', {locale: ja})
        if (element.rest_started_at != null && element.rest_ended_at != null) {
          let diffMillSeconds = (element.rest_ended_at.getTime() - element.rest_started_at.getTime())
          let diffHours = diffMillSeconds / (60 * 60 * 1000)
          total_rest_hours += diffHours
        }
        d.private_note = element.private_note
        d.public_note = element.public_note
        arrayTimes.push(d)
      })

      // ユーザプロジェクト日詳細の作成
      const res = await createUserOnProjectDayDetail({
        accessToken: user.accessToken,
        uid: day.uid,
        work_started_at: formatDate(Math.min(...data.map(item => item.work_started_at.getTime())), 'HH:mm'),
        work_ended_at: formatDate(Math.max(...data.map(item => item.work_ended_at.getTime())), 'HH:mm'),
        rest_hours: (total_rest_hours).toFixed(2).toString(),
        times: arrayTimes,
      })

      if (!res.success || !res.uopd) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      router.push(`/`)
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmittable = !!isDirty && !!isValid
  
  return (
    <div className="container mx-auto py-10 w-full">
      <div>
        <p className="text-2xl">
          {formatDate(new Date(day.date_day), 'yyyy/MM/dd(E)', {locale: ja})}
        </p>
      </div>
      <div>    
      <form
        onSubmit={handleSubmit((data) => {
          console.log("data submitted:", data)
          setTimes(data.times)
          onSubmit(data.times)
          reset(data)
        })}
        className="w-full"
      >
      {fields.map((field, index) => {
        const errorForWorkStartField = errors?.times?.[index]?.work_started_at
        const errorForWorkEndField = errors?.times?.[index]?.work_ended_at
        const errorForRestStartField = errors?.times?.[index]?.rest_started_at
        const errorForRestEndField = errors?.times?.[index]?.rest_ended_at
        const errorForPrivateNoteField = errors?.times?.[index]?.private_note
        const errorForPublicNoteField = errors?.times?.[index]?.public_note
        return (
          <div className="flex flex-row items-center" key={field.id}>
            <div>
              <p className="m-6">{field.timeIndex == 0 ? ("New") : (field.timeIndex)} :</p>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/4 m-5">
                <p>開始時刻</p>
                <Controller
                  control={control}
                  name={`times.${index}.work_started_at`}
                  render={({ field: {onChange, value}}) => (
                    <TimePickerEx
                      date={value}
                      setDate={onChange}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p className="text-xs text-red-500">{errorForWorkStartField?.message ?? <>&nbsp;</>}</p>
              </div>
              <div className="basis-1/4 m-5">
                <p>終了時刻</p>
                <Controller
                  control={control}
                  name={`times.${index}.work_ended_at`}
                  render={({ field: {onChange, value}}) => (
                    <TimePickerEx
                      date={value}
                      setDate={onChange}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p>{errorForWorkEndField?.message ?? <>&nbsp;</>}</p>
              </div>
              <div className="basis-1/4 m-5">
                <p>休憩開始時刻</p>
                <Controller
                  control={control}
                  name={`times.${index}.rest_started_at`}
                  render={({ field: {onChange, value}}) => (
                    <TimePickerEx
                      date={value}
                      setDate={onChange}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p>{errorForRestStartField?.message ?? <>&nbsp;</>}</p>
              </div>
              <div className="basis-1/4 m-5">
                <p>休憩終了時刻</p>
                <Controller
                  control={control}
                  name={`times.${index}.rest_ended_at`}
                  render={({ field: {onChange, value}}) => (
                    <TimePickerEx
                      date={value}
                      setDate={onChange}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p>{errorForRestEndField?.message ?? <>&nbsp;</>}</p>
              </div>
              <div className="basis-1/4 m-5">
                <p>備考</p>
                <input
                  {...register(`times.${index}.private_note` as const)}
                  defaultValue={field.private_note}
                  className="border p-2 border-gray-300 rounded-lg"
                />
                <p>{errorForPrivateNoteField?.message ?? <>&nbsp;</>}</p>
              </div>
            </div>
            <div className="basis-1/4">
              <button
                type="button"
                className="bg-violet-300 hover:bg-violet-400 rounded-lg p-2"
                onClick={() => remove(index)}
              >
                削除
              </button>
            </div>
          </div>
        )
      })}
        <button
          type="button"
          className="block rounded-lg mx-auto bg-pink-400 hover:bg-pink-500 p-4 m-5"
          onClick={() =>
            append({
              timeIndex: fields.length + 1,
              work_started_at: new Date("2020-01-01T09:00:00"),
              work_ended_at: new Date("2020-01-01T18:00:00"),
              rest_started_at: new Date("2020-01-01T12:00:00"),
              rest_ended_at: new Date("2020-01-01T13:00:00"),
              private_note: "",
              public_note: "",
            })}
          >
          追加
        </button>
        <div className="h-16">
          <button
            disabled={!isSubmittable}
            type="submit"
            className="block rounded-lg w-32 cursor-pointer mx-auto bg-blue-300 hover:bg-blue-400 disabled:bg-orange-300 disabled:cursor-not-allowed p-2"
          >
            <p>登録</p>
            {!isSubmittable && <p>(Disabled)</p>}
          </button>
          <div className="w-full">
        </div>
        </div>
      </form>
      </div>
    </div>
  )
}
export default UserOnProjectDayDetail