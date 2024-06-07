"use client"

import React, {ReactNode, useEffect, useState } from "react"
import { ContractContext, initialContractContext, ContractContextType, ContractInfo } from "@/components/contexts/ContractContext"

const storageDataKeyName = 'local_storage_contract_key'

export const ContractContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [ contract, setContract ] = useState<ContractInfo>(initialContractContext)


  const init = () => {
    const storedData = window.localStorage.getItem(storageDataKeyName)

    if (storedData) {
      setContract(JSON.parse(storedData))
    }
  }

  const initData = () => {
    localStorage.removeItem(storageDataKeyName)
    setContract({ uid: "", name: "" })
  }

  const storeData = (contract: ContractInfo) => {
    setContract(contract)
    window.localStorage.setItem(storageDataKeyName, JSON.stringify(contract))
  }

  useEffect(() => {
    init()
  }, [])

  const value: ContractContextType = {
    contract,
    setContract: () => { storeData(contract) },
    initContract: initData,
  }

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}
