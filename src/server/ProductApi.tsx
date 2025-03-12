import {HttpClient} from "@/server/Client";
import {DataProductPostParam} from "@/server/types";

export class ProductApi extends HttpClient {
    async Post(owner: string, repo: string, param: DataProductPostParam) {
        return await this.post<string>(`/product/${owner}/${repo}/post`, param)
    }
    async List(limit: number, page: number, order: string, search?: string) {
        return await this.post<string>(`/product/list`, {
            limit: limit,
            page: page,
            order: order,
            search: search
        })
    }
    async Info(uid: string) {
        return await this.get<string>(`/product/info/${uid}`)
    }
    async Download(uid: string) {
        return await this.get<string>(`/product/down/${uid}`, {})
    }
}