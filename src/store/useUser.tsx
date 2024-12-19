import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {SessionModel} from "@/api/Session.tsx";
import {UsersApi} from "@/api/action/Users.tsx";
import { toast } from '@pheralb/toast';
import {UserAPi} from "@/api/action/User.tsx";
import {RepoModel} from "@/api/dto/RepoDto.tsx";

export interface useUserImpl{
    model: SessionModel | undefined,
    isLogin: boolean,
    initial: () => Promise<boolean>,
    LoginInByEmail: (dto: { email: string; passwd: string }) => Promise<boolean>,
    LoginInByName: (dto: { username: string; passwd: string }) => Promise<boolean>,
    Logout: () => Promise<boolean>,
    Avatar: string,
    OwnRepo: RepoModel[]
}


const api = new UsersApi();
const user_api = new UserAPi();
export const useUser = create<useUserImpl>()((devtools(persist(
    (set,get) => ({
        model: undefined,
        isLogin: false,
        Avatar: '',
        OwnRepo: [],
        initial: async () => {
            try {
                const model = await api.Local();
                if (model.status === 200 && model.data.code === 200){
                    set({
                        model: model.data.data,
                        isLogin: true
                    });
                    user_api.GetLocalAvatar().then(res=>{
                        set({
                            Avatar: res.data.data || ''
                        })
                    });
                    user_api.GetLocalRepositories().then(res=>{
                        set({
                            OwnRepo: res.data.data || []
                        })
                    });
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