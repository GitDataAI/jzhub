import {Http, R} from "../HTTP.tsx";
import {SessionModel, UserFollowCount, UsersApply, UsersLogin} from "../model/UserModel.tsx";
import {AxiosResponse} from "axios";
import {RepoModel} from "../model/RepoModel.tsx";

export class UsersApi extends Http{
    async login(option:UsersLogin){
        return await this.post('/users/login',{
            inner: btoa(JSON.stringify(option))
        })
    }
    async logout(){
        return await this.post('/users/logout',{})
    }
    async apply(option:UsersApply){
        return await this.post('/users/apply',{
            inner: btoa(JSON.stringify(option))
        })
    }
    async information(username: string):Promise<AxiosResponse<R<SessionModel>>>{
        return await this.get(`/users/information/${username}`)
    }
    async FollowCount(username?:string):Promise<AxiosResponse<R<UserFollowCount>>>{
        if (username){
            return await this.get(`/users/follow?username=${username}`)
        }else {
            return await this.get(`/users/follow`)
        }
    }
    async UsersRepos(username?:string):Promise<AxiosResponse<R<RepoModel[]>>>{
        if (username){
            return await this.get(`/users/repo?username=${username}`)
        }else {
            return await this.get(`/users/repo`)
        }
    }
}