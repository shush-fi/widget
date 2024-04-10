import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "sh-w-inline-flex sh-w-items-center sh-w-rounded-full sh-w-border sh-w-px-2.5 sh-w-py-0.5 sh-w-text-xs sh-w-font-semibold sh-w-transition-colors focus:sh-w-outline-none focus:sh-w-ring-2 focus:sh-w-ring-ring focus:sh-w-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "sh-w-border-transparent sh-w-bg-primary sh-w-text-primary-foreground hover:sh-w-bg-primary/80",
        secondary:
          "sh-w-border-transparent sh-w-bg-secondary sh-w-text-secondary-foreground hover:sh-w-bg-secondary/80",
        destructive:
          "sh-w-border-transparent sh-w-bg-destructive sh-w-text-destructive-foreground hover:sh-w-bg-destructive/80",
        outline: "sh-w-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
