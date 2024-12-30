import axios, {AxiosRequestConfig, AxiosResponse} from "axios";


export interface R<D>{
    code: number,
    msg: string,
    data?: D
}


export const BaseUrl = "/api/v1";


export class Http {
    protected async post<D>(url:string,data:object, options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
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
    protected async get<D>(url:string,options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.get(
                BaseUrl + url,
                options
            )
        }else {
            return await axios.get(
                BaseUrl + url,
            )
        }
    }
    protected async put<D>(url:string,data:object, options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.put(
                BaseUrl + url,
                data,
                options
            )
        }else {
            return await axios.put(
                BaseUrl + url,
                data,
            )
        }
    }
    protected async delete<D>(url:string,options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.delete(
                BaseUrl + url,
                options
            )
        }else {
            return await axios.delete(
                BaseUrl + url,
            )
        }
    }
    protected async patch<D>(url:string,data:object, options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.patch(
                BaseUrl + url,
                data,
                options
            )
        }else {
            return await axios.patch(
                BaseUrl + url,
                data,
            )
        }
    }
    protected async head<D>(url:string,options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.head(
                BaseUrl + url,
                options
            )
        }else {
            return await axios.head(
                BaseUrl + url,
            )
        }
    }
    protected async options<D>(url:string,options?: AxiosRequestConfig<object>): Promise<AxiosResponse<R<D>, never>>{
        if (options){
            return await axios.options(
                BaseUrl + url,
                options
            )
        }else {
            return await axios.options(
                BaseUrl + url,
            )
        }
    }
}