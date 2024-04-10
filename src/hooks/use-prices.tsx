import { useApiUrl } from "@/hooks/use-api-url"
import axios from "axios"
import { useQuery } from "react-query"

export const usePrices = () => {
  const apiUrl = useApiUrl()

  const getPrices = async () => {
    return axios.get(apiUrl + "/prices").then((res) => res.data)
  }
  
  return useQuery({
    queryKey: "prices",
    queryFn: getPrices,
    refetchInterval: 60000,
    select: (data) => data.data.prices,
  })
}
