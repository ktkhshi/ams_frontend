"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { ProjectContext, initialProjectContext, ProjectContextType, ProjectInfo } from "@/components/contexts/ProjectContext"

const storageDataKeyName = 'local_storage_project_key'

export const ProjectContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [ project, setProject ] = useState<ProjectInfo>(initialProjectContext)

  const init = () => {
    const storedData = window.localStorage.getItem(storageDataKeyName)

    if (storedData) {
      setProject(JSON.parse(storedData))
    }
  }

  const initData = () => {
    localStorage.removeItem(storageDataKeyName)
    setProject({ uid: "", main_name: "" })
  }

  const storeData = (project: ProjectInfo): void => {
    setProject(project)
    window.localStorage.setItem(storageDataKeyName, JSON.stringify(project))
  }

  useEffect(() => {
    init()
  }, [])

  const value: ProjectContextType = {
    project,
    setProject: () => { storeData(project) },
    initProject: initData,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}