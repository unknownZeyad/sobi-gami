import { parse } from '@/core/lib/utils'
import React, { useEffect, useState } from 'react'
import { useAdminSocket } from '../../providers/admin-socket-provider'
import SpeedIntro from './speed-intro'
import EnterExit from '@/core/components/derived/enter-exit'
import SpeedCard from '@/core/components/derived/speed-card'
import GameButton from '@/core/components/derived/game-button'
import ContentLayout from '@/core/components/layout/content-layout'
import SpeedWinnerCard from '@/core/components/derived/speed-winner-card'
import { AnimatePresence } from 'motion/react'
import person from '@public/assets/images/person.png'
import { useAdminPhases } from '../../providers/admin-phases-provider'
import { useAudio } from '@/core/providers/audio-provider'
import { useAdminData } from '../../providers/admin-data-provider'

function SpeedQuestion() {
  const { socket } = useAdminSocket()
  const { speedQuestion, speedQuestionWinner } = useAdminData()
  const { stopAudio, playAudio } = useAudio()

  function handleNext() {
    socket?.send(JSON.stringify({ event: 'start_choosing_clubs' }))
    stopAudio()
  }

  useEffect(() => {
    if (speedQuestion && !speedQuestionWinner) {
      setTimeout(() => {
        playAudio(speedQuestion.question.audio_url)
      }, 1500);
    }
  }, [])

  return (
    <AnimatePresence mode='wait'>
      {(speedQuestion && !speedQuestionWinner) && (
        <EnterExit key='card'>
          <SpeedCard
            deliveryDate={speedQuestion.date}
            interactive={false}
            answers={speedQuestion.question.answers}
            question={speedQuestion.question.question}
          />
        </EnterExit>
      )}
      {speedQuestionWinner && (
        <EnterExit key='winner'>
          <ContentLayout personSrc={person.src}>
            <div className='flex flex-col pt-23 items-center gap-4'>
              <SpeedWinnerCard winner={speedQuestionWinner} />
              <GameButton
                className='ml-auto mt-3'
                onClick={handleNext}
              >Next</GameButton>
            </div>
          </ContentLayout>
        </EnterExit>
      )}
    </AnimatePresence>
  )
}

export default SpeedQuestion