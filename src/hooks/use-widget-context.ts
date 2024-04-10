// Mimic the hook returned by `create`
import { WidgetContext, WidgetState } from "@/state/widget";
import { useContext } from "react";
import { useStore } from "zustand";

export function useWidgetContext<T>(selector: (state: WidgetState) => T): T {
  const store = useContext(WidgetContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
}
