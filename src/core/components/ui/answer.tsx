import { cn } from "@/core/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { Check } from "lucide-react";
import { X } from "lucide-react";

type AnswerProps = {
  answer: {
    id: number;
    answer: string;
    is_correct: boolean;
  };
  hasTimedOut: boolean;
  selectedAnswerId: number | null;
  onAnswer: (answerId: number) => void;
} & React.ComponentProps<"button">;

export function Answer({
  className,
  answer,
  onAnswer,
  selectedAnswerId,
  hasTimedOut,
  ...props
}: AnswerProps) {
  const isCorrect = useMemo(() => {
    if (answer.id !== selectedAnswerId) return null;

    return answer.is_correct;
  }, [answer, selectedAnswerId]);

  const answered = !!selectedAnswerId;

  const handleAnswer = () => {
    if (hasTimedOut) return;
    onAnswer(answer.id);
  };

  return (
    <button
      onClick={handleAnswer}
      className={cn(
        "w-full relative border-amber-400/80 border-r flex bg-black/35",

        "hover:scale-105 duration-150 cursor-pointer",
        answered && "border-white/70",
        isCorrect === false && "border-red-500/80",
        isCorrect === true && "border-green-500/80",
        hasTimedOut && "border-red-500/80",
        (props.disabled || hasTimedOut) && "pointer-events-none",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "text-amber-400 w-[60px] h-full bg-white font-bold flex items-center justify-center text-5xl",
          answered && "text-zinc-600",
          isCorrect === false && "text-red-600",
          isCorrect === true && "text-green-600"
        )}
      >
        {answer.id}
      </div>
      <div
        className={cn(
          "h-full from-amber-400/80 uppercase via-amber-300/35 to-amber-500/5 bg-linear-90 text-md font-medium flex-1 text-white p-3 flex items-center",
          answered && "from-white/30 via-white/20 to-white/10",
          isCorrect === false && "from-red-500/40 via-red-500/15 to-red-500/5",
          isCorrect === true &&
            "from-green-400/60 via-green-500/40 to-green-500/30"
        )}
      >
        {answer.answer}
      </div>
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            className={cn(
              "h-8 absolute top-0 flex items-center justify-center right-0 p-2 translate-x-1/2 aspect-square rounded-full",
              isCorrect === false && "bg-red-500 text-white",
              isCorrect === true && "bg-green-500 text-white"
            )}
          >
            {isCorrect ? (
              <Check className="size-full stroke-3" />
            ) : (
              <X className="size-full stroke-3" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
