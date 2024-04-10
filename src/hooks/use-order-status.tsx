import { useShush } from "@/hooks/use-shush";
import { useQuery } from "react-query";
import { Order } from "@shushfi/sdk";

export function useOrdersStatus ({ 
  ids, 
  refetchInterval }: { 
    ids?: string[], 
    refetchInterval?: 
      | number  
      |  false
      | ((data: Record<string, Order>| undefined)  => number | false) }) {
      
  const shush = useShush();

  return useQuery(["orders-status", ids?.join(",")], {
    queryFn: async () => await shush.getOrders(ids!),
    refetchInterval: refetchInterval ?? 5000,
    enabled: !!ids,
  });
};

export function useOrderStatus({
  id,
  refetchInterval,
}: {
  id?: string;
  refetchInterval?:
    | number
    | false
    | ((data: Order | undefined) => number | false);
}) {
  const shush = useShush();

  return useQuery(["order-status", id], {
    queryFn: async () => await shush.getOrder(id!),
    refetchInterval: refetchInterval ?? 5000,
    enabled: !!id,
  });
}
