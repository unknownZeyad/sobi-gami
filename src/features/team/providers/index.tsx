'use client'

import { ReactNode, useLayoutEffect } from 'react'
import TeamSocketProvider from './socket-provider'
import TeamPhasesProvider from './phases-provider'
import TeamInfoProvider from './info-provider'

function TeamProviders({ children }: {
  readonly children: ReactNode
}) {

  return (
    <TeamSocketProvider>
      <TeamPhasesProvider>
        <TeamInfoProvider>
          {children}
        </TeamInfoProvider>
      </TeamPhasesProvider>
    </TeamSocketProvider>
  )
}

export default TeamProviders