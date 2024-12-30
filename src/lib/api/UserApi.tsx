import {Http, R} from "../HTTP.tsx";
import axios, {AxiosResponse} from "axios";
import {SessionModel, UsersUpdateOption} from "../model/UserModel.tsx";

export class UserApi extends Http {
    async Local():Promise<AxiosResponse<R<SessionModel>>>{
        return await this.post('/user',{})
    }
    async UpdateOption(option: UsersUpdateOption):Promise<AxiosResponse<R<string>>>{
        return await this.put('/user',option)
    }
    async UploadAvatar(file: File):Promise<AxiosResponse<R<string>>>{
        const formData = new FormData();
        formData.append('file', file);
        return await axios.put(`/api/avatar/${file.name}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
}