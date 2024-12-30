import {Http, R} from "../HTTP.tsx";
import {AxiosResponse} from "axios";
import {RepoCreateOptions, RepoCreateOwnerList} from "../model/RepoModel.tsx";

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
}