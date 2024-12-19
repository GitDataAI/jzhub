import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {Http} from "@/api/http.tsx";
import {EmailBind, EmailModel} from "@/api/dto/EmailDto.tsx";
import {UserFollowerOv, UserKeyCreate, UserKeyOv, UserUpdate} from "@/api/dto/UserDto.tsx";
import {RepoCreate, RepoModel} from "@/api/dto/RepoDto.tsx";
import {UserOv} from "@/api/dto/UsersDto.tsx";
import {GroupDesc} from "@/api/dto/GroupDto.tsx";

export class UserAPi extends Http{
    async PostAvatar(bytes: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.post('/user/avatar',{
            byte: bytes
        })
    }
    async GetLocalAvatar():Promise<AxiosResponse<R<string>, never>>{
        return await this.get('/user/avatar',{})
    }
    async DeleteLocalAvatar():Promise<AxiosResponse<R<string>, never>>{
        return await this.delete('/user/avatar',{})
    }
    async GetLocalEmails():Promise<AxiosResponse<R<EmailModel[]>, never>>{
        return await this.get('/user/emails',{})
    }
    async BindEmail(dto: EmailBind):Promise<AxiosResponse<R<string>, never>>{
        return await this.post('/user/emails',dto)
    }
    async UnbindEmail(dto: EmailBind):Promise<AxiosResponse<R<string>, never>>{
        return await this.patch('/user/emails',dto)
    }
    async LocalFollowers():Promise<AxiosResponse<R<UserFollowerOv[]>, never>>{
        return await this.get('/user/followers',{})
    }
    async LocalFollowing():Promise<AxiosResponse<R<UserFollowerOv[]>, never>>{
        return await this.get('/user/following',{})
    }
    async LocalAddFollow(username: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.put(`/user/following/${username}`,{})
    }
    async LocalDeleteFollow(username: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.delete(`/user/following/${username}`,{})
    }
    async GetLocalKeys():Promise<AxiosResponse<R<UserKeyOv[]>, never>>{
        return await this.get('/user/keys',{})
    }
    async PostLocalCreateKeys(dto:UserKeyCreate):Promise<AxiosResponse<R<string>, never>>{
        return await this.post('/user/keys',dto)
    }
    async DeleteLocalKeys(uid: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.delete(`/user/keys/${uid}`,{})
    }
    async GetLocalOnceKeysInfo(uid: string):Promise<AxiosResponse<R<UserKeyOv>, never>>{
        return await this.get(`/user/keys/${uid}`,{})
    }
    async GetLocalRepositories():Promise<AxiosResponse<R<RepoModel[]>, never>>{
        return await this.get('/user/repos',{})
    }
    async CreateRepo(dto: RepoCreate):Promise<AxiosResponse<R<string>, never>>{
        return await this.post('/user/repos',dto)
    }
    async GetLocalSetting():Promise<AxiosResponse<R<UserOv>, never>>{
        return await this.get('/user/settings',{})
    }
    async UpdateLocalSetting(dto: UserUpdate):Promise<AxiosResponse<R<string>, never>>{
        return await this.patch('/user/settings',dto)
    }
    async GetLocalStarred():Promise<AxiosResponse<R<RepoModel[]>, never>>{
        return await this.get('/user/starred',{})
    }
    async DeleteLocalStarred(owner: string, repo: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.delete(`/user/starred/${owner}/${repo}`,{})
    }
    async PutLocalStarred(owner: string, repo: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.put(`/user/starred/${owner}/${repo}`,{})
    }
    async GetLocalSubscriptions():Promise<AxiosResponse<R<RepoModel[]>, never>>{
        return await this.get('/user/subscriptions',{})
    }
    async DeleteLocalSubscriptions(owner: string, repo: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.delete(`/user/subscriptions/${owner}/${repo}`,{})
    }
    async PutLocalSubscriptions(owner: string, repo: string):Promise<AxiosResponse<R<string>, never>>{
        return await this.put(`/user/subscriptions/${owner}/${repo}`,{})
    }
    async GetLocalGroup():Promise<AxiosResponse<R<GroupDesc[]>, never>>{
        return await this.get('/user/groups',{})
    }
}