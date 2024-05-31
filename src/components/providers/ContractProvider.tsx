"use client"

import React from "react"
import { ContractContext, ContractContextType } from "../../app/context"

type Props = {
  contractInfo: ContractContextType
  children: React.ReactNode
}

export const ContractProvider = ({ contractInfo, children }: Props ) => {
  const contractContext = ContractContext()
  return <contractContext.Provider value={contractInfo}>{children}</contractContext.Provider>
}
