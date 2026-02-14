"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTeamSocket } from "../providers/socket-provider";
import { useTeamPhases } from "../providers/phases-provider";
import Wating from "./wating/wating";
import Welcomes from "./welcomes/welcomes";
import ChooseClubs from "./choose-clubs/page";
import { parse } from "@/core/lib/utils";
import SpeedQuestion from "./speed-question/speed-question";
import { TeamMainQuestions } from "./main-questions/team-questions";
import WinnerPage from "./winner-page.tsx/page";
import TeamSpeedIntro from "./speed-question/speed-intro";
import { useAudio } from "@/core/providers/audio-provider";
import Draw from "./draw/draw";
import { useTeamInfo } from "../providers/info-provider";
import { HoldDialog } from "./main-questions/hold-dialog";

export default function Team() {
    const { setTeamInfo, setQuestions, teamInfo } = useTeamInfo()
    const [question, setQuestion] = useState<SpeedQuestion | null>(null);
    const [deliveryDate, setDeliveryDate] = useState<number>(0);
    const [winnerName, setWinnerName] = useState<string | null>(null);
    const [clubs, setClubs] = useState<Club[] | null>(null);
    const [hold, setHold] = useState(false);
    const [otherTeamClub, setOtherTeamClub] = useState<number | null>(null);
    const [showDrawVideo, setShowDrawVideo] = useState(false);

    const { phase, setPhase } = useTeamPhases();
    const { socket } = useTeamSocket();
    const { team: teamId } = useParams<{ team: string }>();

    const { setWinner } = useTeamInfo()

    useEffect(() => {
        if (!socket) return;

        const onMessage = ({ data }: MessageEvent) => {
            const parsed = parse<ServerTeamMessage>(data);
            console.log(parsed)
            if (parsed.event === "your_team") {
                setTeamInfo((prev) => ({ ...prev, ...parsed.data }));
            }

            if (parsed.event === "experience_started") {
                setPhase("welcome");
            }

            if (parsed.event === "view_speed_question") {
                setPhase("speed_question");
                setQuestion(parsed.data.question);
                setDeliveryDate(parsed.data.date);
            }

            if (parsed.event === "play_speed_intro") {
                setPhase('speed_intro')
            }

            if (parsed.event === 'game_terminated') {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

            if (parsed.event === "play_draw") {
                setShowDrawVideo(true);
            }
            if (parsed.event === "unhold_draw") {
                setShowDrawVideo(false);
            }



            if (parsed.event === "list_main_questions") {
                setTeamInfo((prev) => ({ ...prev, main_question: parsed.data }));
                setPhase("main_questions");
                setQuestions(parsed.data.questions.map((question) => ({
                    ...question,
                    selectedAnswerId: null as number | null,
                    hasTimedOut: false,
                    chosen: false,
                    available: true,
                    isMagicCardQuestion: false,
                })))
            }

            if (parsed.event === "unhold_choosing_main_question") {
                setTeamInfo((prev) => {
                    if (prev.winnerDecided) return prev;
                    return {
                        ...prev,
                        main_question: prev.main_question
                            ? { ...prev.main_question, hold: false }
                            : null,
                        unavailable_questions: parsed.data.choosen_questions_ids,
                    };
                });
            }

            if (parsed.event === "winner") {
                setWinner(parsed.data);
                setPhase("winner");
            }


            if (parsed.event === "hold_choosing_main_question") {
                setTeamInfo((prev) => {
                    return {
                        ...prev,
                        answered_curr_main_quest: false,
                        main_question: prev.main_question
                            ? { ...prev.main_question, hold: true }
                            : null,
                    };
                });
            }

            if (parsed.event === "choosen_main_question") {
                setTeamInfo((prev) => {
                    return {
                        ...prev,
                        current_question_id: parsed.data.question_id,
                    };
                });
            }

            if (parsed.event === 'main_question_answer_result') {
                setQuestions((prev) => {
                    return prev.map((question) => {
                        if (question.id === parsed.data.question_id) {
                            return { ...question, selectedAnswerId: parsed.data.answer_id };
                        }
                        return question;
                    });
                });
                setTeamInfo((prev) => {
                    return {
                        ...prev,
                        answered_curr_main_quest: true,
                    };
                });
            }

            if (parsed.event === "speed_question_winner") {
                setWinnerName(parsed.data.team_name);
            }

            if (parsed.event === "view_clubs") {
                setPhase("choose_clubs");
                setClubs(parsed.data.clubs);
                setHold(parsed.data.hold);
            }

            if (parsed.event === "unhold_choosing_club") {
                setOtherTeamClub(parsed.data.choosen_club_id);
                setHold(false);
            }

            if (parsed.event === "winner") {
                setPhase("winner");
            }
            if (parsed.event === "game_draw") {
                setPhase("draw");
            }
        };

        socket.addEventListener("message", onMessage);
        return () => socket.removeEventListener("message", onMessage);
    }, [socket, setPhase, teamId]);

    return (
        <div className="w-full h-screen bg-black">
            <AnimatePresence mode="sync">
                {showDrawVideo && <HoldDialog />}
                {phase === "wating" && <Wating key="wating" />}
                {phase === "welcome" && <Welcomes key="welcomes" />}
                {phase === "speed_intro" && <TeamSpeedIntro key="speed_intro" />}
                {phase === "speed_question" && (
                    <SpeedQuestion
                        key="speed_question"
                        winner={winnerName}
                        deliveryDate={deliveryDate}
                        answers={question?.answers || []}
                        question={question?.question || ""}
                        interactive={true}
                    />
                )}

                {phase === "choose_clubs" && (
                    <ChooseClubs
                        key="choose-clubs"
                        hold={hold}
                        otherTeamClub={otherTeamClub}
                        clubs={clubs}
                    />
                )}
                {phase === "main_questions" && (
                    <TeamMainQuestions key="main-questions" />
                )}
                {phase === "winner" && <WinnerPage key="winner" />}
                {phase === "draw" && <Draw key="draw" />}
            </AnimatePresence>
        </div>
    );
}
