import React from 'react'
import { motion } from 'motion/react'
import EnterExit from '../derived/enter-exit'
import backgroundImg from '@public/assets/images/background_Img.png'

function ContentLayout({ children, personSrc, backgroundVideoSrc }: { children: React.ReactNode, personSrc?: string, backgroundVideoSrc?: string }) {
  return (
    <EnterExit>
      <div
        className="p-16 min-h-screen flex items-center w-full bg-cover bg-center bg-no-repeat overflow-hidden relative"
        style={{ backgroundImage: backgroundVideoSrc ? undefined : `url(${backgroundImg.src})` }}
      >
        {backgroundVideoSrc && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={backgroundVideoSrc}
            autoPlay
            playsInline
            muted
            preload="auto"
          />
        )}
        {/* Logo with bounce + glow effect */}
        <motion.img
          src='/assets/images/Sobi-Fantasy-Game-Logo.webp'
          alt='logo image'
          className='absolute w-[200px] object-cover top-4 right-8 z-10 scale-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]'
          initial={{ opacity: 0, scale: 0.3, rotate: -15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        />

        <div className='w-full h-2/3 min-h-[500px] gap-12 flex items-center justify-between md:w-[85%] mx-auto relative z-10'>
          <div className='w-1/4'>
            {personSrc && (
              <motion.img
                src={personSrc}
                width={400}
                height={600}
                alt='person image'
                className='object-contain drop-shadow-2xl rounded-bl-[36px] rounded-br-[36px]'
                initial={{ opacity: 0, x: -100, scale: 0.8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                  delay: 0.4
                }}
              />
            )}
          </div>

          <motion.div
            className="h-full flex items-center justify-center w-3/4"
            initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15,
              delay: 0.6
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </EnterExit>
  )
}

export default ContentLayout