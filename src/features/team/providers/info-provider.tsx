"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { useTeamSocket } from "./socket-provider";
import { parse } from "@/core/lib/utils";
import { useTeamPhases } from "./phases-provider";

export type Question = MainQuestion & {
  selectedAnswerId: number | null;
  hasTimedOut: boolean;
  chosen: boolean;
  available: boolean;
  isMagicCardQuestion: boolean;
};

type TeamInfo = {
  score: number;
  won_phase1: boolean;
  used_magic_card: boolean;
  name: string;
  choosen_club: Club | null;
  main_question: {
    hold: boolean;
    questions: MainQuestion[];
  } | null;
  winnerDecided: boolean;
  unavailable_questions: number[];
  answered_curr_main_quest: boolean,
  current_question_id: number | null
};

type TeamInfoContextType = {
  setTeamInfo: React.Dispatch<React.SetStateAction<TeamInfo>>;
  teamInfo: TeamInfo;
  winner: {
    score: number;
    name: string;
    club: Club | null;
  } | null;
  setWinner: Dispatch<SetStateAction<{
    score: number;
    name: string;
    club: Club | null;
  } | null>>,
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
};

const Context = createContext<TeamInfoContextType | null>(null);

export const useTeamInfo = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useTeamInfo must be used within TeamInfoProvider");
  }
  return context;
};

export default function TeamInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    choosen_club: null,
    name: "",
    score: 0,
    used_magic_card: false,
    won_phase1: false,
    main_question: null,
    winnerDecided: false,
    unavailable_questions: [],
    answered_curr_main_quest: false,
    current_question_id: null
  });

  const [winner, setWinner] = useState<{
    score: number;
    name: string;
    club: Club | null;
  } | null>(null);



  const [questions, setQuestions] = useState<Question[]>([]);

  // useLayoutEffect(() => {
  //   if (!socket) return;

  //   const onMessage = ({ data }: MessageEvent) => {
  //     const parsed = parse<any>(data);

  //     if (parsed.event === "your_team") {
  //       setTeamInfo((prev) => ({ ...prev, ...parsed.data }));
  //     }

  //     if (parsed.team1 && parsed.team2) {
  //       if (teamId === "team1") {
  //         setTeamInfo((prev) => ({ ...prev, ...parsed.team1 }));
  //       } else if (teamId === "team2") {
  //         setTeamInfo((prev) => ({ ...prev, ...parsed.team2 }));
  //       }
  //     }
  //   };

  //   socket.addEventListener("message", onMessage);
  //   return () => socket.removeEventListener("message", onMessage);
  // }, [socket, teamId]);

  // useLayoutEffect(() => {
  //   if (!socket) return;

  //   const onMessage = ({ data }: MessageEvent) => {
  //     const parsed = parse<ServerTeamMessage>(data);

  //     if (parsed.event === "list_main_questions") {
  //       setTeamInfo((prev) => ({ ...prev, main_question: parsed.data }));
  //       setPhase("main_questions");
  //     }

  //     if (parsed.event === "unhold_choosing_main_question") {
  //       setTeamInfo((prev) => {
  //         if (prev.winnerDecided) return prev;
  //         return {
  //           ...prev,
  //           main_question: prev.main_question
  //             ? { ...prev.main_question, hold: false }
  //             : null,
  //           unavailable_questions: parsed.data.choosen_questions_ids,
  //         };
  //       });
  //     }

  //     if (parsed.event === "winner") {
  //       setWinner(parsed.data);
  //       setPhase("winner");
  //     }
  //   };

  //   socket.addEventListener("message", onMessage);
  //   return () => socket.removeEventListener("message", onMessage);
  // }, [socket, setPhase]);

  return (
    <Context.Provider value={{ setTeamInfo, teamInfo, winner, setWinner, questions, setQuestions }}>
      {children}
    </Context.Provider>
  );
}
