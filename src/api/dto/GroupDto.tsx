export interface GroupDesc {
    uid: string;
    name: string;
    username: string;
    avatar?: Uint8Array;
    status: number;
    website: string[];
    company: string;
    description?: string;
    localtime: string;
    timezone: string;
    pro: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface GroupCreate{
    name: string;
    description: string;
    contact: string
}

