import { Skeleton } from "@/components/ui/skeleton";
import { Network } from "@shushfi/sdk";

export const NetworkLogo = ({
  network,
  size = 40,
}: {
  network?: Network;
  size?: number;
}) => {
  if (!network) {
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
      className="sh-w-bg-cover"
      width={size}
      height={size}
      src={`https://api.shush.fi/v1/assets/networks/${network.shortName}.png`}
      alt=""
    />
  );
};
