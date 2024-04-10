import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";

export const useLocalOrderIds = () => {
  const [orders, setOrders] = useLocalStorage<{ id: string; expiry: number }[]>(
    "shush-widget-orders",
    []
  );

  useEffect(() => {
    const ordersToKeep = orders.filter((order) => order.expiry > Date.now());
    setOrders(ordersToKeep);
  }, [orders, setOrders]);

  return [orders, setOrders] as const;
};
