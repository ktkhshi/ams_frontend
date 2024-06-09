"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { UserContext, initialUserContext, UserContextType, UserInfo } from "@/components/contexts/UserContext"

const storageDataKeyName = 'local_storage_user_key'

export const UserContextProvider = (props: { children: ReactNode } ) => {
  const { children } = props
  const [ user, setUser ] = useState<UserInfo>(initialUserContext)

  const init = () => {
    const storedData = window.localStorage.getItem(storageDataKeyName)

    if (storedData) {
      setUser(JSON.parse(storedData))
    }
  }

  const initData = () => {
    localStorage.removeItem(storageDataKeyName)
    setUser({ id: "", name: "" })
  }

  const storeData = (user: UserInfo) => {
    setUser(user)
    window.localStorage.setItem(storageDataKeyName, JSON.stringify(user))
  }

  useEffect(() => {
    init()
  }, [])

  const value: UserContextType = {
    user,
    setUser: () => { storeData(user) },
    initUser: initData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}