export interface RepoModel {
    uid: string;
    name: string;
    description: string;
    owner: string;
    commit: number;
    headHash: string;

    ssh_path: string;
    http_path: string;

    star: number;

    fork: number;
    is_fork: boolean;
    fork_from?: string;

    watch: number;

    issue: number;
    open_issue: number;
    close_issue: number;

    pr: number;
    open_pr: number;
    close_pr: number;

    is_empty: boolean;
    visible: boolean;

    topic: string[];

    size: number;

    created_at: number[];
    updated_at: number[];
    created_by: string;
}

export interface RepoCreate {
    owner: string;
    is_group: boolean;
    name: string;
    description: string;
    licenseName?: string;
    license?: string;
    topic?: string[];
    visible: boolean;
    default_branch: string;
}

export interface RepoBranchModel{
    uid: string,
    repo_id: string,
    branch: string,
    protect: boolean,
    visible: boolean,
    head?: string,

    created_at: [],
    updated_at: [],

    created_by: string,
}

export interface RepoCommitModel{
    uid: string,
    repo_id: string,
    branch_id: string,
    commit_user: string,
    commit_email: string,

    commit_id: string,

    created_at: []
}

export interface RepoTree{
    name: string,
    id_dir: boolean,
    path: string,
    children: RepoTree[]
}