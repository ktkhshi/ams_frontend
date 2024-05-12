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

export interface ClientType {
  uid: string
  person_in_charge: string
  address: string
  note: string
  updated_at: string
  created_at: string
}

export interface CreateClientType {
  accessToken: string
  person_in_charge: string
  address: string
  note: string
}

// クライアント一覧取得
export const getClientList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // クライアント一覧取得
  const result = await fetchAPI("/api/client-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, clients: [] }
  }

  const clients: ClientType[] = result.data

  return { success: true, clients }
}

// 新規クライアント
export const createClient = async ({
  accessToken,
  person_in_charge,
  address,
  note,
}: CreateClientType) => {
  const body = JSON.stringify({
    person_in_charge: person_in_charge,
    address: address,
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

  // 新規クライアントを送信
  const result = await fetchAPI("/api/clients/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, client: null }
  }

  const client: ClientType = await result.data

  return { success: true, client }
}
