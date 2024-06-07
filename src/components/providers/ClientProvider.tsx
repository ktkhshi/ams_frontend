"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { ClientContext, initialClientContext, ClientContextType, ClientInfo } from "@/components/contexts/ClientContext"

const storageDataKeyName = 'local_storage_client_key'

export const ClientContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [ client, setClient ] = useState<ClientInfo>(initialClientContext)

  const init = () => {
    const storedData = window.localStorage.getItem(storageDataKeyName)

    if (storedData) {
      setClient(JSON.parse(storedData))
    }
  }

  const initData = () => {
    localStorage.removeItem(storageDataKeyName)
    setClient({ uid: "", person_in_charge: "" })
  }

  const storeData = (client: ClientInfo) => {
    setClient(client)
    window.localStorage.setItem(storageDataKeyName, JSON.stringify(client))
  }

  useEffect(() => {
    init()
  }, [])

  const value: ClientContextType = {
    client,
    setClient: () => { storeData(client) },
    initClient: initData,
  }

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}