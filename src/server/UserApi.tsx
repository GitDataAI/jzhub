import {HttpClient} from "@/server/Client";

import {SSHKeyCreateParma, TokenCreate, TokenDelete} from "@/server/types";

export class UserApi extends HttpClient {
    async GetNow() {
        return await this.get<string>('/user/now');
    }

    async DashBoredData(username: string) {
        return await this.get<string>('/user/' + username + '/dashbored')
    }

    async UpTional(
        description?: string,
        website?: string,
        location?: string,
        timezone?: string,
        language?: string,
    ) {
        return await this.patch<string>('/user/uptional', {
            description: description,
            website: website,
            location: location,
            timezone: timezone,
            language: language,
        })
    }

    async InfoByUid(uid: string) {
        return await this.post<string>('/user/uid/' + uid, {})
    }

    async TokenList() {
        return await this.patch<string>('/user/token', {})
    }

    async TokenCreate(parma: TokenCreate) {
        return await this.post<string>('/user/token', parma)
    }

    async TokenDelete(parma: TokenDelete) {
        return await this.put<string>('/user/token', parma)
    }

    async SSHCreate(parma: SSHKeyCreateParma) {
        return await this.post<string>('/user/ssh', parma);
    }

    async SSHDelete(parma: string) {
        return await this.delete<string>(`/user/ssh/${parma}`);
    }

    async SSHList() {
        return await this.patch<string>('/user/ssh', {});
    }
}