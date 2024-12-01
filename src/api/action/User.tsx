import {Http} from "@/api/http.tsx";
import {UserDtoApply, UserDtoLoginByEmail, UserDtoLoginByName} from "@/api/dto/UserDto.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {SessionModel} from "@/api/Session.tsx";

export class UserApi extends Http{
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
                '/users/login/name',
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
            this.post(
                '/users/local',
                {}
            )
    }
    async Update(){}
    async ResetForget(){}
    async ResetOnline(){}
}