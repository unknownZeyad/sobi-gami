import { cn } from '@/core/lib/utils'
import { HTMLMotionProps, motion } from 'motion/react'

function EnterExit(props: Omit<HTMLMotionProps<"div">, 'inital' | 'animate' | 'exit' | 'transition'>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      {...props}
      className={cn("w-full h-screen bg-black relative flex items-center justify-center", props.className)}
    />
  )
}

export default EnterExit