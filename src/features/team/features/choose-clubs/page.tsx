"use client";

import ContentLayout from "@/core/components/layout/content-layout";
import Image from "next/image";
import { useState } from "react";
import person from '@public/assets/images/person.png'
import chooseYourTeamImg from '@public/assets/images/choose_your_team.jpg'
import { useTeamInfo } from "../../providers/info-provider";
import { useTeamSocket } from "../../providers/socket-provider";

import holdPopupImg from "@public/assets/images/SFG-Pop up Msg's-webp_Artboard 3.webp"
import { cn } from "@/core/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { HoldDialog } from "../main-questions/hold-dialog";

export default function ChooseClubs({ hold, otherTeamClub, clubs }: { hold: boolean, otherTeamClub: number | null, clubs: Club[] | null }) {
    const { teamInfo, setTeamInfo } = useTeamInfo();
    const [currId, setCurrId] = useState<number | null>(null);
    const { socket } = useTeamSocket();
    const choosenClubId = teamInfo?.choosen_club?.id;
    const [selectedHold, setSelectedHold] = useState<boolean>(false);
    const displayedClubs = clubs?.map(c => ({
        ...c,
        logo: c.card_img_url
    })) || [];

    const didChoose = Boolean(teamInfo?.choosen_club?.id);
    const canConfirm = currId !== null && currId !== choosenClubId;


    const handleConfirm = () => {
        setTeamInfo(prev => ({
            ...prev,
            choosen_club: clubs?.find(c => c.id === currId) || null
        }))
        socket?.send(JSON.stringify({
            event: 'choose_club',
            data: { club_id: currId }
        }))
        setSelectedHold(true)
    };

    return (
        <>
            <ContentLayout personSrc={person.src}>

                <div className='flex-1 flex-col w-full h-full'>
                    <div className="relative w-full">
                        <img src='/assets/images/speed-question/header-empty.webp' className='w-full' />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold italic tracking-widest uppercase">
                                Choose a Team
                            </h1>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <img src='/assets/images/speed-question/body.webp' className='object-contain w-full' />

                        <div className='absolute inset-0 flex flex-col justify-center items-center'>
                            <div className='flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in duration-500'>
                                {/* Club Cards Grid with staggered animation */}
                                <div className='grid p-8 grid-cols-4 gap-6 mb-1.25 mt-10'>
                                    {displayedClubs.map((team) => {
                                        const isLocked = otherTeamClub === team.id && choosenClubId !== team.id;
                                        const isSelected = currId === team.id;
                                        const isChoosenClub = choosenClubId === team.id;

                                        const isDisabled = isLocked || hold || isChoosenClub;

                                        return (
                                            <motion.button
                                                disabled={didChoose}
                                                key={team.id}
                                                onClick={() => !isDisabled && setCurrId(team.id)}
                                                className={cn(
                                                    "relative cursor-pointer",
                                                    isLocked && "opacity-40 grayscale blur-[1px] pointer-events-none",
                                                    hold && "opacity-40 grayscale brightness-50 pointer-events-none",
                                                    isChoosenClub && "pointer-events-none"
                                                )}
                                                initial={{ opacity: 0, y: 50, scale: 0.5, rotateY: 90 }}
                                                animate={{
                                                    opacity: isLocked ? 0.4 : 1,
                                                    y: 0,
                                                    scale: isSelected ? 1.1 : 1,
                                                    rotateY: 0
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 80,
                                                    damping: 12,
                                                }}
                                                whileHover={!isDisabled ? {
                                                    scale: 1.05,
                                                    rotateY: 10,
                                                    transition: { type: 'spring', stiffness: 400 }
                                                } : undefined}
                                                whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                                            >
                                                <motion.div
                                                    className='rounded-xl mb-3 relative'
                                                >
                                                    <img
                                                        src={team.logo}
                                                        alt={`${team.name} logo`}
                                                        className='object-contain rounded-2xl w-full'
                                                    />
                                                    {/* Overlay for choosen club */}
                                                    {isChoosenClub && (
                                                        <>
                                                            {/* Black overlay */}
                                                            <div className="absolute inset-0 rounded-xl z-20" style={{
                                                                background: 'rgba(0,0,0,0.85)',
                                                                mixBlendMode: 'multiply'
                                                            }}></div>
                                                            {/* TAKEN badge */}
                                                            <AnimatePresence>
                                                                <motion.div
                                                                    className="absolute inset-0 flex items-center justify-center z-30"
                                                                    initial={{ opacity: 0, scale: 0 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    exit={{ opacity: 0, scale: 0 }}
                                                                    transition={{ type: 'spring', stiffness: 200 }}
                                                                >
                                                                    <motion.div
                                                                        className="bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter border border-white/20 backdrop-blur-sm"
                                                                        animate={{ scale: [1, 1.05, 1] }}
                                                                        transition={{ duration: 2, repeat: Infinity }}
                                                                    >
                                                                        TAKEN
                                                                    </motion.div>
                                                                </motion.div>
                                                            </AnimatePresence>
                                                        </>
                                                    )}
                                                </motion.div>

                                                {/* Selection Arrow */}
                                                <AnimatePresence>
                                                    {isSelected && (
                                                        <motion.div
                                                            className='absolute -top-6 left-1/2 transform rotate-180 -translate-x-1/2 z-10'
                                                            initial={{ opacity: 0, y: -20, scale: 0 }}
                                                            animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
                                                            exit={{ opacity: 0, y: -20, scale: 0 }}
                                                            transition={{
                                                                opacity: { duration: 0.2 },
                                                                y: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
                                                                scale: { type: 'spring', stiffness: 300 }
                                                            }}
                                                        >
                                                            <div className='w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-b-16 border-b-green-500 drop-shadow-xl'></div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Locked Badge */}
                                                <AnimatePresence>
                                                    {isLocked && (
                                                        <motion.div
                                                            className="absolute inset-0 flex items-center justify-center z-20"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0 }}
                                                            transition={{ type: 'spring', stiffness: 200 }}
                                                        >
                                                            <motion.div
                                                                className="bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter border border-white/20 backdrop-blur-sm"
                                                                animate={{ scale: [1, 1.05, 1] }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                            >
                                                                TAKEN
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Hold Popup Overlay */}
                                <AnimatePresence>
                                    {hold && (
                                        <motion.div
                                            className="absolute inset-0 z-50 flex items-center justify-center p-8 pointer-events-none bg-black/40 backdrop-blur-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                                exit={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                                                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                                            >
                                                <Image
                                                    src={holdPopupImg}
                                                    width={500}
                                                    height={300}
                                                    alt="Waiting for turn"
                                                    className="object-contain drop-shadow-2xl"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Confirm Button */}
                                <AnimatePresence>
                                    {(!hold && !didChoose) && (
                                        <motion.div
                                            className='flex justify-center'
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
                                        >
                                            <motion.button
                                                type="button"
                                                onClick={handleConfirm}
                                                disabled={!canConfirm || hold || didChoose}
                                                className={cn(
                                                    "relative z-10 px-20 py-3 rounded-full text-white font-bold text-lg cursor-pointer border-2 border-amber-400",
                                                    (!canConfirm ? 'bg-gray-600 cursor-not-allowed opacity-50 font-normal italic' : 'bg-linear-to-r from-green-400 to-green-500 shadow-xl')
                                                )}
                                                whileHover={canConfirm ? {
                                                    scale: 1.05,
                                                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
                                                    transition: { type: 'spring', stiffness: 400 }
                                                } : undefined}
                                                whileTap={canConfirm ? { scale: 0.95 } : undefined}
                                                animate={canConfirm ? {
                                                    boxShadow: [
                                                        '0 4px 20px rgba(34, 197, 94, 0.3)',
                                                        '0 4px 40px rgba(34, 197, 94, 0.6)',
                                                        '0 4px 20px rgba(34, 197, 94, 0.3)'
                                                    ]
                                                } : {}}
                                                transition={canConfirm ? { duration: 1.5, repeat: Infinity } : {}}
                                            >
                                                <span className="relative z-10">
                                                    Confirm
                                                </span>
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <img src='/assets/images/speed-question/footer.webp' className='object-contain w-full' />
                </div>
            </ContentLayout>
            <AnimatePresence>
                {selectedHold && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 1, duration: 0.4, type: 'spring', stiffness: 120 } }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        style={{ position: 'fixed', inset: 0, zIndex: 100 }}
                    >
                        <HoldDialog />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
