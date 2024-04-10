import { useApiUrl } from "@/hooks/use-api-url"
import { useIntegratorId } from "@/hooks/use-integrator-id"
import axios from "axios"
import { useQuery } from "react-query"

export const usePrices = () => {
  const integratorId = useIntegratorId()
  const apiUrl = useApiUrl()

  const getPrices = async () => {
    return axios.get(apiUrl + "/prices", {headers:{
      "Content-Type": "application/json",
      "x-integrator-id": integratorId
    }}).then((res) => res.data)
  }
  
  return useQuery({
    queryKey: "prices",
    queryFn: getPrices,
    refetchInterval: 60000,
    select: (data) => data.data.prices,
  })
}
