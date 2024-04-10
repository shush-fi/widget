import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { OrderProgressIcon, statusCheckpoints, statusToCheckpoint } from "@/components/order-progress-icon";
import { Spinner } from "@/components/spinner";
import { Layout } from "@/components/views/layout";
import { useLocalOrderIds } from "@/hooks/use-local-order-ids";
import { useOrdersStatus } from "@/hooks/use-order-status";
import { usePrices } from "@/hooks/use-prices";
import { formatAmount, shortenOrderId } from "@/lib/utils";
import { Order } from "@shushfi/sdk";
import { formatDate } from "date-fns";
import { ArrowRight} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderHistoryItem = ({ order }: { order: Order}) => {
  const checkpoint = useMemo(() => {
    return statusToCheckpoint[order.status];
  }, [order])

  return (
    <div className="sh-w-flex sh-w-p-4">
      <div className="sh-w-flex sh-w-gap-x-3">
        <OrderProgressIcon icon={checkpoint.icon} state={checkpoint.status < 4 ? "current" : checkpoint.status === 4 ? "completed" : "failed" } />
        <div className="sh-w-flex sh-w-flex-col sh-w-gap-y-0.5">
          <div className="">
            <div className="sh-w-text-sm sh-w-flex sh-w-items-center sh-w-gap-x-1">
              <span>{formatAmount(order.inAmount!)}</span>
              <span>{order.inToken}</span>
              <ArrowRight className="sh-w-w-3 sh-w-h-3" />
              <span>{formatAmount(order.outAmount!)}</span>
              <span>{order.outToken}</span>
            </div>
          </div>
          <div className="sh-w-flex sh-w-items-center sh-w-gap-x-1 sh-w-text-muted-foreground">
            <span className="sh-w-text-sm">
              {formatDate(order.createdAt!, "HH:mm")}
            </span>
            •
            <span className="sh-w-text-sm">
              {shortenOrderId(order.id)}
            </span>
            •
            <span className="sh-w-text-sm">
              {checkpoint.shortDescription}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersView() {
  const {data:prices }= usePrices()
  
  const [localOrders] = useLocalOrderIds();
  const navigate = useNavigate();

  const {data: ordersData, isLoading} = useOrdersStatus({
    ids: localOrders.map((order) => order.id),
    refetchInterval: false,
  });

  const orders = useMemo(() => {
    if (ordersData === undefined) {
      return [];
    }

    return Object.keys(ordersData).map((key) => ordersData[key]).sort((a, b) => {
      return a.createdAt! > b.createdAt! ? -1 : 1; 
    });
   }, [ordersData])
  
  
  return (
    <Layout>
      <Header onBack={() => navigate(-1)} title={"Order History"} subtitle="Orders vanish after 4 hours"/>
      {
        isLoading && (
          <Loading />
        )
      }
      {orders.map((order) => (
        <Link key={order.id} to={`/orders/${order.id}`}>
          <OrderHistoryItem order={order} />
        </Link>
      ))}
    </Layout>
  );
}
