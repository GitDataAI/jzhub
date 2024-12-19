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
    openPr: number;
    closePr: number;

    isEmpty: boolean;
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