import {Http} from "@/api/http.tsx";
import {UserDtoApply, UserDtoLoginByEmail, UserDtoLoginByName, UserOv} from "@/api/dto/UsersDto.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {SessionModel} from "@/api/Session.tsx";

export class UsersApi extends Http{
    async Apply(dto: UserDtoApply): Promise<AxiosResponse<R<string>, never>>{
        return await
            this.post(
                '/users/apply',
                {
                    inner: window.btoa(JSON.stringify(dto))
                }
            )
    }
    async LoginByEmail(dto: UserDtoLoginByEmail){
        return await
            this.post(
                '/users/login/email',
                {
                    inner: window.btoa(JSON.stringify(dto))
                }
            )
    }
    async LoginByName(dto: UserDtoLoginByName){
        return await
            this.post(
                '/users/login/username',
                {
                    inner: window.btoa(JSON.stringify(dto))
                }
            )
    }
    async Logout(){
        return await
            this.post(
                '/users/logout',
                {}
            )
    }
    async Local():Promise<AxiosResponse<R<SessionModel>, never>>{
        return await
            this.get(
                '/users/session',
                {}
            )
    }
    async Update(){}
    async ResetForget(){}
    async ResetOnline(){}
    async OnceInfo(username: string):Promise<AxiosResponse<R<UserOv>, never>>{
        return await
            this.get(
                `/users/once/${username}`,{}
            )
    }
    async Search(keyword: string, page: number, limit: number):Promise<AxiosResponse<R<UserOv[]>, never>>{
        return await
            this.get(
                `/users/search?keywords=${keyword}&page=${page}&size=${limit}`,{}
            )
    }


}