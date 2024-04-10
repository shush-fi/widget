import { useWidgetContext } from "@/hooks/use-widget-context";

export const useShush = () => {
  return useWidgetContext((state) => state.shush);
};
