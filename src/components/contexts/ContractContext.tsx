"use client"

import React, { createContext, useContext } from "react"

export type ContractInfo = {
  uid: string,
  name: string,
}

export type ContractContextType = {
  contract: ContractInfo
  setContract: React.Dispatch<React.SetStateAction<ContractInfo>>
  initContract: () => void 
}

export const initialContractContext: ContractInfo = { uid: "", name: "" };

export const ContractContext = createContext<ContractContextType>({ contract: initialContractContext, setContract: () => {}, initContract: () => {} })

export const UseContractContext = () => {
  const { contract, setContract, initContract } = useContext(ContractContext);
  return { contract, setContract, initContract }
}
