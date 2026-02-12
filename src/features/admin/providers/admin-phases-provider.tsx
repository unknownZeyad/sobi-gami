"use client";

import { createContext, useContext, useState } from "react";

type AdminPhases =
    'start_experience' |
    'intro' |
    "speed_intro" |
    'speed_question' |
    'choosing_clubs' |
    'main_questions' |
    'winner' |
    'draw'

const Context = createContext<{
    phase: AdminPhases;
    setPhase: React.Dispatch<React.SetStateAction<AdminPhases>>;
}>({
    phase: "start_experience",
    setPhase: () => { },
});

export const useAdminPhases = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useAdminPhases must be used within an AdminPhasesProvider");
    }
    return context;
};

export default function AdminPhasesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [phase, setPhase] = useState<AdminPhases>("start_experience");

    return (
        <Context.Provider value={{ phase, setPhase }}>
            {children}
        </Context.Provider>
    );
}
