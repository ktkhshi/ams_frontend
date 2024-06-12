"use client"

import React, { createContext, useContext } from "react"

export type ProjectInfo = {
  uid: string,
  main_name: string,
}

export type ProjectContextType = {
  project: ProjectInfo
  setProject: React.Dispatch<React.SetStateAction<ProjectInfo>>
  initProject: () => void 
}

export const initialProjectContext: ProjectInfo = { uid: "", main_name: "" }

export const ProjectContext = createContext<ProjectContextType>({ project: initialProjectContext, setProject: () => {}, initProject: () => {} })

export const UseProjectContext = () => {
  const { project, setProject, initProject } = useContext(ProjectContext);
  return { project, setProject, initProject }
}