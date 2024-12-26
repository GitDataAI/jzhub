import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {FilesGraphql} from "@/api/graphql/files/Handler.tsx";
import {RepoAPi} from "@/api/action/Repo.tsx";
import {RepoFileUpload} from "@/api/dto/RepoDto.tsx";
import {GraphQLFileResponse} from "@/api/graphql/files/Struct.tsx";



export interface useFilesImpl{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getFiles(owner: string, repo: string, branch: string, path: string, hash?: string, block: number): Promise<GraphQLFileResponse>,
    uploadFile(owner: string, repo: string, branch: string, body: RepoFileUpload): Promise<string>
}
const repo_api = new RepoAPi();
const files_api = new FilesGraphql();
export const useFiles = create<useFilesImpl>()((devtools(persist(
    () => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        async getFiles(owner: string, repo: string, branch: string, path: string, hash?: string, block: number): Promise<GraphQLFileResponse> {
            const file = await files_api.Query({owner, repo, hash, path, branch, block, size_limit: 1024 * 64});
            if (file.status === 200 && file.data.code === 200){
                return new Promise<GraphQLFileResponse>((resolve) => {
                    resolve(file.data.data!);
                })
            }else {
                return new Promise<GraphQLFileResponse>((_, reject) => {
                    reject(file.data.msg);
                })
            }
        },
        async uploadFile(owner: string, repo: string, branch: string, body: RepoFileUpload): Promise<string> {
            return repo_api.FileUpload(owner, repo, branch, body).then((res) => {
                if (res.status === 200 && res.data.code === 200){
                    return new Promise<string>((resolve) => {
                        resolve(res.data.data!);
                    })
                }else {
                    return new Promise<string>((_, reject) => {
                        reject(res.data.msg);
                    })
               }
            })
        }
    }),
    {
        name: "GitDataAiFiles",
        storage: createJSONStorage(() => localStorage),
    }
))))