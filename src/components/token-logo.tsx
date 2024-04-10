import { Token } from "@shushfi/sdk";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const TokenLogo = ({
  className,
  token,
  size = 40,
}: {
  className?: string;
  token?: Token;
  size?: number;
  showNetwork?: boolean;
}) => {
  if (!token) {
    return (
      <Skeleton
        style={{
          width: size,
          height: size,
        }}
        className={`sh-w-rounded-full`}
      />
    );
  }

  return (
    <img
      className={cn("sh-w-bg-cover", className)}
      width={size}
      height={size}
      src={token?.icon ?? undefined}
      alt=""
    />
  );
};
