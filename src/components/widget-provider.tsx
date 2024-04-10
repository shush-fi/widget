import {
  WidgetContext,
  WidgetProps,
  WidgetStore,
  createWidgetStore,
} from "@/state/widget";
import { useRef } from "react";

type WidgetProviderProps = React.PropsWithChildren<WidgetProps>;

export const WidgetProvider = ({ children, ...props }: WidgetProviderProps) => {
  const storeRef = useRef<WidgetStore>();
  if (!storeRef.current) {
    storeRef.current = createWidgetStore(props);
  }

  return (
    <WidgetContext.Provider value={storeRef.current}>
      {children}
    </WidgetContext.Provider>
  );
};
