import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sh-w-animate-pulse sh-w-rounded-md sh-w-bg-muted",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
