"use server"

import { UserType } from "@/lib/nextauth"
import { format } from "date-fns"

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

export interface AttendanceType {
  id: number
  attendance_name: string
  sort_order: number
}

export const getAttendanceTypeList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザ特別勤務一覧取得
  const result = await fetchAPI("/api/attendancetype-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, attendancetypes: [] }
  }

  const attendancetypes: AttendanceType[] = result.data

  return { success: true, attendancetypes }
}

export interface UserSpecialAttendanceType {
  uid: string
  user: UserType
  date_day: string
  attendance_type: number
  note: string
  updated_at: string
  created_at: string
}

export interface CreateUserSpecialAttendanceType {
  accessToken: string
  date_day: Date
  attendance_type: number
  note: string
}

// ユーザ特別勤務一覧取得
export const getUserSpecialAttendanceList = async ({ userUid }: { userUid: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザ特別勤務一覧取得
  const result = await fetchAPI(`/api/userspecialattendance-list/${userUid}`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, userspecialattendances: [] }
  }

  const userspecialattendances: UserSpecialAttendanceType[] = result.data

  return { success: true, userspecialattendances }
}

// 新規ユーザ特別勤務作成
export const createUserSpecialAttendance = async ({
  accessToken,
  date_day,
  attendance_type,
  note
}: CreateUserSpecialAttendanceType) => {
  const body = JSON.stringify({
    date_day: format(date_day, "yyyy-MM-dd"),
    attendance_type: attendance_type,
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

  // 新規ユーザ特別勤を送信
  const result = await fetchAPI("/api/userspecialattendances/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, userspecialattendance: null }
  }

  const userspecialattendance: UserSpecialAttendanceType = await result.data

  return { success: true, userspecialattendance }
}
