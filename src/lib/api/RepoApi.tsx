import {Http, R} from "../HTTP.tsx";
import {AxiosResponse} from "axios";
import {BlobTreeMsg, BranchModel, RepoCreateOptions, RepoCreateOwnerList, RepoModel} from "../model/RepoModel.tsx";

export class RepoApi extends Http {
    async CreateOwnerList():Promise<AxiosResponse<R<RepoCreateOwnerList[]>, never>>{
        return await this.get<RepoCreateOwnerList[]>("/repo/check/owner");
    }
    async CheckRepoName(owner: string, name: string):Promise<AxiosResponse<R<boolean>, never>>{
        return await this.get<boolean>(`/repo/check/name/${owner}/${name}`);
    }
    async CreateRepo(option: RepoCreateOptions):Promise<AxiosResponse<R<string>, never>>{
        return await this.post<string>("/repo",option);
    }
    async RepoInfo(owner:string, repo:string):Promise<AxiosResponse<R<RepoModel>,never>>{
        return await this.get<RepoModel>(`/repo/${owner}/${repo}`);
    }
    async GetBranch(owner:string,repo:string):Promise<AxiosResponse<R<BranchModel[]>, never>>{
        return await this.get(`/repo/${owner}/${repo}/branch`)
    }
    async GetTree(owner:string, repo:string, branch:string):Promise<AxiosResponse<R<BlobTreeMsg>, never>>{
        return await this.get(`/repo/${owner}/${repo}/branch/${branch}/tree`)
    }
}