"use client"

import React, { createContext, useContext } from "react"

export type UserInfo = {
  uid: string,
  name: string,
}

export type UserContextType = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
  initUser: () => void 
}


export const initialUserContext: UserInfo = { uid: "", name: "" };

export const UserContext = createContext<UserContextType>({ user: initialUserContext, setUser: () => {}, initUser: () => {} })

export const useUserContext = () => {
  const { user, setUser, initUser } = useContext(UserContext);
  return { user, setUser, initUser }
}