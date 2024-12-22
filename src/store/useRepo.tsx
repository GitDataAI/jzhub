import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";
import {RepoGraphql} from "@/api/graphql/repo/Handler.tsx";


export interface useRepoImpl{
    getModel(owner: string, repo: string): Promise<GraphQLRepoModel>,
    getReadMe(owner: string, repo: string, branch: string): Promise<GraphQLRepoModel>,
    getCommits(owner: string, repo: string, branch: string, page: number, size: number): Promise<GraphQLRepoModel>,
    getTree(owner: string, repo: string, branch: string): Promise<GraphQLRepoModel>,
}

const repo_graphql = new RepoGraphql();
export const useRepo = create<useRepoImpl>()((devtools(persist(
    () => ({
        async getModel(owner: string, repo: string): Promise<GraphQLRepoModel> {
            const resp = await repo_graphql.Query({
                owner: owner,
                repo: repo,
                profile: true,
                data: true,
                branchs: {
                    commit: {
                        offset: 0,
                        size: 10
                    }
                },
                tree: null,
                license: true,
                readme: null,
                contribute: false,
            });
            if (resp.status === 200 && resp.data.code === 200) {
                return new Promise<GraphQLRepoModel>((resolve) => {
                    resolve(resp.data.data!)
                })
            } else {
                return new Promise<GraphQLRepoModel>((_, reject) => {
                    reject(resp.data.msg)
                })
            }
        },
        async getReadMe(owner: string, repo: string, branch: string): Promise<GraphQLRepoModel> {
            const resp = await repo_graphql.Query({
                owner: owner,
                repo: repo,
                profile: false,
                data: false,
                branchs: null,
                tree: null,
                license: false,
                readme: branch,
                contribute: false,
            });
            if (resp.status === 200 && resp.data.code === 200) {
                return new Promise<GraphQLRepoModel>((resolve) => {
                    resolve(resp.data.data!)
                })
            } else {
                return new Promise<GraphQLRepoModel>((_, reject) => {
                    reject(resp.data.msg)
                })
            }
        },
        async getCommits(owner: string, repo: string, branch: string, page: number, size: number): Promise<GraphQLRepoModel> {
            const resp = await repo_graphql.Query({
                owner: owner,
                repo: repo,
                profile: false,
                data: false,
                branchs: {
                    commit: {
                        offset: page,
                        size: size
                    }
                },
                tree: {
                    branch: branch
                },
                license: false,
                readme: null,
                contribute: false,
            });
            if (resp.status === 200 && resp.data.code === 200) {
                return new Promise<GraphQLRepoModel>((resolve) => {
                    resolve(resp.data.data!)
                })
            } else {
                return new Promise<GraphQLRepoModel>((_, reject) => {
                    reject(resp.data.msg)
                })
            }
        },
        async getTree(owner: string, repo: string, branch: string): Promise<GraphQLRepoModel> {
            const result = await repo_graphql.Query({
                owner: owner,
                repo: repo,
                profile: false,
                data: false,
                branchs: {
                    commit: {
                        offset: 0,
                        size: 10
                    }
                },
                tree: {
                    branch: branch
                },
                license: false,
                readme: null,
                contribute: false,
            });
            if (result.status === 200 && result.data.code === 200) {
                return new Promise<GraphQLRepoModel>((resolve) => {
                    resolve(result.data.data!)
                })
            } else {
                return new Promise<GraphQLRepoModel>((_, reject) => {
                    reject(result.data.msg)
                })
            }
        }
    }),
    {
        name: "GitDataAiRepo",
        storage: createJSONStorage(() => sessionStorage),
    }
))))