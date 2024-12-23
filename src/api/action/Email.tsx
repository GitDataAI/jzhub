import {Http} from "@/api/http.tsx";
import {EmailDtoCaptchaCheck, EmailDtoCaptchaSend} from "@/api/dto/EmailDto.tsx";

export class EmailApi extends Http{
    async CaptchaSend(dto: EmailDtoCaptchaSend){
        return await this.post('/email/captcha',dto)
    }
    async CaptchaCheck(dto: EmailDtoCaptchaCheck){
        return await this.put('/email/captcha',dto)
    }
    async Reset(){}
}