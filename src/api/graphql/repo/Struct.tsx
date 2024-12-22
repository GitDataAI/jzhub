import {RepoTree} from "@/api/dto/RepoDto.tsx";

export interface GraphQLRepoQuery {
    owner: string;
    repo: string;
    profile: boolean;
    data: boolean;
    branchs?: GraphQLRepoBranchQuery | null;
    tree?: GraphQLRepoTreeQuery | null;
    license: boolean;
    readme?: string | null;
    contribute: boolean;
}

export interface GraphQLRepoCommitQuery {
    offset: number;
    size: number;
}

export interface GraphQLRepoBranchQuery {
    commit?: GraphQLRepoCommitQuery | null;
}

export interface GraphQLRepoTreeQuery {
    branch: string;
    commit?: string | null;
}



export interface GraphQLRepoModel {
    owner: string;
    repo: string;
    profile?: GraphQLRepoProfile | null;
    data?: GraphQLRepoData | null;
    branchs?: GraphQLRepoBranchOv[] | null;
    tree?: RepoTree | null;
    license?: GraphQLRepoLicense[] | null;
    readme?: number[] | null;
}

export interface GraphQLRepoProfile {
    uid: string;
    name: string;
    description: string;
    owner: string;
    head_hash?: string | null;
    ssh_path: string;
    http_path: string;
    created_at: number;
    updated_at: number;
    visible: boolean;
}

export interface GraphQLRepoData {
    commit: number;
    star: number;
    fork: number;
    is_fork: boolean;
    fork_from?: string | null;
    watch: number;
    issue: number;
    open_issue: number;
    close_issue: number;
    pr: number;
    open_pr: number;
    close_pr: number;
    is_empty: boolean;
    topic: string[];
    size: number;
}

export interface GraphQLRepoBranchOv {
    uid: string;
    branch: string;
    protect: boolean;
    visible: boolean;
    head?: string | null;
    created_at: number;
    updated_at: number;
    commit: GraphQLRepoCommits[];
}

export interface GraphQLRepoCommits {
    uid: string;
    bio: string;
    commit_user: string;
    commit_email: string;
    commit_id: string;
    created_at: number;
}

export interface GraphQLRepoLicense {
    uid: string;
    name: string;
    license: string;
    created_at: number;
    updated_at: number;
}
