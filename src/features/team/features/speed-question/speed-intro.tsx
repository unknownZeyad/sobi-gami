import EnterExit from '@/core/components/derived/enter-exit'
import { motion } from 'motion/react'

export default function TeamSpeedIntro() {
    return (
        <EnterExit>
            <motion.video
                src="/assets/videos/startSpeedQuestions.mp4"
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                preload="auto"
                initial={{ opacity: 0, scale: 1.05, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
        </EnterExit>
    )
}
