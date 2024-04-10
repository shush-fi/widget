import { useWidgetContext } from "@/hooks/use-widget-context";

export const useTheme = () => {
  return useWidgetContext((state) => state.theme);
};
