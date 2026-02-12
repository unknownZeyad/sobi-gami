import EnterExit from '@/core/components/derived/enter-exit'
import SpeedCard from '@/core/components/derived/speed-card'
import { useTeamSocket } from '../../providers/socket-provider'
import ContentLayout from '@/core/components/layout/content-layout'
import SpeedWinnerCard from '@/core/components/derived/speed-winner-card'
import person from '@public/assets/images/person.png'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useAudio } from '@/core/providers/audio-provider'

function SpeedQuestion({
  deliveryDate,
  answers,
  question,
  interactive,
  winner
}: {
  deliveryDate: number,
  answers: {
    is_correct: boolean,
    answer: string,
    id: number
  }[],
  question: string,
  interactive?: boolean,
  winner?: string | null
}) {
  const { socket } = useTeamSocket()

  function onAnswer(ansId: number) {
    socket?.send(JSON.stringify({
      event: 'answer_speed_question',
      data: {
        answer_id: ansId
      }
    }))
  }


  return (
    <AnimatePresence mode='wait'>
      {(question && !winner) && (
        <EnterExit key='speed_question'>
          <SpeedCard
            deliveryDate={deliveryDate}
            answers={answers}
            question={question}
            onAnswer={onAnswer}
            interactive={interactive}
          />
        </EnterExit>
      )}
      {winner && (
        <EnterExit key='winner'>
          <ContentLayout personSrc={person.src}>
            <SpeedWinnerCard winner={winner} />
          </ContentLayout>
        </EnterExit>
      )}
    </AnimatePresence>
  )
}

export default SpeedQuestion