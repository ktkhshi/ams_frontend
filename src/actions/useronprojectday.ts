"use server"

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

export interface UserOnProjectTimeType {
  uid: string
  time_index: number
  work_started_at: string
  work_ended_at: string
  rest_started_at: string
  rest_ended_at: string
  private_note: string
  public_note: string
  created_at: string
  updated_at: string
}

export interface UserOnProjectDayType {
  uid: string
  day_index: number
  date_day: string
  should_work_day: boolean
  work_started_at: string | null
  work_ended_at: string | null
  rest_hours: string
  private_note: string
  public_note: string
  updated_at: string
  created_at: string
  times: UserOnProjectTimeType[]
}

interface GetUserOnProjectDayDetailProps {
  uid: string
}

// ユーザプロジェクト勤務日詳細取得
export const getUserOnProjectDayDetail = async ({ uid }: GetUserOnProjectDayDetailProps) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザプロジェクト勤務日詳細取得
  const result = await fetchAPI(`/api/useronprojectday/${uid}`, options)

  if (!result.success) {
    console.error(result.error)
    return { sucess: false, day: null }
  }

  const day: UserOnProjectDayType = result.data

  return { success: true, day }
}

export interface CreateUserOnProjectTimeType {
  time_index: number
  work_started_at: string
  work_ended_at: string
  rest_started_at: string
  rest_ended_at: string
  private_note: string
  public_note: string
}

export interface CreateUserOnProjectDayType {
  accessToken: string
  uid: string
  work_started_at: string
  work_ended_at: string
  rest_hours: string
  times: CreateUserOnProjectTimeType[]
}

// ユーザプロジェクト勤務日詳細作成
export const createUserOnProjectDayDetail = async ({
  accessToken,
  uid,
  work_started_at,
  work_ended_at,
  rest_hours,
  times,
}: CreateUserOnProjectDayType) => {
  const body = JSON.stringify({
    uid: uid,    
    work_started_at: work_started_at,
    work_ended_at: work_ended_at,
    rest_hours: rest_hours,
    times: times,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  // 新規契約を送信
  const result = await fetchAPI(`/api/useronprojectday/update/${uid}`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, uopd: null }
  }

  const uopd: UserOnProjectDayType = await result.data

  return { success: true, uopd }
}