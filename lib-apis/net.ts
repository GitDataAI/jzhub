import axios, {AxiosError, type AxiosInstance, type AxiosResponse} from "axios"

export class Net {
  protected server: AxiosInstance;
  constructor() {
    this.server = axios.create({
      baseURL: "/api/v1",
    });
  }
  async get<T>(url: string, params?: any, header?: any):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.get<T>(url, {
      method: "GET",
      headers: header,
      params: params,
    });
  }
  async post<T>(url: string, data?: object, params?: any, header?: any):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.post<T>(url, data, {
      method: "POST",
      headers: header,
      params: params,
    });
  }
  async put<T>(url: string, data?: object, params?: Record<string, string>, header?: Record<string, string>):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.put<T>(url, data, {
      headers: header,
      params: params,
    });
  }
  async delete<T>(url: string, params?: Record<string, string>, header?: Record<string, string>):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.delete<T>(url, {
      headers: header,
      params: params,
    });
  }
  async patch<T>(url: string, data?: object, params?: Record<string, string>, header?: Record<string, string>):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.patch<T>(url, data, {
      headers: header,
      params: params,
    });
  }
  async head<T>(url: string, params?: Record<string, string>, header?: Record<string, string>):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.head<T>(url, {
      headers: header,
      params: params,
    });
  }
  async options<T>(url: string, params?: Record<string, string>, header?: Record<string, string>):Promise<AxiosResponse<T, AxiosError>> {
    return await this.server.options<T>(url, {
      headers: header,
      params: params,
    });
  }
}
