"use server"

// #region 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    return { success: false, error: "API URLが設定せれていません"}
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
// #endregion 共通のAPIリクエスト

// #region アカウント仮登録
interface TemporarySignupProps {
  name: string
  email: string
  password: string
  rePassword: string
}

export const temporarySignup = async ({
  name,
  email,
  password,
  rePassword,
}: TemporarySignupProps) => {
  const body = JSON.stringify({
    name,
    email,
    password,
    re_password: rePassword,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }

  // アカウント仮登録を送信
  const result = await fetchAPI("/api/auth/users/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}
// #endregion アカウント仮登録

// #region アカウント本登録
interface CompleteSignupProps {
  uid: string
  token: string 
}

export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
  const body = JSON.stringify({
    uid,
    token,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,      
  }

  // アカウント本登録を送信
  const result = await fetchAPI("/api/auth/users/activation/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }
  return { success: true }
}
// #endregion アカウント本登録

// #region パスワード再設定
interface ForgotPasswordProps {
  email: string
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  const body = JSON.stringify({
    email,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,      
  }

  // パスワード再設定を送信
  const result = await fetchAPI("/api/auth/users/reset_password/", options)
  
  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }
  return { success: true }
}
// #endregion パスワード再設定

// #region パスワード再設定確認
interface ResetPasswordProps {
  uid: string
  token: string
  newPassword: string
  reNewPassword: string
}

export const resetPassword = async ({
  uid,
  token,
  newPassword,
  reNewPassword,
}: ResetPasswordProps) => {
  const body = JSON.stringify({
    uid,
    token,
    new_password: newPassword,
    re_new_password: reNewPassword,
  })

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,      
  }

  // パスワード再設定確認を送信
  const result = await fetchAPI("/api/auth/users/reset_password_confirm/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}
// #endregion パスワード再設定確認

// #region ユーザ詳細取得
export interface UserDetailType {
  uid: string
  name: string
  email: string
  avatar: string | undefined
  introduction: string
  created_at: string
}

interface GetUserDetailProps {
  uid: string
}

export const getUserDetail = async ({ uid }: GetUserDetailProps) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",      
  }

  // APIからユーザー詳細を取得
  const result = await fetchAPI(`/api/users/${uid}/`, options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, user: null }
  }

  const user: UserDetailType = await result.data

  return { success: true, user }
}
// #endregion ユーザ詳細取得

// #region プロフィール編集
interface UpdateUserProps {
  accessToken: string
  name: string
  introduction: string | undefined
  avatar: string | undefined
}

export const updateUser = async ({
  accessToken,
  name,
  introduction,
  avatar
}: UpdateUserProps) => {
  const body = JSON.stringify({
    name,
    introduction,
    avatar,
  })

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,      
  }

  // プロフィール編集を送信
  const result = await fetchAPI("/api/auth/users/me/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  const user: UserDetailType = await result.data

  return { success: true, user }
}
// #endregion プロフィール編集

// #region パスワード変更
interface UpdatePasswordProps {
  accessToken: string
  currentPassword: string
  newPassword: string
  reNewPassword: string
}

export const updatePassword = async ({
  accessToken,
  currentPassword,
  newPassword,
  reNewPassword,
}: UpdatePasswordProps) => {
  const body = JSON.stringify({
    current_password: currentPassword,
    new_password: newPassword,
    re_new_password: reNewPassword,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,      
  }

  // パスワード変更を送信
  const result = await fetchAPI("/api/auth/users/set_password/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false }
  }

  return { success: true }
}
// #endregion パスワード変更

// #region ユーザ一覧取得
export interface UserType {
  id: string
  name: string
  created_at: string
}


export const getUserList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  }

  // ユーザ一覧取得
  const result = await fetchAPI("/api/user-list/", options)

  if (!result.success) {
    console.error(result.error)
    return { success: false, users: [] }
  }

  const users: UserType[] = result.data

  return { success: true, users }
}
// #endregion ユーザ一覧取得