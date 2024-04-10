import { useTokens } from "@/hooks/use-tokens";
import { useMemo } from "react";

export const useNetworks = () => {
  const { data: tokens } = useTokens();

  const networks = useMemo(() => {
    if (!tokens) return;

    return Array.from(
      new Set(tokens.map((token) => JSON.stringify(token.network)))
    ).map(
      (network) => JSON.parse(network) as (typeof tokens)[number]["network"]
    );
  }, [tokens]);

  return networks;
};
