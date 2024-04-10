import { NetworkSelectButton } from "@/components/network-select-button";
import { TokenSelectButton } from "@/components/token-select-button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNetworks } from "@/hooks/use-networks";
import { usePrices } from "@/hooks/use-prices";
import { cn } from "@/lib/utils";
import { Network, Token } from "@shushfi/sdk";

interface TokenInputProps {
  value?: string;
  onUserInput?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  network?: Network;
  setNetwork: (network: Network) => void;
  token?: Token;
  tokens?: Token[];
  setToken: (token: Token) => void;
  direction: "from" | "to";
  isLoadingAmount?: boolean;
}

export const TokenInput = ({
  value,
  onUserInput,
  onKeyDown,
  direction,
  token,
  tokens,
  setToken,
  network,
  setNetwork,
  isLoadingAmount,
}: TokenInputProps) => {
  const {data: prices, isLoading: isLoadingPrices}= usePrices();
  const networks = useNetworks();

  const handleUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(e.target.value)) return;
    onUserInput?.(e.target.value);
  };

  return (
    <div
      className={cn(
        "sh-w-flex sh-w-flex-col sh-w-border sh-w-border-input sh-w-bg-card sh-w-text-card-foreground sh-w-rounded-md"
      )}
    >
      <div className="sh-w-flex sh-w-justify-between sh-w-px-4 sh-w-pb-2 sh-w-pt-4 ">
        <div className="sh-w-flex sh-w-items-center sh-w-gap-x-2">

        <span className="sh-w-text-sm sh-w-text-muted-foreground">
          {direction === "from" ? "From" : "To"}
        </span>
        <NetworkSelectButton
          network={network}
          networks={networks}
          onSelectNetwork={setNetwork}
        />
        </div>
        {
          isLoadingPrices ? (
            <Skeleton className="sh-w-w-12 sh-w-h-4" />
          ) : token &&  (
            <span className="sh-w-text-muted-foreground">
              ${prices && value ? Intl.NumberFormat().format(parseFloat(value) * prices[token.id]) : "0.00"}
            </span>
          )
        }
      </div>
      <Separator />
      <div className="sh-w-p-4 sh-w-flex sh-w-items-center">
        {isLoadingAmount ? (
          <div className="sh-w-flex-1 sh-w-w-full">
            <Skeleton className="sh-w-w-[12ch] sh-w-h-[1.75rem]" />
          </div>
        ) : (
          <input
            onKeyDown={onKeyDown}
            value={value}
            onChange={handleUpdateValue}
            type="text"
            className="sh-w-bg-transparent sh-w-flex-1 sh-w-w-full placeholder:sh-w-text-muted-foreground sh-w-text-xl sh-w-outline-none"
            placeholder="0.0"
          />
        )}
        <TokenSelectButton
          token={token}
          tokens={tokens}
          onSelectToken={setToken}
        />
      </div>
    </div>
  );
};
