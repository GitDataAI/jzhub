export interface RepoModel {
    uid: string;
    name: string;
    description: string;
    owner: string;
    commit: number;
    headHash: string;

    sshPath: string;
    httpPath: string;

    star: number;

    fork: number;
    isFork: boolean;
    forkFrom?: string;

    watch: number;

    issue: number;
    openIssue: number;
    closeIssue: number;

    pr: number;
    openPr: number;
    closePr: number;

    isEmpty: boolean;
    visible: boolean;

    topic: string[];

    size: number;

    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
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