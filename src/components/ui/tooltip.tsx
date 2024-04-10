import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "sh-w-z-50 sh-w-overflow-hidden sh-w-rounded-md sh-w-border sh-w-bg-popover sh-w-px-3 sh-w-py-1.5 sh-w-text-sm sh-w-text-popover-foreground sh-w-shadow-md sh-w-animate-in sh-w-fade-in-0 sh-w-zoom-in-95 data-[state=closed]:sh-w-animate-out data-[state=closed]:sh-w-fade-out-0 data-[state=closed]:sh-w-zoom-out-95 data-[side=bottom]:sh-w-slide-in-from-top-2 data-[side=left]:sh-w-slide-in-from-right-2 data-[side=right]:sh-w-slide-in-from-left-2 data-[side=top]:sh-w-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
