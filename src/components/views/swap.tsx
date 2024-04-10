import { TokenInput } from "@/components/token-input";
import { useNetworks } from "@/hooks/use-networks";
import { useTokens } from "@/hooks/use-tokens";
import { useEffect, useMemo, useState } from "react";
import { Network, Token } from "@shushfi/sdk";
import { Button } from "@/components/ui/button";
import { PoweredBy } from "@/components/powered-by";
import { useDebounce } from "use-debounce";
import { useQuote } from "@/hooks/use-quote";
import { useCreateOrderMutation } from "@/hooks/use-order-mutation";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Layout } from "@/components/views/layout";
import { Input } from "@/components/ui/input";
import { HelpCircle, History } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Label } from "@/components/label";
import { toast } from "@/hooks/use-toast";

export function SwapView() {
  const { data: tokens } = useTokens();
  const networks = useNetworks();
  const navigate = useNavigate();

  const [isExactOut, setIsExactOut] = useState<boolean>(false);

  const [networkIn, setNetworkIn] = useState<Network | undefined>();
  const [tokenIn, setTokenIn] = useState<Token | undefined>();
  const [amountIn, setAmountIn] = useState<string>();
  const [debouncedAmountIn] = useDebounce(amountIn, 300);

  const [networkOut, setNetworkOut] = useState<Network | undefined>();
  const [tokenOut, setTokenOut] = useState<Token | undefined>();
  const [amountOut, setAmountOut] = useState<string>();
  const [debouncedAmountOut] = useDebounce(amountOut, 300);

  const [anonymous, setAnonymous] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  const {
    mutate,
    isLoading: isSwapping,
  } = useCreateOrderMutation();

  const {
    data: quoteOut,
    isLoading: quoteOutLoading,
    error: quoteOutError,
  } = useQuote({
    fromToken: tokenIn?.id,
    toToken: tokenOut?.id,
    amount: debouncedAmountIn ? parseFloat(debouncedAmountIn) : undefined,
    isExactOut,
    enabled: !isExactOut && !!amountIn,
    anonymous
  });

  const {
    data: quoteIn,
    isLoading: quoteInLoading,
    error: quoteInError,
  } = useQuote({
    fromToken: tokenIn?.id,
    toToken: tokenOut?.id,
    amount: debouncedAmountOut ? parseFloat(debouncedAmountOut) : undefined,
    isExactOut,
    enabled: isExactOut && !!amountOut,
    anonymous,
  });

  useEffect(() => {
    if (networks && networks.length > 0) {
      if (!networkIn) setNetworkIn(networks[0]);
      if (!networkOut) setNetworkOut(networks[0]);
    }
  }, [networks]);

  useEffect(() => {

    if (quoteInError) {
      toast({title: "Could not get quote.", description: (quoteInError as Error).message , variant: "destructive"});
    }
  }, [quoteInError])

  useEffect(() => {
    if (quoteOutError) {
      toast({title: "Could not get quote.", description: (quoteOutError as Error).message, variant: "destructive"});
    }
  }, [quoteOutError])

  const filteredInputTokens = useMemo(() => {
    if (!networkIn || !tokens) return [];
    return tokens?.filter((token: Token) => {
      return token.network.shortName === networkIn.shortName;
    });
  }, [networkIn, tokens]);

  const filteredOutputTokens = useMemo(() => {
    if (!networkOut || !tokens) return [];
    return tokens?.filter((token: Token) => {
      return token.network.shortName === networkOut.shortName;
    });
  }, [networkOut, tokens]);

  useEffect(() => {
    if (filteredInputTokens && filteredInputTokens.length > 0) {
      setTokenIn(filteredInputTokens[0]);
    } else {
      setTokenIn(undefined);
    }
  }, [filteredInputTokens]);

  useEffect(() => {
    if (filteredOutputTokens) {
      if (filteredOutputTokens.length > 1) setTokenOut(filteredOutputTokens[1]);
      else if (filteredOutputTokens.length > 0)
        setTokenOut(filteredOutputTokens[0]);
      else setTokenOut(undefined);
    } else {
      setTokenOut(undefined);
    }
  }, [filteredOutputTokens]);

  useEffect(() => {
    setAmountIn(quoteInError ? "" : quoteIn?.amountIn.toString());
  }, [quoteIn, quoteInError]);

  useEffect(() => {
    setAmountOut(quoteOutError ? "" : quoteOut?.amountOut.toString());
  }, [quoteOut, quoteOutError]);


  const handleSwap = () => {
    if (!swapEnabled) return;

    mutate(
      {
        fromToken: tokenIn?.id,
        toToken: tokenOut?.id,
        toAddress: address,
        amount: amountIn !== undefined ? parseFloat(amountIn) : undefined,
        anonymous,
        memo,
        isExactOut,
      },
      {
        onSuccess(data) {
          navigate(`/orders/${data.id}`);
        },
        onError(error) {
          toast({title: "Could not create order.", description: (error as Error).message, variant: "destructive"});
        }
      }
    );
  };
  
  const addressMatchExpression = useMemo(() => {
    if (tokenOut && tokenOut.network.addressValidation) {
      return new RegExp(tokenOut.network.addressValidation);
    }
  }, [tokenOut]);

    const addressError = useMemo(() => {
    if (
      !address || 
      !addressMatchExpression || 
      addressMatchExpression.test(address)
    ) return undefined;

    return "Invalid address";
  }, [address, addressMatchExpression]);

  const swapEnabled = useMemo(() => {
    return (
      !!tokenIn &&
      !!tokenOut &&
      !!amountIn &&
      !!amountOut &&
      !quoteInLoading &&
      !quoteOutLoading && 
      address && 
      addressError == undefined
    );
  }, [tokenIn, tokenOut, amountIn, amountOut, quoteInLoading, quoteOutLoading, address]);

  return (
    <Layout>
      <Header title="Swap" actions={<div className="sh-w-flex sh-w-items-center sh-w-gap-x-1">
        <Button size="icon" variant="secondary" onClick={() => navigate("/orders")}>
          <History className="sh-w-h-4 sh-w-w-4" />
        </Button>
      </div>} />
      {/* <Link to="/orders">Orders</Link> */}
      <div className="sh-w-flex sh-w-flex-1 sh-w-flex-col sh-w-h-full sh-w-gap-y-4 sh-w-px-4 sh-w-pb-4">

        <div className="sh-w-flex sh-w-justify-center">
          
<div className="sh-w-flex sh-w-items-center sh-w-gap-x-2">
        <Label
          tooltip={`
              Get a better rate and speed by sacrificicng some
              privacy. While not trivial, it is techincally
              possible to track the transaction.
              `}
          className={cn(
            "sh-w-flex sh-w-items-center sh-w-gap-x-1 sh-w-text-sm sh-w-font-medium sh-w-uppercase sh-w-touch-none",
            {
              "sh-w-opacity-60": anonymous,
            }
          )}
          htmlFor="anonymous-toggle"
        >
          Semi-Private <HelpCircle className="sh-w-w-4 sh-w-h-4" />
        </Label>
        <Switch
          qualitative
          id="anonymous-toggle"
          checked={anonymous}
          onCheckedChange={(checked) => setAnonymous(checked)}
        />
        <label
          className={cn("sh-w-text-sm sh-w-font-medium sh-w-uppercase sh-w-block", {
            "sh-w-opacity-60": !anonymous,
          })}
          htmlFor="anonymous-toggle"
        >
          Private
        </label>
    </div>        </div>

        <div className="sh-w-flex sh-w-flex-col sh-w-grow sh-w-gap-y-4">
          <TokenInput
            value={amountIn}
            onUserInput={(input) => {
              setIsExactOut(false);
              setAmountIn(input);
            }}
            direction={"from"}
            token={tokenIn}
            tokens={filteredInputTokens}
            network={networkIn}
            setToken={setTokenIn}
            setNetwork={setNetworkIn}
            isLoadingAmount={quoteInLoading}
          />
          <TokenInput
            value={amountOut}
            onUserInput={(input) => {
              setIsExactOut(true);
              setAmountOut(input);
            }}
            direction={"to"}
            token={tokenOut}
            tokens={filteredOutputTokens}
            network={networkOut}
            setToken={setTokenOut}
            setNetwork={setNetworkOut}
            isLoadingAmount={quoteOutLoading}
          />
          <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1">
            <span className="sh-w-text-sm sh-w-text-muted-foreground">
              Receiving Wallet Address
            </span>
            <Input 
              type="text"
              error={addressError}
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              placeholder={`${tokenOut?.displayName ?? ""} Wallet Address`.trim()} 
            />
          </div>
          {tokenOut?.network.hasMemoField &&
            <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1">
              <span className="sh-w-text-sm sh-w-text-muted-foreground">
                Memo
              </span>
              <Input type="text" value={memo} onChange={e => setMemo(e.target.value)} placeholder="Exchange memo / personal note" />
            </div>
          }
        </div>
        <div className="sh-w-flex-1 sh-w-justify-end sh-w-h-full sh-w-flex sh-w-flex-col sh-w-gap-y-4">
          <Button
            onClick={handleSwap}
            loading={isSwapping}
            disabled={!swapEnabled}
            className="w-full"
            size="lg"
          >
            Swap
          </Button>
          <div className="sh-w-flex sh-w-items-center sh-w-justify-center">
            <PoweredBy />
          </div>
        </div>
      </div>
    </Layout>
  );
}
