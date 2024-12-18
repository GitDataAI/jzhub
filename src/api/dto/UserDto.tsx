export interface UserFollowerOv{
    uid: string,
    name: string,
    username: string,
    avatar: Uint8Array | undefined,
    description: string | undefined
}


export interface UserKeyOv{
    uid: string,
    create_at: string,
    head: string,
    last_use: string
}

export interface UserKeyCreate{
    name: string,
    pubkey: string
}

export interface UserUpdate {
    name?: string;
    username?: string;
    phone?: string;
    theme?: string;
    website?: string[];
    company?: string;
    description?: string;
    localtime?: string;
    timezone?: string;
}