import {Http} from "@/api/http.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {RepoModel} from "@/api/dto/RepoDto.tsx";

export class RepoAPi extends Http{
    async Info(owner: string, repo: string): Promise<AxiosResponse<R<RepoModel>, never>> {
        return await this.get(`/repos/${owner}/${repo}`)
    }
    async Search(keyword: string, page: number, size: number): Promise<AxiosResponse<R<RepoModel[]>, never>> {
        return await this.get(`/search/repos?keyword=${keyword}&page=${page}&size=${size}`)
    }
}