import { GenericSelectDialog } from "@/components/generic-select-dialog";
import { TokenLogo } from "@/components/token-logo";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Token } from "@shushfi/sdk";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenSelectButtonProps {
  token?: Token;
  tokens?: Token[];
  onSelectToken: (token: Token) => void;
}

export const TokenSelectButton = ({
  tokens,
  token,
  onSelectToken,
}: TokenSelectButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={buttonVariants({variant: "secondary", size: "sm"})}
            onClick={!!tokens ? () => setOpen(true) : undefined}
          >
            {token ? (
              <div className="sh-w-flex sh-w-items-center">
                <TokenLogo className="sh-w-mr-1" size={24} token={token} />
                <span>{token.symbol}</span>
                {tokens && tokens.length > 0 && (
                  <ChevronDown className="sh-w-w-4 sh-w-h-4 sh-w-ml-1" />
                )}
              </div>
            ) : (
              <span>Select a token</span>
            )}
          </div>
        </TooltipTrigger>
        {token && token.address && (
          <TooltipContent>{token.address}</TooltipContent>
        )}
      </Tooltip>
      <GenericSelectDialog
        open={open}
        onOpenChange={setOpen}
        searchPlaceholder={"Search token"}
        items={tokens}
        onSelectItem={onSelectToken}
        matchItem={(token, query) => {
          return (
            token.symbol.toLowerCase().includes(query.toLowerCase()) ||
            token.name.toLowerCase().includes(query.toLowerCase()) ||
            (!!token.address &&
              token.address.toLowerCase().includes(query.toLowerCase()))
          );
        }}
        renderItem={(token) => (
          <div className="sh-w-flex sh-w-items-center sh-w-gap-x-4">
            <TokenLogo token={token} />
            <div className="sh-w-flex sh-w-flex-col sh-w-items-start">
              <span className="sh-w-font-medium">{token.symbol}</span>
            </div>
          </div>
        )}
      />
    </>
  );
};
