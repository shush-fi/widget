import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyText ({ text, copiedText, className }: { text?: string, copiedText?: string, className?: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(copiedText ? copiedText : text);
    setCopied(true)
    setTimeout(() => setCopied(false), 1000);
  }

  return (
      <button onClick={handleCopy} className="sh-w-flex sh-w-items-center sh-w-gap-x-1 ">
        <span className={cn(className)}>{copied ? "Copied" : text}</span>
        {
          copied ? (
            <Check className="sh-w-text-primary sh-w-w-[0.725em] sh-w-h-[0.725em]" />
          ) : (
            <Copy className="sh-w-w-[0.725em] sh-w-h-[0.725em]" />
          )
        }
      </button>)
}


