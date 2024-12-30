import { Http } from "../HTTP.tsx";

export class EmailApis extends Http {
    async SendCaptcha(email: string) {
        try {
            return await this.post('/email/captcha', { email });
        } catch (error) {
            console.error('发送验证码失败:', error);
            throw error;
        }
    }

    async VerifyCaptcha(email: string, code: string) {
        try {
            return await this.put('/email/captcha', { email, code });
        } catch (error) {
            console.error('验证验证码失败:', error);
            throw error;
        }
    }
}
