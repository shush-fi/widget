import { QueryClient, QueryClientProvider } from "react-query";
import { Theme } from "@/types";
import { WidgetProvider } from "@/components/widget-provider";
import { Widget } from "@/components/widget";
import { defaults } from "@/lib/constants";
import { useMemo } from "react";
import { createShush } from "@/lib/shush";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";

const queryClient = new QueryClient();

interface ShushConfig {
  integratorId: string;
  apiUrl?: string;
  theme?: Theme;
}

export function Shush({ config }: { config: ShushConfig }) {
  const shush = useMemo(() => {
    return createShush({ integratorId: config.integratorId });
  }, [config.integratorId, config.apiUrl]);

  return (
    <QueryClientProvider client={queryClient}>
      <WidgetProvider
        apiUrl={config.apiUrl ?? defaults.apiUrl}
        integratorId={config.integratorId ?? defaults.integratorId}
        shush={shush}
        theme={defaults.theme}
      >
        <div className="sh-w-max-w-[440px]">
          <ThemeProvider>
            <Widget />
          </ThemeProvider>
        </div>
      </WidgetProvider>
    </QueryClientProvider>
  );
}
