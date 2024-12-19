import {Http} from "@/api/http.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {RepoBranchModel, RepoCommitModel, RepoModel, RepoTree} from "@/api/dto/RepoDto.tsx";

export class RepoAPi extends Http{
    async Info(owner: string, repo: string): Promise<AxiosResponse<R<RepoModel>, never>> {
        return await this.get(`/repos/${owner}/${repo}`)
    }
    async Search(keyword: string, page: number, size: number): Promise<AxiosResponse<R<RepoModel[]>, never>> {
        return await this.get(`/search/repos?keyword=${keyword}&page=${page}&size=${size}`)
    }
    async GetBranch(owner: string, repo: string): Promise<AxiosResponse<R<RepoBranchModel[]>, never>> {
        return await this.get(`/repos/${owner}/${repo}/branches`)
    }
    async GetOnceBranch(owner: string, repo: string, branch: string): Promise<AxiosResponse<R<RepoBranchModel>, never>> {
        return await this.get(`/repos/${owner}/${repo}/branches/${branch}`)
    }
    async GetCommit(owner: string, repo: string, branch: string): Promise<AxiosResponse<R<RepoCommitModel[]>, never>> {
        return await this.get(`/repos/${owner}/${repo}/commits/${branch}`)
    }
    async GetOnceCommit(owner: string, repo: string, branch: string, ref: string): Promise<AxiosResponse<R<RepoCommitModel>, never>> {
        return await this.get(`/repos/${owner}/${repo}/commits/${branch}/${ref}/status`)
    }
    async Tree(owner: string, repo: string, branch: string): Promise<AxiosResponse<R<RepoTree>, never>> {
        return await this.get(`/repos/${owner}/${repo}/tree/${branch}`)
    }
}