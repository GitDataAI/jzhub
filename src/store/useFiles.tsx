import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {FilesGraphql} from "@/api/graphql/files/Handler.tsx";



export interface useFilesImpl{
    getFiles(owner: string, repo: string, branch: string, path: string, hash?: string): Promise<Uint8Array>
}
const files_api = new FilesGraphql();
export const useFiles = create<useFilesImpl>()((devtools(persist(
    () => ({
        async getFiles(owner: string, repo: string, branch: string, path: string, hash?: string): Promise<Uint8Array> {
            const file = await files_api.Query({owner, repo, hash, path, branch});
            if (file.status === 200 && file.data.code === 200){
                return new Promise<Uint8Array>((resolve) => {
                    resolve(file.data.data!);
                })
            }else {
                return new Promise<Uint8Array>((_, reject) => {
                    reject(file.data.msg);
                })
            }
        }
    }),
    {
        name: "GitDataAiFiles",
        storage: createJSONStorage(() => localStorage),
    }
))))