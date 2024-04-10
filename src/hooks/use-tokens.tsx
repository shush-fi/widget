import { useShush } from "@/hooks/use-shush";
import { useQuery } from "react-query";

export const useTokens = () => {
  const shush = useShush();
  const queryKey = ["tokens"];

  const fetchTokens = async () => {
    const tokens = await shush.getTokens();
    return tokens;
  };

  return useQuery(queryKey, fetchTokens);
};
