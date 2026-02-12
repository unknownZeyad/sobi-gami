import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/core/lib/utils";
import { ReactNode } from "react";

type Props = Omit<HTMLMotionProps<"button">,
  'layout' |
  'initial' |
  'animate' |
  'exit' |
  'whileHover' |
  'whileTap' |
  "transition" |
  "children"
> & {
  readonly children: ReactNode
}

export default function GameButton({ children, className, ...props }: Props) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}

      {...props}
      className={cn(
        "px-20 py-5 rounded-full bg-linear-to-b cursor-pointer from-amber-400 via-yellow-500 to-orange-500 text-gray-900 font-bold text-3xl tracking-wide shadow-[0_8px_30px_rgba(251,191,36,0.5)] hover:shadow-[0_12px_40px_rgba(251,191,36,0.7)] transition-shadow duration-300",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
