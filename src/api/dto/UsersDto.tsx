export interface UserDtoApply{
    email: string;
    username: string;
    password: string;
}
export interface UserDtoLoginByName{
    username: string;
    passwd: string;
}
export interface UserDtoLoginByEmail{
    email: string;
    passwd: string;
}


export interface UserOv{
    uid: string,
    name: string,
    username: string,
    phone: string | undefined,
    theme: string,
    website: string[],
    company: string,
    localtime: string,
    timezone: string,
    avatar: string | undefined
}
