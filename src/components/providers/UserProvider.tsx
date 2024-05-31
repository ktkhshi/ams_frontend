"use client"

import React from "react"
import { UserContext, UserContextType } from "@/app/context"

type Props = {
  userInfo: UserContextType
  children: React.ReactNode
}

export const UserProvider = ({ userInfo, children }: Props ) => {
  const userContext = UserContext()
  return <userContext.Provider value={userInfo}>{children}</userContext.Provider>
}