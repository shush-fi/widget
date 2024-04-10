import { CopyText } from "@/components/copy-text";
import { TokenDetails } from "@/components/token-details";
import { usePrices } from "@/hooks/use-prices";
import { formatAmount, shortenAddress } from "@/lib/utils";
import { Order, Token } from "@shushfi/sdk";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const OrderInfo = ({
  order,
  inToken,
  outToken,
}: {
  order: Order;
  inToken?: Token;
  outToken?: Token;
}) => {
  const [copiedRecipient, setCopiedRecipient] = useState(false);
  const { data: prices } = usePrices();

  const formattedInAmountUsd =
    order.inAmount &&
    prices &&
    order.inToken &&
    prices[order.inToken] &&
    Intl.NumberFormat().format(prices[order.inToken] * order.inAmount);
    
  const formattedOutAmountUsd =
    order.outAmount &&
    prices &&
    order.outToken &&
    prices[order.outToken] &&
    Intl.NumberFormat().format(prices[order.outToken] * order.outAmount);

  const handleCopyRecipient = () => {
    navigator.clipboard.writeText(order.recipientAddress!);
    setCopiedRecipient(true);
    setTimeout(() => {
      setCopiedRecipient(false);
    }, 2000);
  }

  return (
    <div className="sh-w-flex sh-w-flex-col sh-w-w-full">
      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-2 sh-w-items-start">
        <div className="sh-w-flex sh-w-flex-col @sm:sh-w-flex-row sh-w-items-start @sm:sh-w-items-center sh-w-justify-between sh-w-w-full">
          <span className="sh-w-text-sm sh-w-text-muted-foreground">From</span>
          <span className="sh-w-flex sh-w-flex-col sh-w-items-start @2xs:sh-w-flex-row @2xs:sh-w-items-center sh-w-gap-y-1 sh-w-gap-x-2 sh-w-text-sm ">
            <span title={order.inAmount?.toString()}>
              {order.inAmount && formatAmount(order.inAmount)}
              <span className="sh-w-ml-1 sh-w-text-muted-foreground">
                {formattedInAmountUsd &&`($${formattedInAmountUsd})`}
              </span>{" "}
            </span>{" "}
            <TokenDetails token={inToken} />
          </span>
        </div>
        <div className="sh-w-flex  sh-w-flex-col @sm:sh-w-flex-row sh-w-items-start @sm:sh-w-items-center sh-w-justify-between sh-w-w-full">
          <span className="sh-w-text-sm sh-w-text-muted-foreground">To</span>
          <span className="sh-w-flex sh-w-flex-col sh-w-items-start @2xs:sh-w-flex-row @2xs:sh-w-items-center sh-w-gap-y-1 sh-w-gap-x-2 sh-w-text-sm ">
            <span title={order.outAmount?.toString()}>
              {order.outAmount && formatAmount(order.outAmount)}
              <span className="sh-w-ml-1 sh-w-text-muted-foreground">
                {formattedOutAmountUsd &&`($${formattedOutAmountUsd})`}
              </span>
            </span>{" "}
            <TokenDetails token={outToken} />
          </span>
        </div>
        <div className="sh-w-flex  sh-w-flex-col @sm:sh-w-flex-row sh-w-items-start @sm:sh-w-items-center sh-w-justify-between sh-w-w-full">
          <span className="sh-w-text-sm sh-w-text-muted-foreground">
            Recipient
          </span>
          <CopyText text={shortenAddress(order.recipientAddress!)} copiedText={order.recipientAddress!} />
        </div>
        {order && order.recipientMemo && (
          <div className="sh-w-flex  sh-w-flex-col @sm:sh-w-flex-row sh-w-items-start @sm:sh-w-items-center sh-w-justify-between sh-w-w-full">
            <span className="sh-w-text-sm sh-w-text-muted-foreground">
              Memo
            </span>
            <span className="sh-w-flex sh-w-items-center sh-w-gap-x-2 sh-w-text-sm ">
              {`${order?.recipientMemo?.substring(0, 10)}${order.recipientMemo.length > 10 ? "..." : ""}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
