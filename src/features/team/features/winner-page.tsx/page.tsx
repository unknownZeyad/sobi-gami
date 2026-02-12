"use client";

import { motion } from "motion/react";
import { useTeamInfo } from "../../providers/info-provider";
import EnterExit from "@/core/components/derived/enter-exit";

export default function WinnerPage() {
    const { winner } = useTeamInfo();

    if (!winner) return null;
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

                <div className="flex items-center justify-around w-full h-full px-16">
                    <motion.div
                        className="flex flex-col-reverse justify-center items-center gap-8"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {winner.club?.logo_img_url && (
                            <img
                                src={winner.club?.logo_img_url}
                                alt={winner.club?.name}
                                className="w-40 h-40 object-contain"
                            />
                        )}
                        <div>
                            <p className="text-5xl font-normal text-white mb-2 text-center">
                                TEAM
                            </p>
                            <p className="text-7xl font-extrabold text-white text-center">
                                {winner.club?.name}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center text-white"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <p className="text-4xl font-bold mb-4">SCORE</p>
                        <div className="text-9xl font-bold italic bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-300 text-transparent bg-clip-text">
                            {winner.score}
                        </div>
                        <p className="text-xl font-bold mt-4">TOTAL POINTS</p>
                    </motion.div>
                </div>
            </div>
        </EnterExit>
    );
}
