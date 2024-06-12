"use client"

import React, { createContext, useContext } from "react"

export type ClientInfo = {
  uid: string,
  person_in_charge: string,
}

export type ClientContextType = {
  client: ClientInfo
  setClient: React.Dispatch<React.SetStateAction<ClientInfo>>
  initClient: () => void 
}

export const initialClientContext: ClientInfo = { uid: "", person_in_charge: "" }

export const ClientContext = createContext<ClientContextType>({ client: initialClientContext, setClient: () => {}, initClient: () => {} })

export const UseClientContext = () => {
  const { client, setClient, initClient } = useContext(ClientContext);
  return { client, setClient, initClient }
}