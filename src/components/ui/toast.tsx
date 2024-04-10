import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "sh-w-fixed sh-w-z-[100] sh-w-flex sh-w-max-h-screen sh-w-w-full sh-w-flex-col-reverse sh-w-p-4 sh-w-top-0 sh-w-right-0 sh-w-bottom-auto",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "sh-w-group sh-w-pointer-events-auto sh-w-relative sh-w-flex sh-w-w-full sh-w-items-center sh-w-justify-between sh-w-space-x-4 sh-w-overflow-hidden sh-w-rounded-md sh-w-border sh-w-p-6 sh-w-pr-8 sh-w-shadow-lg sh-w-transition-all data-[swipe=cancel]:sh-w-translate-y-0 data-[swipe=end]:sh-w-translate-y-[var(--radix-toast-swipe-end-y)] data-[swipe=move]:sh-w-translate-y-[var(--radix-toast-swipe-move-y)] data-[swipe=move]:sh-w-transition-none data-[state=open]:sh-w-animate-in data-[state=closed]:sh-w-animate-out data-[swipe=end]:sh-w-animate-out data-[state=closed]:sh-w-fade-out-80 data-[state=closed]:sh-w-slide-out-to-top data-[state=open]:sh-w-slide-in-from-bottom data-[state=open]:sm:sh-w-slide-in-from-top",
  {
    variants: {
      variant: {
        default: "sh-w-border sh-w-bg-background sh-w-text-foreground",
        destructive:
          "sh-w-destructive sh-w-group sh-w-border-destructive sh-w-bg-destructive sh-w-text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "sh-w-inline-flex sh-w-h-8 sh-w-shrink-0 sh-w-items-center sh-w-justify-center sh-w-rounded-md sh-w-border sh-w-bg-transparent sh-w-px-3 sh-w-text-sm sh-w-font-medium sh-w-ring-offset-background sh-w-transition-colors hover:sh-w-bg-secondary focus:sh-w-outline-none focus:sh-w-ring-2 focus:sh-w-ring-ring focus:sh-w-ring-offset-2 disabled:sh-w-pointer-events-none disabled:sh-w-opacity-50 group-[.destructive]:sh-w-border-muted/40 group-[.destructive]:hover:sh-w-border-destructive/30 group-[.destructive]:hover:sh-w-bg-destructive group-[.destructive]:hover:sh-w-text-destructive-foreground group-[.destructive]:focus:sh-w-ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "sh-w-absolute sh-w-right-2 sh-w-top-2 sh-w-rounded-md sh-w-p-1 sh-w-text-foreground/50 sh-w-opacity-0 sh-w-transition-opacity hover:sh-w-text-foreground focus:sh-w-opacity-100 focus:sh-w-outline-none focus:sh-w-ring-2 group-hover:sh-w-opacity-100 group-[.destructive]:sh-w-text-red-300 group-[.destructive]:hover:sh-w-text-red-50 group-[.destructive]:focus:sh-w-ring-red-400 group-[.destructive]:focus:sh-w-ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="sh-w-h-4 sh-w-w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("sh-w-text-sm sh-w-font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("sh-w-text-sm sh-w-opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
