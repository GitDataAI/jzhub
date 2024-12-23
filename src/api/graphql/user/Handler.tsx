import {Http} from "@/api/http.tsx";
import {GraphQLUserModel, UserGraphqlQuery} from "@/api/graphql/user/Struct.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";

export class UserGraphql extends Http{
    public async Query(q:UserGraphqlQuery):Promise<AxiosResponse<R<GraphQLUserModel>>>{
        return await this.post('/graphql/user',q)
    }
}