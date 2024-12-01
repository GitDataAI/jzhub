import axios, {AxiosResponse} from "axios";
import {Urls} from "@/api/urls.tsx";
import {R} from "@/api/R.tsx";


export const BaseUrl = "/api/v1";


export class Http extends Urls{
    protected async post<D>(url:string,data:object, options?: axios.AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.post(
                BaseUrl + url,
                data,
                options
            )
        }else {
            return await axios.post(
                BaseUrl + url,
                data,
            )
        }
    }
}