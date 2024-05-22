"use server"

import { UserType } from "@/lib/nextauth"
import { ProjectType } from "./project"
import { ContractType } from "./contract"

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

export interface UserOnProjectType {
  uid: string
  user: UserType
  project: ProjectType
  client: ClientTypes
  contract: ContractType
  updated_at: string
  created_at: string
}

export interface CreateUserOnProjectType {
  accessToken: string
  user_uid: string
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

  const useronprojects: UserOnProjectType[] = result.data

  return { success: true, useronprojects }
}

// 新規ユーザプロジェクト
export const createUserOnProject = async ({
  accessToken,
  user_uid,
  project_uid,
  client_uid,
  contract_uid,
}: CreateUserOnProjectType) => {
  const body = JSON.stringify({
    user_uid: user_uid,
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

  // 新規ユーザプロジェクトを送信
  const result = await fetchAPI("/api/useronprject/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, useronproject: null }
  }

  const useronproject: UserOnProjectType = await result.data

  return { success: true, useronproject }
}
