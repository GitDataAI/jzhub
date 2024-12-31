
export interface RepoCreateOwnerList {
    uid: string;
    name: string;
    group: string;
    avatar_url: string;
}
export interface RepoCreateOptions {
    owner: string;
    owner_id: string;
    is_group: boolean;
    private: boolean;
    name: string;
    description?: string;
    add_readme: boolean;
}


export interface RepoModel {
    uid: string;
    owner: string;
    owner_id: string;
    avatar_url?: string;
    name: string;
    description?: string;
    website?: string;
    private: boolean;
    is_group: boolean;
    has_issues: boolean;
    has_idcard: boolean;
    has_wiki: boolean;
    has_downloads: boolean;
    has_projects: boolean;
    topic: string[];
    collaborators: string[];
    git_http_url: string;
    git_ssh_url: string;
    default_branchs?: string;
    nums_star: number;
    nums_fork: number;
    nums_watcher: number;
    nums_commit: number;
    nums_release: number;
    nums_tag: number;
    nums_branchs: number;
    nums_members: number;
    fork: boolean;
    fork_from?: string;
    created: number;
    updated: number;
}

export interface BlobTreeMsg {
    name: string;
    path: string;
    msg: string;
    time: number;
    is_dir: boolean;
    size: number;
    children: BlobTreeMsg[];
}


export interface BranchModel {
    uid: string;
    repo_id: string;
    name: string;
    head?: string;
    protect: boolean;
}
