import { useTokens } from "@/hooks/use-tokens";
import { useOrderStatus } from "@/hooks/use-order-status";
import { Order, Token } from "@shushfi/sdk";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartyPopper} from "lucide-react";
import ProcessingImage from "@/assets/images/processing.svg";
import { Layout } from "@/components/views/layout";
import { Header } from "@/components/header";
import { CopyField } from "@/components/ui/copy-field";
import { OrderInfo } from "@/components/order-info";
import { Timer } from "@/components/timer";
import { Spinner } from "@/components/spinner";
import { TokenDetails } from "@/components/token-details";

interface OrderReceivedProps {
  order: Order;
  inToken?: Token;
  outToken?: Token;
}

export function OrderReceivedView({
  order,
}: OrderReceivedProps) {

  const navigate = useNavigate();
  return (
    <Layout> 
      <Header title={"Transaction"} onBack={() => navigate(-1)} />
    <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-10 sh-w-flex-1">
      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-10 sh-w-flex-1 sh-w-justify-center">

      <img
        className="sh-w-w-56 sh-w-max-w-[90%] sh-w-mx-auto"
        src={ProcessingImage}
        alt=""
      />
      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-8 @sm:sh-w-gap-y-4  sh-w-px-4">
        <div className="sh-w-flex sh-w-justify-center">
          <div className="sh-w-border-2 sh-w-border-primary sh-w-rounded-md sh-w-px-3 sh-w-py-0.5">
            Avg: {order.etaMinutes}m{" "}
          </div>
        </div>
        <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-2 sh-w-items-center">

        <div className="sh-w-flex sh-w-items-center sh-w-gap-x-2 sh-w-justify-center">
          
<PartyPopper className="sh-w-w-6 sh-w-h-6 sh-w-text-primary" />        <h2 className="sh-w-text-2xl @sm:sh-w-text-5xl sh-w-text-center sh-w-font-medium sh-w-uppercase">
  Confirmed
        </h2>
          
<PartyPopper className="sh-w-w-6 sh-w-h-6 sh-w-text-primary" />        </div>
        <p className="sh-w-text-center sh-w-uppercase sh-w-max-w-xs sh-w-mx-auto">
          your tokens are on their way, watch the progress using the link below.
        </p>
        </div>
      </div>
      </div>
      <div className="sh-w-p-4">
        <Link to={`/orders/${order.id}/detailed`}>
          <Button size={"lg"} variant={"secondary"} className="sh-w-w-full">
            Track Order
          </Button>
        </Link>
      </div>
    </div>
    </Layout>
  );
}

export function OrderView() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading: isLoadingStatus } = useOrderStatus({ id, refetchInterval: (order) =>  order && order.status < 4 ? 10000 : 0});
  const { data: tokens, isLoading: isLoadingTokens } = useTokens();
  const navigate = useNavigate();

  const { inToken, outToken } = useMemo(() => {
    if (!order || !tokens) return { inToken: undefined, outToken: undefined };

    return {
      inToken: tokens.find((t: Token) => t.id === order.inToken),
      outToken: tokens.find((t: Token) => t.id === order.outToken),
    };
  }, [order, tokens]);

  const hasExpired = new Date(order?.expiresAt!) < new Date();
  const isLoading = isLoadingStatus || isLoadingTokens;

  return (
    <Layout>
      <Header title={"Transaction"} onBack={() => navigate(-1)} />
      {isLoading && (
        <Spinner />
      )}
      {!!order && !!inToken && !!outToken && !isLoading ? (
        <div className="sh-w-flex sh-w-flex-col sh-w-h-full">
          <div className="sh-w-flex sh-w-flex-col sh-w-h-full">
            <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-4 sh-w-px-8 sh-w-py-4">
              <div className="sh-w-flex sh-w-flex-col">
                {
                  !hasExpired? (
                    <>
                      <h2 className="sh-w-text-lg sh-w-font-semibold">
                        Send payment within <span className="sh-w-text-primary"><Timer
                          deadline={new Date(order.expiresAt!)}
                        />
                        </span>
                      </h2>
                      <p className="sh-w-text-md sh-w-text-muted-foreground">
                        Your order is ready to be processed. Please send <div className="sh-w-inline-flex sh-w-items-center sh-w-gap-x-1"> 
                        <span className="sh-w-text-primary">
                          
{order.inAmount}                          </span>  <TokenDetails token={inToken} /> 
                          </div> to
                        the address below.
                      </p>
                    </>
                  ) : (
                    <h2 className="sh-w-text-lg sh-w-font-semibold">
                      Order <span className="sh-w-text-primary">Expired</span>
                      <p className="sh-w-text-md sh-w-text-muted-foreground">
                        Please create a new order.
                      </p>
                    </h2>
                  )
                }
              </div>
              {
                !hasExpired && (
                  <>
                    <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1 sh-w-items-start">
                      <span className="sh-w-text-sm sh-w-text-muted-foreground">
                        Address
                      </span>
                      <CopyField
                        value={order?.depositAddress?.toString() ?? undefined}
                      />
                    </div>
                    <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1 sh-w-items-start">
                      <span className="sh-w-text-sm sh-w-text-muted-foreground">
                        Amount
                      </span>
                      <CopyField value={order?.inAmount?.toString() ?? undefined} />
                    </div>
                    {order?.depositMemo && (
                      <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-1 sh-w-items-start">
                        <span className="sh-w-text-sm sh-w-text-muted-foreground">
                          Memo{" "}
                          <span className="sh-w-text-destructive sh-w-font-semibold">
                            IMPORTANT
                          </span>
                        </span>
                        <CopyField value={order?.depositMemo ?? undefined} />
                      </div>
                    )}
                  </>
                )
              }
            </div>
            <div className="sh-w-px-8 sh-w-flex sh-w-flex-col">
              <span className="sh-w-font-semibold sh-w-mb-1">Order info</span>
              <OrderInfo order={order} inToken={inToken} outToken={outToken} />
            </div>
          </div>
        </div>
      ) : !isLoading && (
        <div className="sh-w-flex sh-w-flex-col sh-w-items-center sh-w-gap-y-4 sh-w-px-8 sh-w-mt-8">
          Order not found.
        </div>
      )}
      {/* <div className="sh-w-flex sh-w-flex-1 sh-w-items-end sh-w-text-center sh-w-justify-center sh-w-p-6 sh-w-text-muted-foreground">
        Not seeing your transaction?
      </div> */}
    </Layout>
  );
}
