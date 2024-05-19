"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
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
import { createProject } from "@/actions/project"
import { UserType } from "@/lib/nextauth"
import toast from "react-hot-toast"
import Link from "next/link"

// 入力データの検証ルールを定義
const schema = z.object({
  main_name: z.string().max(45, { message: "255文字以下で入力する必要があります" }),
  sub_name: z.string().max(255, { message: "255文字以下で入力する必要があります"}),
  note: z.string().max(255, { message: "255文字以下で入力する必要があります"}),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface ProjectNewProps {
  user: UserType
}

// 新規プロジェクト
const ProjectNew = ({ user }: ProjectNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      main_name: "",
      sub_name: "",
      note: "",
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // 新規プロジェクト
      const res = await createProject({
        accessToken: user.accessToken,
        main_name: data.main_name,
        sub_name: data.sub_name,
        note: data.note,
      })

      if (!res.success || !res.project) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      router.push(`/project`)
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
        <div className="text-2xl font-bold text-center mb-5">新規プロジェクト</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="main_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メイン名</FormLabel>
                  <FormControl>
                    <Input placeholder="メイン名" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sub_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>サブ名</FormLabel>
                  <FormControl>
                    <Textarea placeholder="サブ名" {...field} rows={2} />
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
                  <Link href="/project">戻る</Link>
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

export default ProjectNew