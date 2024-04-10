import { ArrowLeft} from "lucide-react";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  subtitle?: string;
}

export const Header = ({ title, onBack, actions, subtitle }: HeaderProps) => {
  return (
    <div className="sh-w-relative sh-w-h-16 sh-w-flex sh-w-items-center sh-w-justify-center">
      
      {actions && (
        <div className="sh-w-absolute sh-w-right-4">
          {actions}
        </div>
      )}
      {onBack && (
        <button onClick={onBack} className="sh-w-absolute sh-w-left-4">
          <ArrowLeft className="sh-w-w-5 sh-w-h-5" />
        </button>
      )}
      <div className="sh-w-flex sh-w-flex-col sh-w-items-center sh-w-text-center">
        <span className="sh-w-font-semibold">{title}</span>
        {subtitle && <span className="sh-w-text-xs sh-w-text-muted-foreground">
          {subtitle}
        </span> 
        }
      </div>
      {actions && (
        <div className="sh-w-absolute sh-w-right-4">
          {actions}
        </div>
      )}
    </div>
  );
};
