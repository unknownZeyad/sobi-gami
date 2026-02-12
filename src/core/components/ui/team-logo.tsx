import { cn } from "@/core/lib/utils";

type TeamLogoProps = {
  src: string;
  name: string;
} & React.ComponentProps<"div">;

export function TeamLogo({ src, className, name, ...props }: TeamLogoProps) {
  return (
    <div className={cn("flex gap-3 items-center", className)} {...props}>
      <img
        className="size-14 object-contain"
        src="/assets/images/icons/white-trophy.webp"
        alt="White Trophy"
      />
      <div className="text-2xl font-bold flex flex-col items-center">
        <div className="italic font-light text-sm">TEAM</div>
        <div className="font-bold uppercase italic whitespace-nowrap">
          {name}
        </div>
        <div className="text-[10px] font-light">SOBI FANTASY GAME</div>
      </div>
      <img className="size-14 object-contain shrink-0" src={src} alt="" />
    </div>
  );
}
