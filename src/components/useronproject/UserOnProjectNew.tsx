"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { number, z } from "zod"
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
import { Loader2 } from "lucide-react"
import { createUserOnProject } from "@/actions/useronproject"
import { UserType } from "@/lib/nextauth"
import toast from "react-hot-toast"
import Link from "next/link"
import { Label } from "@radix-ui/react-dropdown-menu"

import {  useUserContext } from "@/components/contexts/UserContext"
import {  useProjectContext } from "@/components/contexts/ProjectContext"
import {  useClientContext } from "@/components/contexts/ClientContext"
import {  useContractContext } from "@/components/contexts/ContractContext"

// 入力データの検証ルールを定義
const schema = z.object({
  user_id: z.number(),
  user_name: z.string().optional(),
  project_uid: z.string().length(36),
  project_main_name: z.string().optional(),
  contract_uid: z.string().length(36),
  contract_name: z.string().optional(),
  client_uid: z.string().length(36),
  person_in_charge: z.string().optional(),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface UserOnProjectNewProps {
  loginuser: UserType
}

// 新規ユーザプロジェクト
const UserOnProjectNew = async ({ loginuser }: UserOnProjectNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { user, initUser } = useUserContext()
  const { project, initProject } = useProjectContext()
  const { client, initClient } = useClientContext()
  const { contract, initContract } = useContractContext()

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      user_id: Number(user.id),
      project_uid: project.uid,
      client_uid: client.uid,
      contract_uid: contract.uid,
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // 新規ユーザプロジェクト
      const res = await createUserOnProject({
        accessToken: loginuser.accessToken,
        user_id: data.user_id,
        project_uid: data.project_uid,
        contract_uid: data.contract_uid,
        client_uid: data.client_uid,
      })

      if (!res.success || !res.useronproject) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      initUser()
      initProject()
      initClient()
      initContract()
      router.push(`/useronproject`)    // todo 遷移先
      router.refresh()
    } catch (error) {
      toast.error("作成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <div className="text-2xl font-bold text-center mb-5">新規ユーザプロジェクト</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>ユーザID</FormLabel>
                    <FormControl>
                      <Input placeholder="ユーザID" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_name"
                disabled={true}
                render={({ field }) => (
                  <FormItem className="ml-5">
                    <FormLabel>ユーザ名</FormLabel>
                    <FormControl>
                      <Label>{user.name}</Label>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="project_uid"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>プロジェクト</FormLabel>
                    <FormControl>
                      <Input placeholder="プロジェクトID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_main_name"
                disabled={true}
                render={({ field }) => (
                  <FormItem  className="ml-5">
                    <FormLabel>プロジェクトメイン名</FormLabel>
                    <FormControl>
                      <Label>{project.main_name}</Label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="client_uid"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>クライアント</FormLabel>
                    <FormControl>
                      <Input placeholder="クライアントID" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="person_in_charge"
                disabled={true}
                render={({ field }) => (
                  <FormItem  className="ml-5">
                    <FormLabel>クライアント担当者名</FormLabel>
                    <FormControl>
                      <Label>{client.person_in_charge}</Label>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="contract_uid"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>契約</FormLabel>
                    <FormControl>
                      <Input placeholder="契約" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contract_name"
                disabled={true}
                render={({ field }) => (
                  <FormItem className="ml-5">
                    <FormLabel>契約名</FormLabel>
                    <FormControl>
                      <Label>{contract.name}</Label>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex">
              <div className="w-1/2 flex items-center mx-5">
                <Button asChild className="font-bold w-full">
                  <Link href="/useronproject">戻る</Link>
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

export default UserOnProjectNew