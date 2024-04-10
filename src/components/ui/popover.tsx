import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "sh-w-z-50 sh-w-w-72 sh-w-rounded-md sh-w-border sh-w-bg-popover sh-w-p-4 sh-w-text-popover-foreground sh-w-shadow-md sh-w-outline-none data-[state=open]:sh-w-animate-in data-[state=closed]:sh-w-animate-out data-[state=closed]:sh-w-fade-out-0 data-[state=open]:sh-w-fade-in-0 data-[state=closed]:sh-w-zoom-out-95 data-[state=open]:sh-w-zoom-in-95 data-[side=bottom]:sh-w-slide-in-from-top-2 data-[side=left]:sh-w-slide-in-from-right-2 data-[side=right]:sh-w-slide-in-from-left-2 data-[side=top]:sh-w-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
