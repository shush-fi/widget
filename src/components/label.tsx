import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { useState } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  tooltip?: string;
}

export const Label = ({ children, tooltip, ...props }: LabelProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const isTouchDevice = useTouchDevice();

  if (!tooltip) {
    return <label {...props}>{children}</label>;
  }

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (isTouchDevice) {
      e.preventDefault();
    }
    toggleTooltip();
  };

  const mobileProps = isTouchDevice
    ? {
        onClick: handleLabelClick,
        role: "presentation",
      }
    : {};

  const toggleTooltip = () => {
    setTooltipOpen((prev) => !prev);
  };

  return (
    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <TooltipTrigger>
        <label {...props} {...mobileProps}>
          {children}
        </label>
      </TooltipTrigger>
      <TooltipContent className="sh-w-max-w-sm">{tooltip}</TooltipContent>
    </Tooltip>
  );
};
