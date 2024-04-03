"use server"

interface TemporarySignupProps {
  name: string
  email: string
  password: string
  rePassword: string
}

// アカウント仮登録
export const temporarySignup = async ({
  name,
  email,
  password,
  rePassword,
}: TemporarySignupProps) => {
  try {
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password: rePassword,
    })

    // アカウント仮登録を送信
    const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })

    // APIレスポンスが正常ではない場合、失敗を返す
    if (!apiRes.ok) {
      return {
        success: false,
      }
    }

    // 成功を返す
    return {
      success: true,
    }
  } catch (error) {
    console.error(error)
    // エラー発生時に、失敗を返す
    return {
      success: false,
    }
  }
}

interface CompleteSignupProps {
  uid: string
  token: string 
}

// アカウント本登録
export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
  try {
    const body = JSON.stringify({
      uid,
      token,
    })

    // アカウント本登録を送信
    const apiRes = await fetch(
      `${process.env.API_URL}/api/auth/users/activation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    )

    // APIレスポンスが正常ではない場合、失敗を返す
    if (!apiRes.ok) {
      return {
        success: false,
      }
    }

    // 成功を返す
    return {
      success: true,
    }
  } catch (error) {
    console.error(error)
    // エラー発生時に、失敗を返す
    return {
      success: false,
    }
  }
}

interface ForgotPasswordProps {
  email: string
}

// パスワード再設定
export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
 try {
    const body = JSON.stringify({
      email,
    })

    // パスワード再設定を送信
    const apiRes = await fetch(
      `${process.env.API_URL}/api/auth/users/reset_password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    )
    
    // APIレスポンスが正常ではない場合、失敗を返す
    if (!apiRes.ok) {
      return {
        success: false,
      }
    }

    // 成功を返す
    return {
      success: true
    }
  } catch (error) {
    console.error(error)
    // エラー発生時に、失敗を返す
    return {
      success: false,
    }
  }
}