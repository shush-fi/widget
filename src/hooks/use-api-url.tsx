import { useWidgetContext } from "@/hooks/use-widget-context";

export const useApiUrl = () => {
  return useWidgetContext((state) => state.apiUrl);
};
