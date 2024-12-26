export interface GraphQLFileRequest{
    owner: string,
    repo: string,
    hash?: string,
    path: string,
    branch: string,
    size_limit: number,
    block: number,
}

export interface GraphQLFileResponse{
    data: Uint8Array
    size: number
    total: number
    current: number
}