import { SwapView, OrderView, OrdersView } from "@/components/views";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DetailedOrderView } from "@/components/views/orders.$id.detailed";
import { Toaster } from "@/components/ui/toaster";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <Outlet />,
      children: [
        { path: "swap", element: <SwapView /> },
        {
          path: "orders",
          element: <OrdersView />,
        },
        {
          path: "orders/:id",
          element: <OrderView />,
          // element: <DetailedOrderView />
        },
        {
          path: "orders/:id/detailed",
          // element: <OrderView />,
          element: <DetailedOrderView />
        },
      ],
    },
  ],
  {
    initialEntries: ["/swap"],
  }
);

export interface WidgetProps {
  className?: string;
}

export function Widget({ className }: WidgetProps) {
  return (
    <TooltipProvider delayDuration={50}>
        <div
        id={"shush-widget-dialog-container"}           className={cn(
            "sh-w-w-full sh-w-font-sans sh-w-@container sh-w-h-full sh-w-min-h-[684px] sh-w-flex sh-w-flex-col sh-w-bg-background sh-w-text-foreground sh-w-rounded-lg ",
            className
          )}
        >
          <RouterProvider router={router} />
        <Toaster />
        </div>
    </TooltipProvider>
  );
}
