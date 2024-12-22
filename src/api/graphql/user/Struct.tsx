
export interface UserGraphqlQuery{
    username?: string,
    profile: boolean,
    repo: boolean,
    data: boolean,
    keys: boolean,
    email: boolean,
    groups: boolean
}


export interface GraphQLUserModel {
    profile?: GraphQLUserProfile | null;
    repo?: GraphQLUserRepo[] | null;
    keys?: GraphQLUserKeys[] | null;
    data?: GraphQLUserData | null;
    email?: GraphQLEmail[] | null;
    group?: GraphQLUserGroup[] | null;
}

export interface GraphQLUserProfile {
    uid: string;
    name: string;
    username: string;
    avatar?: string | null;
    phone?: string | null;
    status: number;
    website: string[];
    company: string;
    description?: string | null;
    localtime: string;
    timezone: string;
    theme: string;
    pro: boolean;
    created_at: number;
    updated_at: number;
    lastLogin: number;
    isGroups: boolean;
}

export interface GraphQLUserRepo {
    uid: string;
    name: string;
    description: string;
    owner: string;
    branch: RepoBranchOv[];
    commit: number;
    head_hash?: string | null;
    ssh_path: string;
    http_path: string;
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
    visible: boolean;
    topic: string[];
    size: number;
    created_at: number;
    updated_at: number;
}

export interface GraphQLUserKeys {
    uid: string;
    created_at: string;
    head: string;
    lastUse: string;
}

export interface GraphQLUserData {
    uid: string;
    repo: string[];
    project: string[];
    issue: string[];
    pr: string[];
    commit: string[];
    tag: string[];
    star: string[];
    follow: string[];
    following: string[];
    watcher: string[];
}

export interface GraphQLEmail {
    uid: string;
    userId: string;
    name: string;
    email: string;
    is_public: boolean;
    verified: boolean;
    bind_at: string;
}

export interface GraphQLUserGroup {
    name: string;
    username: string;
    theme: string;
    website: string[];
    company: string;
    description?: string | null;
    localtime: string;
    timezone: string;
}
export interface RepoBranchOv {
    uid: string;
    branch: string;
    protect: boolean;
    visible: boolean;
    head?: string | null;
    created_at: number;
    updated_at: number;
}
