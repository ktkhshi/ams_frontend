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

export interface ContractType {
  uid: string
  unit_price: number
  contract_type: number
  lower_hours_a_month: number
  upper_hours_a_month: number
  latest_work_started_at:  Date
  earliest_work_ended_at: Date
  work_hours_a_day: number
  started_on: Date
  ended_on: Date | undefined
  contract_name: string
  note: string
  updated_at: string
  created_at: string
}

export interface CreateContractType {
  accessToken: string
  unit_price: number
  contract_type: number
  lower_hours_a_month: number
  upper_hours_a_month: number
  latest_work_started_at: Date
  earliest_work_ended_at: Date
  work_hours_a_day: number
  started_on: Date
  ended_on: Date | undefined
  contract_name: string
  note: string
}

// 契約一覧取得
export const getContractList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // 契約一覧取得
  const result = await fetchAPI("/api/contract-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, contracts: [] }
  }

  const contracts: ContractType[] = result.data

  return { success: true, contracts }
}

// 契約詳細取得
export const getContractDetail = async ({ contractId }: { contractId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // クライアント詳細取得
  const result = await fetchAPI(`/api/contract-detail/${contractId}`, options)

  if (!result.success) {
    console.error(result.error)
    return { sucess: false,  contract: null }
  }

  const contract: ContractType = result.data

  return { success: true, contract }
}

// 新規契約作成
export const createContract = async ({
  accessToken,
  unit_price,
  contract_type,
  lower_hours_a_month,
  upper_hours_a_month,
  latest_work_started_at,
  earliest_work_ended_at,
  work_hours_a_day,
  started_on,
  ended_on,
  contract_name,
  note,
}: CreateContractType) => {
  const body = JSON.stringify({
    unit_price: unit_price,
    contract_type: contract_type,
    lower_hours_a_month: lower_hours_a_month,
    upper_hours_a_month: upper_hours_a_month,
    latest_work_started_at: format(latest_work_started_at, "HH:mm"),
    earliest_work_ended_at: format(earliest_work_ended_at, "HH:mm"),
    work_hours_a_day: work_hours_a_day,
    started_on: format(started_on, "yyyy-MM-dd"),
    ended_on: ended_on ? format(ended_on as Date, "yyyy-MM-dd") : undefined,
    contract_name: contract_name,
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

  // 新規契約を送信
  const result = await fetchAPI("/api/contracts/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, contract: null }
  }

  const contract: ContractType = await result.data

  return { success: true, contract }
}
