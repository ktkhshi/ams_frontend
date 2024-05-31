"use client"

import React from "react"
import { ProjectContext, ProjectContextType } from "../../app/context"

type Props = {
  projectInfo: ProjectContextType
  children: React.ReactNode
}

export const ProjectProvider = ({ projectInfo, children }: Props ) => {
  const projectContext = ProjectContext()
  return <projectContext.Provider value={projectInfo}>{children}</projectContext.Provider>
}