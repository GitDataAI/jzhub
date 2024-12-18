export interface EmailDtoCaptchaSend{
    email:string
}
export interface EmailDtoCaptchaCheck{
    email:string,
    code:string
}

export interface EmailModel{
    uid: string,
    user_id: string,
    email: string,
    is_public: boolean,
    verified: boolean,
    bind_at: string
}

export interface EmailBind{
    email: string,
    name: string,
}