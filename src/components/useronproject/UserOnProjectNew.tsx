"use client"

import { useContext, useState } from "react"
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
import { Loader2 } from "lucide-react"
import { createUserOnProject } from "@/actions/useronproject"
import { UserType } from "@/lib/nextauth"
import toast from "react-hot-toast"
import Link from "next/link"
import { Label } from "@radix-ui/react-dropdown-menu"

import { UserContext, ProjectContext, ClientContext, ContractContext } from "@/app/context"

// 入力データの検証ルールを定義
const schema = z.object({
  user_uid: z.string().length(32),
  user_name: z.string(),
  project_uid: z.string().length(32),
  project_main_name: z.string(),
  contract_uid: z.string().length(32),
  contract_name: z.string(),
  client_uid: z.string().length(32),
  clinet_person_in_charge: z.string(),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface UserOnProjectNewProps {
  loginuser: UserType
}

// 新規ユーザプロジェクト
const UserOnProjectNew = ({ loginuser }: UserOnProjectNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const userContext = useContext(UserContext())
  const projectContext = useContext(ProjectContext())
  const clientContext = useContext(ClientContext())  
  const contractContext = useContext(ContractContext())

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      user_uid: userContext.user.uid,
      project_uid: projectContext.project.uid,
      client_uid: clientContext.client.uid,
      contract_uid: contractContext.contract.uid,
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // 新規ユーザプロジェクト
      const res = await createUserOnProject({
        accessToken: loginuser.accessToken,
        user_uid: data.user_uid,
        project_uid: data.project_uid,
        contract_uid: data.contract_uid,
        client_uid: data.client_uid,
      })

      if (!res.success || !res.useronproject) {
        toast.error("作成に失敗しました")
        return
      }

      toast.success("作成しました")
      router.push(`/client`)
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
        <div className="text-2xl font-bold text-center mb-5">新規ユーザプロジェクト</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex justify-start">
              <FormField
                control={form.control}
                name="user_uid"
                render={({ field }) => (
                  <FormItem>
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
                render={({ field }) => (
                  <FormItem className="ml-5">
                    <FormLabel>ユーザ名</FormLabel>
                    <FormControl>
                      <Label>{userContext.user.name}</Label>
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
                  <FormItem>
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
                render={({ field }) => (
                  <FormItem  className="ml-5">
                    <FormLabel>プロジェクトメイン名</FormLabel>
                    <FormControl>
                      <Label>{projectContext.project.main_name}</Label>
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
                  <FormItem>
                    <FormLabel>クライアント</FormLabel>
                    <FormControl>
                      <Input placeholder="クライアント" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clinet_person_in_charge"
                render={({ field }) => (
                  <FormItem  className="ml-5">
                    <FormLabel>クライアント担当者名</FormLabel>
                    <FormControl>
                      <Label>{clientContext.client.person_in_charge}</Label>
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
                  <FormItem>
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
              render={({ field }) => (
                <FormItem className="ml-5">
                  <FormLabel>契約名</FormLabel>
                  <FormControl>
                    <Label>{contractContext.contract.name}</Label>
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