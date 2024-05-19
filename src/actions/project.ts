"use server"

import { UserType } from "@/lib/nextauth"

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

export interface ProjectType {
  uid: string
  main_name: string
  sub_name: string
  note: string
  updated_at: string
  created_at: string
}

export interface CreateProjectType {
  accessToken: string
  main_name: string
  sub_name: string
  note: string
}

// プロジェクト一覧取得
export const getProjectList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // プロジェクト一覧取得
  const result = await fetchAPI("/api/project-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, projects: [] }
  }

  const projects: ProjectType[] = result.data

  return { success: true, projects }
}

// 新規プロジェクト作成
export const createProject = async ({
  accessToken,
  main_name,
  sub_name,
  note,
}: CreateProjectType) => {
  const body = JSON.stringify({
    main_name: main_name,
    sub_name: sub_name,
    note: note,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // 新規プロジェクトを送信
  const result = await fetchAPI("/api/projects/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, project: null }
  }

  const project: ProjectType = await result.data

  return { success: true, project }
}
