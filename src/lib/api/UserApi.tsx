import {Http, R} from "../HTTP.tsx";
import {AxiosResponse} from "axios";
import {SessionModel, UsersUpdateOption} from "../model/UserModel.tsx";

export class UserApi extends Http {
    async Local():Promise<AxiosResponse<R<SessionModel>>>{
        return await this.post('/user',{})
    }
    async UpdateOption(option: UsersUpdateOption):Promise<AxiosResponse<R<string>>>{
        return await this.put('/user',option)
    }

}