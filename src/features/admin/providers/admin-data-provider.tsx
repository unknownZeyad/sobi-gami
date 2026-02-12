import { parse } from "@/core/lib/utils";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useAdminSocket } from "./admin-socket-provider";
import { useAdminPhases } from "./admin-phases-provider";
import { useAudio } from "@/core/providers/audio-provider";

type ContextData = {
  currentQuestion: { club: Club; question: MainQuestion; score: number; used_magic_card: boolean } | null;
  answerResult: MainQuestionAnswerResult | null;
  winner: { name: string; score: number; club: Club } | null;
  speedQuestion: {
    question: SpeedQuestion;
    date: number;
  } | null;
  speedQuestionWinner: string | null;
  clubs: {
    team1: Club | null;
    team2: Club | null;
  }
};

const Context = createContext<ContextData>({
  currentQuestion: null,
  answerResult: null,
  winner: null,
  speedQuestion: null,
  speedQuestionWinner: null,
  clubs: {
    team1: null,
    team2: null
  }
});

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useAdminSocket();
  const { setPhase, phase } = useAdminPhases();
  const { stopAudio, playAudio } = useAudio()

  const [speedQuestion, setSpeedQuestion] = useState<{
    question: SpeedQuestion;
    date: number;
  } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<
    ContextData["currentQuestion"] | null
  >(null);
  const [speedQuestionWinner, setSpeedQuestionWinner] = useState<string | null>(null);
  const [winner, setWinner] = useState<ContextData["winner"] | null>(null);
  const [answerResult, setAnswerResult] =
    useState<MainQuestionAnswerResult | null>(null);

  const [clubs, setClubs] = useState<{
    team1: Club | null;
    team2: Club | null;
  }>({
    team1: null,
    team2: null
  })

  console.log(phase)

  useLayoutEffect(() => {
    if (!socket) return;

    function onMessage({ data }: MessageEvent) {
      const parsed = parse<ServerAdminMessage>(data);
      console.log(parsed)

      if (parsed.event === "choosen_main_question") {
        setCurrentQuestion(parsed.data);
        setAnswerResult(null);
        setPhase("main_questions");
      }
      if (parsed.event === "experience_started") setPhase("intro")

      if (parsed.event === "main_question_answer_result") {
        setAnswerResult(parsed.data);
      }
      if (parsed.event === "play_speed_intro") {
        setPhase("speed_intro")
      }
      if (parsed.event === 'main_questions_started') {
        setPhase("main_questions")
      }
      if (parsed.event === 'view_speed_question') {
        setSpeedQuestion(parsed.data)
        setPhase("speed_question")
      }

      if (parsed.event === 'wait_for_clubs') {
        setPhase('choosing_clubs')
      }

      if (parsed.event === 'view_all_choosen_clubs') {
        setClubs({
          team1: parsed.data.team1_club,
          team2: parsed.data.team2_club
        });
      }

      if (parsed.event === 'speed_question_winner') {
        setSpeedQuestionWinner(parsed.data.team_name)
        let audioPath = ''
        if (parsed.data.team === 'team1') {
          audioPath = '/assets/audios/Speed Question Winner/Speed Question winner Team A.mp3'
        } else if (parsed.data.team === 'team2') {
          audioPath = '/assets/audios/Speed Question Winner/Speed Question winner Team B.mp3'
        } else {
          audioPath = '/assets/audios/Wrong Answers/Wrong answers_opt 2.mp3'
        }
        playAudio(audioPath)
      }



      if (parsed.event === "winner") {
        setWinner(parsed.data);
        setPhase("winner");
        stopAudio()
      }

      if (parsed.event === "game_draw") {
        setPhase("draw");
        stopAudio()
      }
      if (parsed.event === "game_terminated") {
        setPhase('start_experience');
        window.location.reload();
      }

    }

    socket.addEventListener("message", onMessage);

    return () => socket.removeEventListener("message", onMessage);
  }, [socket]);
  return <Context.Provider value={{
    currentQuestion: currentQuestion,
    answerResult: answerResult,
    winner: winner,
    speedQuestion,
    speedQuestionWinner,
    clubs
  }}>{children}</Context.Provider>;
}

export function useAdminData() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
