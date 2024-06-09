"use server"

import { UserType } from "@/lib/nextauth"
import { ProjectType } from "./project"
import { ClientType } from "./client"
import { ContractType } from "./contract"
import { array } from "zod"

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return { success: false, error: "API URLが設定されていません"}
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, options)

    if (!response.ok) {
      return { success: false, error: "APIでエラーが発生しました" }
    }

    // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return { success: true, data }
    }

    // データなしで成功を返す
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "ネットワークエラーが発生しました" }
  }
}

export interface ReadUserOnProjectType {
  uid: string
  user_name: string
  project_name: string
  person_in_charge: string
  contract_name: string
  updated_at: string
  created_at: string
}

export interface CreateUserOnProjectType {
  accessToken: string
  user_id: number
  project_uid: string
  client_uid: string
  contract_uid: string
}

// ユーザプロジェクト一覧取得
export const getUserOnProjectList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザプロジェクト一覧取得
  const result = await fetchAPI("/api/useronproject-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, useronprojects: [] }
  }

  let array = new Array<ReadUserOnProjectType>()

  result.data.forEach((element: 
    { uid: string; 
      user: { name: string }; 
      project: { main_name: string }; 
      client: { person_in_charge: string }; 
      contract: { contract_name: string };
      updated_at: string;
    }) => {
    let data = {} as ReadUserOnProjectType
    data.uid = element.uid
    data.user_name = element.user.name
    data.project_name = element.project.main_name
    data.person_in_charge = element.client.person_in_charge
    data.contract_name = element.contract.contract_name
    data.updated_at = element.updated_at
    array.push(data)
  })

  const useronprojects: ReadUserOnProjectType[] = array

  return { success: true, useronprojects }
}

// 新規ユーザプロジェクト
export const createUserOnProject = async ({
  accessToken,
  user_id,
  project_uid,
  client_uid,
  contract_uid,
}: CreateUserOnProjectType) => {
  const body = JSON.stringify({
    user_id: user_id,
    project_uid: project_uid,
    client_uid: client_uid,
    contract_uid: contract_uid,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  console.log(options)
  // 新規ユーザプロジェクトを送信
  const result = await fetchAPI("/api/useronprojects/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, useronproject: null }
  }

  const useronproject: ReadUserOnProjectType = await result.data

  return { success: true, useronproject }
}
