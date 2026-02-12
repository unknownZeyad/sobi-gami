import { motion } from "motion/react";
import Image from "next/image";
import {
  PhaseCard,
  PhaseCardContent,
  PhaseCardFooter,
  PhaseCardHeader,
} from "@/core/components/ui/phase-card";
import ContentLayout from "@/core/components/layout/content-layout";
import EnterExit from "@/core/components/derived/enter-exit";
import { TeamLogo } from "@/core/components/ui/team-logo";

import { useAudio } from "@/core/providers/audio-provider";
import { useLayoutEffect } from "react";



export function AnswerResultScreen({
  answerResult,
}: {
  answerResult: MainQuestionAnswerResult;
}) {
  const isCorrect = answerResult.is_correct;
  const scoreChange = answerResult.question_points;
  const score = answerResult.score;

  return (
    <EnterExit>
      <ContentLayout personSrc="/assets/images/person.png">
        <div className="flex flex-col items-end gap-4">
          <PhaseCard>
            <PhaseCardHeader
              className="flex items-center justify-center"
              containerProps={{
                className: "h-6 overflow-hidden",
              }}
            />
            <PhaseCardContent
              className="space-y-3 relative"
              imageProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "bg-transparent",
              }}
            >
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className=" bg-black/50 px-16 flex items-center justify-center gap-16"
              >
                <h1 className={`text-8xl font-black italic text-white`}>
                  {isCorrect ? "GOAL!" : "MISS!"}
                </h1>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-white">SCORE</div>
                  <div
                    className={`text-7xl px-5 font-bold italic bg-linear-to-r from-yellow-500 via-yellow-100 to-yellow-300 text-transparent bg-clip-text`}
                  >
                    {isCorrect ? "+" : "-"}
                    {scoreChange}
                  </div>
                </div>
                <Image
                  src={
                    isCorrect
                      ? "/assets/images/Goal.webp"
                      : "/assets/images/missGoal.webp"

                  }
                  alt={isCorrect ? "Goal" : "Miss"}
                  width={250}
                  height={350}
                  unoptimized
                  className="object-contain"
                />
              </motion.div>

              <div className="flex justify-between items-center bg-black/50 px-20 border-l border-yellow-500 py-8 border-r border-t">
                <div className="flex-1">
                  <TeamLogo
                    src={answerResult.club.logo_img_url}
                    name={answerResult.club.name}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">SCORE</div>
                  <div className="text-7xl px-5 font-bold italic bg-linear-to-r from-yellow-500 via-yellow-100 to-yellow-300 text-transparent bg-clip-text">
                    {score}
                  </div>
                  <div className="text-sm font-bold">TOTAL POINTS</div>
                </div>
                <div className="flex-1">
                  <img
                    className="rounded-2xl ml-auto w-40 aspect-4/5"
                    src={answerResult.used_magic_card ? '/assets/images/golden-card.webp' : answerResult.question_img}
                    alt={answerResult.club.name}
                  />
                </div>
              </div>
            </PhaseCardContent>
            <PhaseCardFooter />
          </PhaseCard>
        </div>
      </ContentLayout>
    </EnterExit>
  );
}
