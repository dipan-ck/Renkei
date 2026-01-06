

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";


export const useSubscription = () => {

    return useQuery({
        queryKey: ["subscription"],
        queryFn: async() => {
             const {data} = await authClient.customer.state()
             return data;
        }
    })

}



export  const useCheckActiveSubscription = () => {
    const {data: customerSubscription, isLoading, ...rest} = useSubscription()

    const isHavingSubscription = customerSubscription?.activeSubscriptions && customerSubscription?.activeSubscriptions.length > 0


    return  {
        isHavingSubscription,
        isLoading,
        subscription : customerSubscription?.activeSubscriptions[0],
        ...rest
    }


}