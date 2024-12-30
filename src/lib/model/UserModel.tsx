export interface SessionModel {
    uid: string;
    name: string;
    username: string;
    bio?: string;
    pronouns?: string;
    company?: string;
    location?: string;
    localtime?: string;
    i18n?: string;
    website: string[];
    orcid?: string;
    social: string[];
    theme: string;
    pinned: string[];
    mentioned: boolean;
    main_email: string;
    visible_email: boolean;
    pro: boolean;
    avatar_url?: string;
}
export interface UsersLogin {
    username: string;
    password: string;
}

export interface UsersApply {
    username: string;
    password: string;
    email: string;
}

export interface UserKeyCreate {
    name: string;
    pubkey: string;
    access: number;
    expire: number;
}

export interface EmailBind {
    email: string;
    name?: string;
}
export interface PageParam {
    page: number;
    size: number;
}
export interface Base64Inner {
    inner: string;
}
export interface AvatarGet {
    url: string;
}

export interface UsersUpdateOption {
    name?: string;
    bio?: string;
    pronouns?: string;
    company?: string;
    location?: string;
    localtime?: string;
    i18n?: string;
    website?: string[];
    orcid?: string;
    social?: string[];
    theme?: string;
    pinned?: string[];
}

export interface UserFollowCount{
    follower: number;
    following: number;
}