import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { OrderInfo } from "@/components/order-info";
import { statusCheckpoints, statusToCheckpoint } from "@/components/order-progress-icon";
import { useOrderStatus } from "@/hooks/use-order-status";
import { useTokens } from "@/hooks/use-tokens";
import {  Token } from "@shushfi/sdk";
import { cva } from "class-variance-authority";
import React, { PropsWithChildren } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface StepProps {
  icon: React.ReactElement;
  state: "pending" | "current" | "completed" | "failed";
  children?: React.ReactNode;
}

const stepIconVariants = cva("sh-w-h-10 sh-w-border sh-w-border-2 sh-w-w-10 sh-w-rounded-full sh-w-flex sh-w-items-center sh-w-justify-center", {
  variants: {
    state: {
      pending: "sh-w-text-muted-foreground sh-w-bg-muted sh-w-border-muted",
      current: "sh-w-text-secondary-foreground sh-w-bg-secondary sh-w-border-primary", 
      completed: "sh-w-text-primary-foreground sh-w-bg-primary sh-w-border-primary",
      failed: "sh-w-text-destructive-foreground sh-w-bg-destructive sh-w-border-destructive",
    }
  },
})

const Step = ({ icon, state, children }: PropsWithChildren<StepProps>) => {
  return (
    <div className="sh-w-flex sh-w-flex-row sh-w-items-center sh-w-gap-x-2">
      <div className={stepIconVariants({ state })}>
        {React.cloneElement(icon, { className: "sh-w-w-5 sh-w-h-5" })}
      </div>
      <div className="">
        {children}
      </div>
    </div>
  )
};

const stepSeparatorVariants = cva("sh-w-h-6 sh-w-w-[2px] sh-w-ml-[19px]", {
  variants: {
    state: {
      completed: "sh-w-bg-primary",
      pending: "sh-w-bg-muted",
      failed: "sh-w-bg-destructive",
    }
  },
  defaultVariants: {
    state: "pending"
  }
})

const StepSeparator = ({state}: {state?: "completed" | "failed" | "pending"}) => {
  return (
    <div className={stepSeparatorVariants({ state })} />
  )
}

// 0 - Waiting, The order is waiting for the user to deposit funds.
// 1 - Confirming, The order is waiting for confirmations.
// 2 - Exchanging, The order is exchanging.
// 3 - Anonymizing, The order is anonymizing.
// 4 - Finished, The order has been completed.


export function DetailedOrderView() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading: isLoadingStatus } = useOrderStatus({ id });
  const { data: tokens, isLoading: isLoadingTokens } = useTokens();
  const navigate = useNavigate();

  const { inToken, outToken } = useMemo(() => {
    if (!order || !tokens) return { inToken: undefined, outToken: undefined };

    return {
      inToken: tokens.find((t: Token) => t.id === order.inToken),
      outToken: tokens.find((t: Token) => t.id === order.outToken),
    };
  }, [order, tokens]);

  const filteredCheckpoints = useMemo(() => {
    if (!order) return [];
    
    const baseCheckpoints = statusCheckpoints.filter(checkpoint => [0,1,2,3].includes(checkpoint.status));

    if (order.status < 5) return [...baseCheckpoints, statusToCheckpoint[4]]
    if (order.status === 5) return [...baseCheckpoints, statusToCheckpoint[5]]

    return [...baseCheckpoints, statusToCheckpoint[order.status]]
  }, [order])

  const renderedCheckpoints = useMemo(() => {
    if (!order) return [];

    const hasFailed = [5,6,7,8].includes(order.status);

     return filteredCheckpoints.map((checkpoint, index) => {
      const isLast = index === filteredCheckpoints.length - 1;
      
      return (
        <div key={index} className="sh-w-flex sh-w-flex-col">
          <Step icon={checkpoint.icon} state={hasFailed ? "failed" : order.status === checkpoint.status ? "current" : order?.status > checkpoint.status ? "completed" : "pending"}>
            <div className={hasFailed && !isLast ? "sh-w-opacity-50" :""}>
              {checkpoint.content(order)}
            </div>
          </Step>
          {index !== filteredCheckpoints.length - 1 && <StepSeparator state={hasFailed ? "failed": order.status > checkpoint.status || order.status === 4 ? "completed" : "pending"} />}
        </div>
      )
    })
  }, [order, filteredCheckpoints]);

  const isLoading = isLoadingStatus || isLoadingTokens;

  return (
    <div>
      <Header title={"Track Transaction"} subtitle={order?.id} onBack={() => navigate(-1)} />

      {isLoading ? (
        <Loading />
      ) : (
        order ? (
          <>
          {
            order.status !== 8 && (
          <div className="sh-w-mx-5 sh-w-mb-4 sh-w-mt-4 sh-w-p-3 sh-w-rounded-md sh-w-border ">
            <OrderInfo order={order} inToken={inToken} outToken={outToken} />
          </div>
            )
          }
          <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-4 sh-w-px-8 sh-w-mt-8">
            <div>
              {renderedCheckpoints} 
            </div>
          </div>
          </>
        ) : (
          <div>
            <div className="sh-w-flex sh-w-flex-col sh-w-items-center sh-w-gap-y-4 sh-w-px-8 sh-w-mt-8">
              Order not found.
              </div>
          </div>
        )
      )}

    </div>
  );
}
