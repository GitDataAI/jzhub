import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {SessionModel} from "@/api/Session.tsx";
import {UsersApi} from "@/api/action/Users.tsx";
import { toast } from '@pheralb/toast';
import {GraphQLUserModel} from "@/api/graphql/user/Struct.tsx";
import {UserGraphql} from "@/api/graphql/user/Handler.tsx";

export interface useUserImpl{
    model: SessionModel | undefined,
    user: GraphQLUserModel | undefined,
    isLogin: boolean,
    initial: () => Promise<boolean>,
    LoginInByEmail: (dto: { email: string; passwd: string }) => Promise<boolean>,
    LoginInByName: (dto: { username: string; passwd: string }) => Promise<boolean>,
    Logout: () => Promise<boolean>,
}


const api = new UsersApi();
const graphql = new UserGraphql();
export const useUser = create<useUserImpl>()((devtools(persist(
    (set,get) => ({
        model: undefined,
        isLogin: false,
        user: undefined,
        initial: async () => {
            try {
                const model = await api.Local();
                if (model.status === 200 && model.data.code === 200){
                    set({
                        model: model.data.data,
                        isLogin: true
                    });
                    graphql.Query({
                        username: model.data.data?.username,
                        profile: true,
                        repo: true,
                        data: true,
                        keys: true,
                        email: true,
                        groups: true
                    }).then(res=>{
                        if (res.status === 200 && res.data.code === 200){
                            set({
                                user: res.data.data
                            })
                        }else {
                            toast.error({
                                text: "用户数据错误",
                                description: "用户数据请求失败"
                            })
                        }
                    })
                    return true
                }else {
                    toast.error({
                        text: "登录失败",
                        description: "登录请求失败"
                    })
                    return false
                }
            }catch (e){
                console.log(e);
                return false
            }
        },
        LoginInByEmail: async (dto) => {
            try {
                const model = await api.LoginByEmail(dto);
                if (model.status === 200 && model.data.code === 200){
                    get().initial();
                    return true
                }else {
                    return false
                }
            }catch (e){
                toast.error({
                    text: "登录失败",
                    description: "登录请求失败"
                })
                console.log(e);
                return false
            }
        },
        LoginInByName: async (dto) => {
            try {
                const model = await api.LoginByName(dto);
                if (model.status === 200 && model.data.code === 200){
                    get().initial();
                    return true
                }else {
                    return false
                }
            }catch (e){
                toast.error({
                    text: "登录失败",
                    description: "登录请求失败"
                })
                console.log(e);
                return false
            }
        },
        Logout: async () => {
            try {
                const model = await api.Logout();
                if (model.status === 200 && model.data.code === 200){
                    set({
                        model: undefined,
                        isLogin: false
                    });
                    return true
                }else {
                    return false
                }
            }catch (e){
                console.log(e);
                return false
            }
        }
    }),
    {
        name: "GitDataAiUsers",
        storage: createJSONStorage(() => sessionStorage),
    }
))))