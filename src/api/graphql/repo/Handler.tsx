import {Http} from "@/api/http.tsx";
import {GraphQLRepoModel, GraphQLRepoQuery} from "@/api/graphql/repo/Struct.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";

export class RepoGraphql extends Http{
    public async Query(q: GraphQLRepoQuery):Promise<AxiosResponse<R<GraphQLRepoModel>>>{
        return await this.post("/graphql/repo",q)
    }
}