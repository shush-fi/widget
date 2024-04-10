import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export interface CopyFieldProps {
  value?: string;
}

export const CopyField = ({ value }: CopyFieldProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true)
    setTimeout(() => setCopied(false), 1000);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="sh-w-flex sh-w-items-center sh-w-h-10 sh-w-border sh-w-border-input sh-w-rounded sh-w-w-full">
      <input
        readOnly
        onFocus={handleFocus}
        className={cn("sh-w-w-full sh-w-outline-none sh-w-pl-3 sh-w-py-2 sh-w-bg-transparent sh-w-overflow-ellipsis")}
        contentEditable={false}
        value={copied ? "Copied" : value}
      />
      <button onClick={handleCopy} className="sh-w-flex-1 sh-w-px-3 sh-w-py-2">
        {
          copied ? (
            <Check className="sh-w-text-primary sh-w-w-5 sh-w-h-5" />
          ) : (
            <Copy className="sh-w-w-5 sh-w-h-5" />
          )
        }
      </button>
    </div>
  );
};
