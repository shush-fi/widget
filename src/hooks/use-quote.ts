import { useApiUrl } from "@/hooks/use-api-url";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

interface UseQuoteOptions {
  fromToken?: string;
  toToken?: string;
  amount?: number;
  isExactOut?: boolean;
  anonymous?: boolean;
  enabled?: boolean;
}

interface Quote {
  amountIn: number;
  amountOut: number;
  min: number;
  max: number;
}

export const useQuote = ({
  fromToken,
  toToken,
  amount,
  isExactOut = false,
  anonymous = false,
  enabled = true,
}: UseQuoteOptions) => {
  const apiUrl = useApiUrl();
  const _queryKey = ["quote", amount, fromToken, toToken, isExactOut, anonymous];

  const fetchQuote = async ({ signal }: { signal?: AbortSignal }) => {
    if (!fromToken || !toToken || amount === undefined) return;

    const url = new URL(apiUrl + "/quote");

    url.searchParams.set("fromToken", fromToken);
    url.searchParams.set("toToken", toToken);
    url.searchParams.set("amount", amount.toString());
    url.searchParams.set("isExactOut", String(Boolean(isExactOut)));
    url.searchParams.set("anonymous", String(Boolean(anonymous)));

    try {
      const response = await axios.get(url.toString(), { signal });
      const { success, data, error } = response.data;

      if (!success) throw new Error(error);

      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        throw new Error(response?.data.error ?? response?.statusText);
      }

      throw new Error(`Failed to fetch quote: ${e}`);
    }
  };

  return useQuery(_queryKey, {
    queryFn: async ({ signal }) => await fetchQuote({ signal }),
    select: (data) => {
      if (!data) return;

      return data.quote as Quote;
    },
    retry: false,
    enabled:
      enabled && !!fromToken && !!toToken && amount !== undefined && amount > 0,
    refetchInterval: 0,
  });
};
