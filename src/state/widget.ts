import { defaults } from "@/lib/constants";
import { Theme } from "@/types";
import { Shush } from "@shushfi/sdk";
import { createContext } from "react";
import { createStore } from "zustand";

export interface WidgetProps {
  apiUrl: string;
  integratorId: string;
  shush: Shush;
  theme: Theme;
}

export interface WidgetState extends WidgetProps {
  // setApiUrl: (apiUrl: string) => void;
}

export type WidgetStore = ReturnType<typeof createWidgetStore>;

export const createWidgetStore = (initProps?: Partial<WidgetProps>) => {
  const DEFAULT_PROPS: WidgetProps = {
    apiUrl: defaults.apiUrl,
    shush: new Shush({ integratorId: defaults.integratorId }),
    integratorId: defaults.integratorId,
    theme: defaults.theme,
  };

  return createStore<WidgetState>()(() => ({
    ...DEFAULT_PROPS,
    ...initProps,
    // setApiUrl: (apiUrl) => set(() => ({ apiUrl })),
  }));
};

export const WidgetContext = createContext<WidgetStore | null>(null);
