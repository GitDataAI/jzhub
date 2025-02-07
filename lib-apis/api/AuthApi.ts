import {Net} from "../net.ts";
import type {AxiosError, AxiosResponse} from "axios";
import type {AppWrite} from "../index.ts";

export interface AuthCaptchaImage {
  image: string,
  fingerprint: string,
}

export interface AuthCaptchaEmailSend {
  email: string,
}

export interface AuthCaptchaEmailCheck {
  email: string,
  code: string,
}

export interface AuthCheck {
  username?: string,
  email?: string
}

export interface AuthLogin {
  username: string,
  password: string,
  code: string,
  fingerprint: string,
}

export interface AuthApply {
  username: string,
  password: string,
  email: string,
  code: string,
  fingerprint: string,
}


export interface AuthUsersSessionModel {
  uid: string;
  name: string;
  username: string;
  theme: string;
  pinned: string[];
  main_email: string;
  pro: boolean;
  avatar_url: string | null;
}

export interface UsersOption {
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
  followers: number;
  following: number;
  repository: number;
  stars: number;
  watching: number;
  package: number;
  release: number;
  mentioned: boolean;
  main_email: string;
  visible_email: boolean;
  pro: boolean;
  avatar_url?: string;
  created: number;
  updated: number;
  hasused: number;
}

export class AuthApi extends Net{
  constructor() {
    super();
  }
  async captchaImage():Promise<AxiosResponse<AppWrite<AuthCaptchaImage>, AxiosError>> {
    return this.post("/auth/captcha/image");
  }
  async captchaEmailSend(data: AuthCaptchaEmailSend):Promise<AxiosResponse<AppWrite<string>, AxiosError>> {
    return this.post("/auth/email/send", data);
  }
  async captchaEmailCheck(data: AuthCaptchaEmailCheck):Promise<AxiosResponse<AppWrite<string>, AxiosError>> {
    return this.post("/auth/email/check", data);
  }
  async check(data: AuthCheck): Promise<AxiosResponse<AppWrite<boolean>, AxiosError>> {
    const queryParams = {} as Record<string, string>;

    if (data.username) {
      queryParams.username = data.username;
    }
    if (data.email) {
      queryParams.email = data.email;
    }
    return this.post("/auth/check", {}, queryParams);
  }

  async login(data: AuthLogin):Promise<AxiosResponse<AppWrite<AuthUsersSessionModel>, AxiosError>> {
    return this.post("/auth/login", {
      username: data.username,
      password: data.password,
    }, {}, {
      headers: {
        "x-code": data.code,
        "x-fingerprint": data.fingerprint,
      },
    });
  }
  async apply(data: AuthApply):Promise<AxiosResponse<AppWrite<AuthUsersSessionModel>, AxiosError>> {
    return this.post("/auth/apply", {
      username: data.username,
      password: data.password,
      email: data.email,
    }, {}, {
      headers: {
        "x-code": data.code,
        "x-fingerprint": data.fingerprint,
      },
    });
  }
  async logout():Promise<AxiosResponse<AppWrite<string>, AxiosError>> {
    return this.get("/auth/logout");
  }
  async NowSession():Promise<AxiosResponse<AppWrite<AuthUsersSessionModel>, AxiosError>> {
    return this.get("/auth/now/session");
  }
  async NowUser():Promise<AxiosResponse<AppWrite<UsersOption>, AxiosError>> {
    return this.get("/auth/now/user");
  }
}
