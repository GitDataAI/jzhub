export interface GraphQLFileRequest{
    owner: string,
    repo: string,
    hash?: string,
    path: string,
    branch: string
}