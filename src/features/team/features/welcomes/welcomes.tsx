import WelcomingVideos from '@/core/components/derived/welcoming-videos'
import { useState } from 'react'
import TeamWelcome from './team-welcome'
import { AnimatePresence } from 'motion/react'
import { useTeamInfo } from '../../providers/info-provider'

function Welcomes() {
  const [finsihedWelcomingVids, setFinishedWelcomingVids] = useState<boolean>(false)
  const { teamInfo } = useTeamInfo()

  return (
    <AnimatePresence mode='wait'>
      {!finsihedWelcomingVids && <WelcomingVideos muted onEnd={() => setFinishedWelcomingVids(true)} />}
      {finsihedWelcomingVids && <TeamWelcome />}
    </AnimatePresence>
  )
}

export default Welcomes