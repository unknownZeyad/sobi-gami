import WelcomingVideos from '@/core/components/derived/welcoming-videos'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Explain from './explain'

function Welcome() {
  const [finsihedWelcomingVids, setFinishedWelcomingVids] = useState<boolean>(false)

  return (
    <AnimatePresence mode='wait'>
      {!finsihedWelcomingVids && <WelcomingVideos onEnd={() => setFinishedWelcomingVids(true)} />}
      {finsihedWelcomingVids && <Explain />}
    </AnimatePresence>
  )
}

export default Welcome