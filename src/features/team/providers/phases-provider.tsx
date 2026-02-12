import { createContext, useContext, useRef, useState } from "react";

type Phases =
  'wating' |
  'welcome' |
  'speed_question' |
  'choose_clubs' |
  'main_questions' |
  'winner' |
  'speed_intro' |
  'draw'

const Context = createContext<{
  phase: Phases;
  setPhase: React.Dispatch<React.SetStateAction<Phases>>;
}>({
  phase: 'wating',
  setPhase: () => { },
});

export const useTeamPhases = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGamePhases must be used within a GamePhasesProvider");
  }
  return context;
};

export default function TeamPhasesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phases>("wating");

  return (
    <Context.Provider value={{ phase, setPhase }}>
      {children}
    </Context.Provider>
  );
}
