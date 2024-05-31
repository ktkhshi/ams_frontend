"use client"

import React from "react"
import { ClientContext, ClientContextType } from "../../app/context"

type Props = {
  clientInfo: ClientContextType
  children: React.ReactNode
}

export const ClientProvider = ({ clientInfo, children }: Props ) => {
  const clientContext = ClientContext()
  return <clientContext.Provider value={clientInfo}>{children}</clientContext.Provider>
}