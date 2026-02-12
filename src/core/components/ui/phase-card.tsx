import { cn } from "@/core/lib/utils";

export type PhaseCardProps = {} & React.ComponentProps<"div">;

export function PhaseCard({ className, children, ...props }: PhaseCardProps) {
  return (
    <div className={cn("flex-1 flex-col w-full h-full", className)} {...props}>
      {children}
    </div>
  );
}

type PhaseCardHeaderProps = {
  imageProps?: React.ComponentProps<"img">;
  containerProps?: React.ComponentProps<"div">;
} & React.ComponentProps<"div">;
export function PhaseCardHeader({
  className,
  children,
  imageProps,
  containerProps,
  ...props
}: PhaseCardHeaderProps) {
  const { className: imageClassName, ...imagePropsRest } = imageProps ?? {};
  const { className: containerClassName, ...containerPropsRest } =
    containerProps ?? {};

  return (
    <div
      className={cn("relative w-full", containerClassName)}
      {...containerPropsRest}
      {...props}
    >
      <img
        src="/assets/images/speed-question/header-empty.webp"
        alt="Phase Card Header"
        className={cn("object-contain w-full", imageClassName)}
        {...imagePropsRest}
      />
      <div className={cn("absolute inset-0 text-white", className)}>
        {children}
      </div>
    </div>
  );
}

type PhaseCardContentProps = {
  imageProps?: React.ComponentProps<"img">;
  containerProps?: React.ComponentProps<"div">;
} & React.ComponentProps<"div">;
export function PhaseCardContent({
  className,
  children,
  imageProps,
  containerProps,
  ...props
}: PhaseCardContentProps) {
  const { className: imageClassName, ...imagePropsRest } = imageProps ?? {};
  const { className: containerClassName, ...containerPropsRest } =
    containerProps ?? {};

  return (
    <div
      className={cn("relative w-full bg-black/70", containerClassName)}
      {...containerPropsRest}
      {...props}
    >
      <img
        src="/assets/images/speed-question/body.webp"
        alt="Phase Card Content"
        className={cn("object-contain w-full opacity-50", imageClassName)}
        {...imagePropsRest}
      />
      <div className={cn("absolute inset-0 text-white", className)}>
        {children}
      </div>
    </div>
  );
}

type PhaseCardFooterProps = {
  imageProps?: React.ComponentProps<"img">;
  containerProps?: React.ComponentProps<"div">;
} & React.ComponentProps<"div">;
export function PhaseCardFooter({
  className,
  children,
  imageProps,
  containerProps,
  ...props
}: PhaseCardFooterProps) {
  const { className: imageClassName, ...imagePropsRest } = imageProps ?? {};
  const { className: containerClassName, ...containerPropsRest } =
    containerProps ?? {};

  return (
    <div
      className={cn("relative w-full", containerClassName)}
      {...containerPropsRest}
      {...props}
    >
      <img
        src="/assets/images/speed-question/footer.webp"
        alt="Phase Card Footer"
        className={cn("object-contain w-full", imageClassName)}
        {...imagePropsRest}
      />
      <div className={cn("absolute inset-0", className)}>{children}</div>
    </div>
  );
}
