import EnterExit from '@/core/components/derived/enter-exit'
import { motion } from 'motion/react'

function Draw() {
  return (
    <EnterExit>
      <div
        className="w-screen h-screen flex flex-col"
        style={{
          backgroundImage: `url('/assets/images/winner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.img
          src="/assets/images/Sobi-Fantasy-Game-Logo.webp"
          alt="logo image"
          className="absolute w-[200px] object-cover top-4 right-8 z-10 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]"
          initial={{ opacity: 0, scale: 0.3, rotate: -15, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        />

        <div className="flex items-center justify-center w-full h-full px-16">
          <p className='text-white text-8xl italic mt-28 font-bold drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]'>GAME DRAW</p>
        </div>
      </div>
    </EnterExit>
  )
}

export default Draw