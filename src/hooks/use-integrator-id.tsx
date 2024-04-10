import { useWidgetContext } from "@/hooks/use-widget-context";

export const useIntegratorId = () => {
  return useWidgetContext(state => state.integratorId)
}
