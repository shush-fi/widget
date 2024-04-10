"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "sh-w-fixed sh-w-h-full sh-w-inset-0 sh-w-z-50 sh-w-bg-black/70 sh-w-backdrop-blur data-[state=open]:sh-w-animate-in data-[state=closed]:sh-w-animate-out data-[state=closed]:sh-w-fade-out-0 data-[state=open]:sh-w-fade-in-0",
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    backButtonAction?: () => void;
  }
>(({ className, children, backButtonAction, ...props }, ref) => {

  const container = document.getElementById("shush-widget-dialog-container");

  return (
  <DialogPortal container={container}>
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "sh-w-fixed sh-w-h-full sh-w-bottom-0 sh-w-top-0 sh-w-left-0 sh-w-z-50 sh-w-w-full sh-w-grid sh-w-gap-4 sh-w-bg-card sh-w-duration-200 sh-w-overflow-hidden sh-w-rounded-[inherit]",
        className
      )}
      {...props}
    >
      {children}
      {backButtonAction && (
        <button
          onClick={backButtonAction}
          className="sh-w-absolute sh-w-left-4 sh-w-top-4 sh-w-opacity-70 sh-w-ring-offset-background sh-w-transition-opacity hover:sh-w-opacity-100 focus:sh-w-outline-none focus:sh-w-ring-2 focus:sh-w-ring-ring focus:sh-w-ring-offset-2 disabled:sh-w-pointer-events-none data-[state=open]:sh-w-bg-accent data-[state=open]:sh-w-text-muted-foreground"
        >
          <ArrowLeft className="sh-w-h-4 sh-w-w-4" />
          <span className="sh-w-sr-only">Back</span>
        </button>
      )}
      <DialogPrimitive.Close className="sh-w-absolute sh-w-right-4 sh-w-top-4 sm sh-w-opacity-70 sh-w-ring-offset-background sh-w-transition-opacity hover:sh-w-opacity-100 focus:sh-w-outline-none focus:sh-w-ring-2 focus:sh-w-ring-ring focus:sh-w-ring-offset-2 disabled:sh-w-pointer-events-none data-[state=open]:sh-w-bg-accent data-[state=open]:sh-w-text-muted-foreground">
        <X className="sh-w-h-4 sh-w-w-4" />
        <span className="sh-w-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>

  )
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sh-w-flex sh-w-flex-col sh-w-space-y-1.5 sh-w-text-center sm:sh-w-text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sh-w-flex sh-w-flex-col-reverse sm:sh-w-flex-row sm:sh-w-justify-end sm:sh-w-space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "sh-w-text-lg sh-w-font-semibold sh-w-leading-none sh-w-tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("sh-w-text-sm sh-w-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
