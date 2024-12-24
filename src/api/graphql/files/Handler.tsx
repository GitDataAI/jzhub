import {Http} from "@/api/http.tsx";
import {AxiosResponse} from "axios";
import {R} from "@/api/R.tsx";
import {GraphQLFileRequest} from "@/api/graphql/files/Struct.tsx";

export class FilesGraphql extends Http{
    public async Query(q: GraphQLFileRequest):Promise<AxiosResponse<R<Uint8Array>>>{
        return await this.post("/graphql/files",q)
    }
}