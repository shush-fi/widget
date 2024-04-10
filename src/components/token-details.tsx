import { CopyText } from "@/components/copy-text";
import { NetworkLogo } from "@/components/network-logo";
import { TokenLogo } from "@/components/token-logo";
import { PopoverTrigger,PopoverContent   } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { shortenAddress } from "@/lib/utils";
import { Token } from "@shushfi/sdk";
import { Info, } from "lucide-react";

interface TokenDetailsProps {
  className?: string;
  token?: Token;
}

export const TokenDetails = ({token}: TokenDetailsProps) => {
  return <Popover>
  <PopoverTrigger>
    <div className="sh-w-flex sh-w-items-center sh-w-px-2 sh-w-py-0.5 sh-w-bg-secondary sh-w-text-secondary-foreground sh-w-rounded-md">
      <TokenLogo size={16} token={token} /> 
      <span className="sh-w-ml-1">
        {token?.symbol}
      </span>
      <Info className="sh-w-w-3 sh-w-h-3 sh-w-ml-1.5 sh-w-text-muted-foreground" />
    </div>
  </PopoverTrigger>
  <PopoverContent>
    <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-3">
      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1">
        <span className="sh-w-text-sm sh-w-text-muted-foreground">
          Name
        </span>
        <div className="sh-w-flex sh-w-items-center ">

        <TokenLogo token={token} size={16} />        

        <span className="sh-w-text-sm sh-w-ml-1">
          {token?.name} ({token?.symbol})
        </span>
</div>
      </div>
      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1">
        <span className="sh-w-text-sm sh-w-text-muted-foreground">
          Network
        </span>
        <span className="sh-w-text-sm sh-w-flex sh-w-items-center">
          <NetworkLogo size={16} network={token?.network} /> 
          <span className="sh-w-ml-1">
            {token?.network.name}
          </span>
        </span>
      </div>
      {
        token?.address && (
          <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1">
            <span className="sh-w-text-sm sh-w-text-muted-foreground">
              Address
            </span>
            <CopyText text={shortenAddress(token.address)} copiedText={token.address} />
          </div>
        )
      }
    </div>
  </PopoverContent>
</Popover>
}
