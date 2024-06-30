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

export interface ReadUserOnProjectDayType {
  uid: string
  day_index: number
  date_day: string
  should_work_day: boolean
  work_started_at: string | null
  work_ended_at: string | null
  rest_hours: string | null
  private_note: string
  public_note: string
  updated_at: string
  created_at: string
  month: string
}

export interface UserOnProjectMonthType {
  uid: string
  adjusted_hours: number
  private_note: string
  public_note: string
  updated_at: string
  created_at: string
  days: ReadUserOnProjectDayType[]
}

interface GetUserOnProjectMonthDetailProps {
  userUid: string
  date_ym: string
  projectUid: string
}

// ユーザプロジェクト勤務月詳細取得
export const getUserOnProjectMonthDetail = async ({ userUid, date_ym, projectUid }: GetUserOnProjectMonthDetailProps) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザプロジェクト勤務月詳細取得
  const result = await fetchAPI(`/api/useronprojectmonth/${userUid}/${date_ym}/${projectUid}`, options)

  if (!result.success) {
    console.error(result.error)
    return { sucess: false, month: null }
  }

  const month: UserOnProjectMonthType = result.data

  return { success: true, month }
}