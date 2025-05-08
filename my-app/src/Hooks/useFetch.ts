import {UseQueryResult, useQuery} from "@tanstack/react-query"
import {  api, privateAxios } from "../Services/axios/Api&Interceptors"

const useFetch =<T>(queryKey:string,url:string,isPublic:boolean=true):UseQueryResult<T>=>{
    return useQuery({
        queryKey:[queryKey],
        queryFn:async()=>{
            const res = await(isPublic ?  api.get<T>(url) : privateAxios.get<T>(url));
            return res.data
        }
    })
} 

export default useFetch;