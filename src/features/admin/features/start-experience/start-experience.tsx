"use client";

import { motion } from "motion/react";
import EnterExit from "@/core/components/derived/enter-exit";
import { useAdminSocket } from "../../providers/admin-socket-provider";
import { useEffect, useState } from "react";
import { parse } from "@/core/lib/utils";

export default function StartExperince() {
  const { socket } = useAdminSocket()
  const [canStart, setCanStart] = useState<boolean>(false)

  useEffect(() => {
    socket?.addEventListener('message', ({ data }) => {
      const parsed = parse<ServerAdminMessage>(data)
      if (parsed.event === 'can_start') setCanStart(true)
    })
  }, [socket])

  const handleClick = () => {
    socket?.send(JSON.stringify({
      event: 'start_experience'
    }))
  };

  return (
    <EnterExit>
      <motion.button
        initial={{
          opacity: 0,
          scale: 0.75,
          y: 28,
          filter: "blur(18px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: -18,
          filter: "blur(12px)",
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          filter: { duration: 0.45 },
        }}
        whileHover={{
          scale: 1.04,
          y: -2,
          boxShadow:
            "0 0 0 1px rgba(180,180,180,0.25), 0 18px 40px rgba(0,0,0,0.8)",
        }}
        whileTap={{ scale: 0.96, y: 1 }}
        onClick={handleClick}
        disabled={!canStart}
        className="relative px-16 py-5 uppercase tracking-[0.35em] text-[15px] font-medium text-neutral-300 border border-neutral-600 bg-black cursor-pointer outline-none"
      >
        <span className="pointer-events-none absolute inset-[3px] border border-neutral-700" />
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <span className="relative z-10">Start Experience</span>
      </motion.button>
    </EnterExit>
  );
}
