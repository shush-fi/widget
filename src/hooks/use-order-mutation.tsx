import { useMutation } from "react-query";
import { useApiUrl } from "@/hooks/use-api-url";
import { useIntegratorId } from "@/hooks/use-integrator-id";

interface CreateOrderMutationVariables {
  amount?: number;
  fromToken?: string;
  toToken?: string;
  toAddress?: string;
  anonymous?: boolean;
  isExactOut?: boolean;
  memo?: string;
}

export const useCreateOrderMutation = () => {
  const integratorId = useIntegratorId()
  const apiUrl = useApiUrl();

  const createOrder = async ({
    amount,
    fromToken,
    toToken,
    toAddress,
    anonymous = false,
    isExactOut = false,
    memo = "",
  }: CreateOrderMutationVariables) => {
    const payload = JSON.stringify({
      amount,
      fromToken,
      toToken,
      toAddress,
      anonymous,
      isExactOut,
      memo,
    });

    try {
      const response = await fetch(apiUrl + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": integratorId,
        },
        body: payload,
      });

      const { success, data, error } = await response.json();

      if (!success) throw new Error(error);

      return data.order;
    } catch (e) {
      throw new Error(`Failed to create order: ${e}`);
    }
  };

  return useMutation({
    mutationFn: createOrder,
    onSuccess: ({ id }) => {
      if (id !== undefined && id !== null) {
        const orders: { id: string; expiry: number }[] = JSON.parse(
          window.localStorage.getItem("shush-widget-orders") || "[]"
        );

        console.log({ orders });

        window.localStorage.setItem(
          "shush-widget-orders",
          JSON.stringify([...orders, { expiry: Date.now() + 14400000, id }])
        );
      }
    },
  });
};
