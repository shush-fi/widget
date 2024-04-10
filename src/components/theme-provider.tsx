import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <div
      style={
        {
          "--shush-widget-background": theme.background,
          "--shush-widget-foreground": theme.foreground,
          "--shush-widget-card": theme.card,
          "--shush-widget-card-foreground": theme.cardForeground,
          "--shush-widget-popover": theme.popover,
          "--shush-widget-popover-foreground": theme.popoverForeground,
          "--shush-widget-primary": theme.primary,
          "--shush-widget-primary-foreground": theme.primaryForeground,
          "--shush-widget-secondary": theme.secondary,
          "--shush-widget-secondary-foreground": theme.secondaryForeground,
          "--shush-widget-muted": theme.muted,
          "--shush-widget-muted-foreground": theme.mutedForeground,
          "--shush-widget-accent": theme.accent,
          "--shush-widget-accent-foreground": theme.accentForeground,
          "--shush-widget-destructive": theme.destructive,
          "--shush-widget-destructive-foreground": theme.destructiveForeground,
          "--shush-widget-border": theme.border,
          "--shush-widget-input": theme.input,
          "--shush-widget-input-foreground": theme.inputForeground,
          "--shush-widget-ring": theme.ring,
          "--shush-widget-radius": theme.radius,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
