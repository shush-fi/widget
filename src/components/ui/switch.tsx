"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    qualitative?: boolean;
  }
>(({ className, qualitative, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "sh-w-peer sh-w-inline-flex sh-w-h-6 sh-w-w-11 sh-w-shrink-0 sh-w-cursor-pointer sh-w-items-center sh-w-rounded-full sh-w-border-2 sh-w-border-transparent sh-w-transition-colors focus-visible:sh-w-outline-none focus-visible:sh-w-ring-2 focus-visible:sh-w-ring-ring focus-visible:sh-w-ring-offset-2 focus-visible:sh-w-ring-offset-background disabled:sh-w-cursor-not-allowed disabled:sh-w-opacity-50 sh-w-bg-muted",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "sh-w-pointer-events-none sh-w-block sh-w-h-5 sh-w-w-5 sh-w-rounded-full sh-w-shadow-lg sh-w-ring-0 sh-w-transition-transform data-[state=checked]:sh-w-translate-x-5 data-[state=unchecked]:sh-w-translate-x-0 data-[state=checked]:sh-w-bg-primary data-[state=checked]:sh-w-drop-shadow-switch",
        {
          "sh-w-bg-primary sh-w-drop-shadow-switch": qualitative,
        }
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
