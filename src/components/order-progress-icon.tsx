import { Order } from "@shushfi/sdk";
import { cva } from "class-variance-authority"
import { Ban, Calculator, Check, EyeOff, MonitorX, PackagePlus, RefreshCcw, TicketSlash, Timer } from "lucide-react";
import React from "react"

interface StatusCheckpoint {
  status: number;
  content: (order: Order) => string;
  icon: React.ReactElement;
  shortDescription?: string;
}

export const statusCheckpoints: StatusCheckpoint[] = [
  { status: -1, content: () => "Order Created", icon: <PackagePlus />, shortDescription: "Created" },
  { status: 0, content: () => "Waiting for deposit", icon: <Timer />, shortDescription: "Waiting" },
  { status: 1, content: () => "Confirming deposit", icon: <Calculator/>, shortDescription: "Confirming" },
  { status: 2, content: () => "Exchanging", icon: <RefreshCcw />, shortDescription: "Exchanging" },
  { status: 3, content: () => "Anonymizing", icon: <EyeOff />, shortDescription: "Anonymizing" },
  { status: 4, content: () => "Order Completed", icon: <Check />, shortDescription: "Completed" },
  { status: 5, content: () => "Order Expired", icon: <Timer />, shortDescription: "Expired" },
  { status: 6, content: () => "Order Failed", icon: <Ban />, shortDescription: "Failed" },
  { status: 7, content: () => "Order Refunded", icon: <TicketSlash />, shortDescription: "Refunded"},
  { status: 8, content: () => "Order Deleted", icon: <MonitorX />, shortDescription: "Deleted" }
];

export const statusToCheckpoint = statusCheckpoints.reduce((acc, checkpoint) => {
  acc[checkpoint.status] = checkpoint;
  return acc;
}, {} as Record<number, StatusCheckpoint>)

const progressIconVariants = cva("sh-w-h-10 sh-w-border sh-w-border-2 sh-w-w-10 sh-w-rounded-full sh-w-flex sh-w-items-center sh-w-justify-center", {
  variants: {
    state: {
      pending: "sh-w-text-muted-foreground sh-w-bg-muted sh-w-border-muted",
      current: "sh-w-text-secondary-foreground sh-w-bg-secondary sh-w-border-primary", 
      completed: "sh-w-text-primary-foreground sh-w-bg-primary sh-w-border-primary",
      failed: "sh-w-text-destructive-foreground sh-w-bg-destructive sh-w-border-destructive",
    }
  },
})

type OrderProgressState = "pending" | "current" | "completed" | "failed"

export const OrderProgressIcon = ({ state, icon }: { state: OrderProgressState, icon: React.ReactElement}) => {
  return <div className={progressIconVariants({ state })}>
    {React.cloneElement(icon, { className: "sh-w-w-5 sh-w-h-5" })}
  </div>
}
