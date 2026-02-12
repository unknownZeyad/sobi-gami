'use client'

import { createContext, useContext, useState } from 'react'
import { cn } from '@/core/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import CountdownTimer from '../ui/counter'
import ContentLayout from '../layout/content-layout'

const Context = createContext<{
    onAnswer: (ansId: number) => void,
    answered: boolean,
    interactive: boolean
}>({
    interactive: true,
    answered: false,
    onAnswer: () => { }
})

import person from '@public/assets/images/person.png'

export default function SpeedCard({ answers, interactive = true, question, onAnswer, deliveryDate }: {
    question: string,
    onAnswer?: (ansId: number) => void
    interactive?: boolean,
    answers: {
        is_correct: boolean,
        answer: string,
        id: number
    }[],
    deliveryDate: number,
}) {
    const [answered, setAnswered] = useState<boolean>(false)

    function handleAnswer(ansId: number) {
        onAnswer?.(ansId)
        setAnswered(true)
    }

    const remainingSeconds = Math.max(Math.ceil((30_000 - (Date.now() - deliveryDate)) / 1000), 0);

    return (
        <Context.Provider value={{
            interactive,
            answered,
            onAnswer: handleAnswer
        }}>
            <ContentLayout personSrc={person.src}>
                <div className='flex-1 flex-col w-full h-full'>
                    <img src='/assets/images/speed-question/header.webp' className='w-full' />
                    <div className="relative w-full">
                        <img src='/assets/images/speed-question/body.webp' className='object-contain w-full' />

                        <div className='absolute inset-0 flex flex-col justify-center items-center'>
                            <div className='flex gap-2 px-3 items-center'>
                                <CountdownTimer
                                    onComplete={() => setAnswered(true)}
                                    initialSeconds={remainingSeconds}
                                    width={120}
                                    height={120}
                                    paused={answered}
                                />
                                <p className='pt-3 text-3xl font-bold w-[80%] text-center text-white uppercase'>{question}</p>
                            </div>
                            <div className='grid grid-cols-2 gap-10 mt-7 w-[80%]'>
                                {answers.map((curr) => (
                                    <Answer answer={curr} key={curr.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <img src='/assets/images/speed-question/footer.webp' className='object-contain w-full' />
                </div>
            </ContentLayout>
        </Context.Provider>
    )
}


function Answer({
    answer
}: {
    answer: SpeedQuestion['answers'][number]
}) {
    const { interactive, answered, onAnswer } = useContext(Context)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const handleAns = () => {
        if (answer.is_correct) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        onAnswer(answer.id)
    }

    return (
        <button
            disabled={answered || !interactive}
            onClick={handleAns}
            className={
                cn(
                    'w-full relative border-amber-400/80 border-r flex h-[60px] bg-black/35',
                    (!answered && interactive) && 'hover:scale-105 duration-150 cursor-pointer',
                    answered && 'border-white/70',
                    isCorrect === false && 'border-red-500/80',
                    isCorrect === true && 'border-green-500/80',
                )}
        >
            <div className={cn(
                'text-amber-400 w-[60px] h-full bg-white font-bold flex items-center justify-center text-5xl',
                answered && 'text-zinc-600',
                isCorrect === false && 'text-red-600',
                isCorrect === true && 'text-green-600'
            )}>
                {answer.id}
            </div>
            <div className={cn(
                'h-full from-amber-500/60 uppercase via-amber-500/35 to-amber-500/5 bg-linear-90 text-xl font-medium flex-1 text-white p-3 flex items-center',
                answered && 'from-white/30 via-white/20 to-white/10',
                isCorrect === false && 'from-red-500/40 via-red-500/15 to-red-500/5',
                isCorrect === true && 'from-green-500/40 via-green-500/15 to-green-500/5',
            )}>
                {answer.answer}
            </div>
            <AnimatePresence>
                {isCorrect !== null && (
                    <motion.div
                        className={cn(
                            'h-full absolute top-0 flex items-center justify-center right-0 translate-x-1/2 aspect-square p-2 rounded-full',
                            isCorrect === false && 'bg-red-500 text-white',
                            isCorrect === true && 'bg-green-500 text-white',
                        )}>
                        {isCorrect ? <Check className='w-10 h-10' /> : <X className='w-10 h-10' />}
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}

