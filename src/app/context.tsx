"use client"

import React, { createContext, useState } from "react"

export type UserInfo = {
  uid: string,
  name: string,
}

export type UserContextType = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
}

export type ProjectInfo = {
  uid: string,
  main_name: string,
}

export type ProjectContextType = {
  project: ProjectInfo
  setProject: React.Dispatch<React.SetStateAction<ProjectInfo>>
}

export type ClientInfo = {
  uid: string,
  person_in_charge: string,
}

export type ClientContextType = {
  client: ClientInfo
  setClient: React.Dispatch<React.SetStateAction<ClientInfo>>
}

export type ContractInfo = {
  uid: string,
  name: string,
}

export type ContractContextType = {
  contract: ContractInfo
  setContract: React.Dispatch<React.SetStateAction<ContractInfo>>
}

export const UserContext = () => {
  const [ user, setUser ] = useState<UserInfo>({ uid: "", name: "" })
  return createContext<UserContextType>({ user: user, setUser: setUser })
}

export const ProjectContext = () => {
  const [ project, setProject ] = useState<ProjectInfo>({ uid: "", main_name: "" })
  return createContext<ProjectContextType>({ project: project, setProject: setProject })
}

export const ClientContext = () => {
  const [ client, setClient ] = useState<ClientInfo>({ uid: "", person_in_charge: "" })
  return createContext<ClientContextType>({ client: client, setClient: setClient })
} 

export const ContractContext = () => {
  const [ contract, setContract ] = useState<ContractInfo>({ uid: "", name: "" })
  return createContext<ContractContextType>({ contract: contract, setContract: setContract })
}

