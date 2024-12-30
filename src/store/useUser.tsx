import {create} from "zustand";
import {SessionModel} from "../lib/model/UserModel.tsx";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {UsersApi} from "../lib/api/UsersApi.tsx";
import {toast} from "@pheralb/toast";
import {UserApi} from "../lib/api/UserApi.tsx";

export interface useUserImpl{
    user: SessionModel | null;
    init: () => Promise<void>;
    logout: () => Promise<void>;
}


const users = new UsersApi();
const user = new UserApi();
const useUser = create<useUserImpl>()(devtools(persist(
    (set, get) => ({
        user: null,
        init: async () => {
            try {
                const res = await user.Local();
                if (res && res.data.code === 200){
                    set({
                        ...get,
                        user: res.data.data
                    });
                }else if (res && res.data.code === 401){
                    toast.error({
                        text: "用户未登录",
                        description: "请先登录"
                    })
                    window.location.href = "/auth/login";
                }
            }catch{
                toast.error({
                    text: "获取用户信息失败",
                })
            }
        },
        logout: async () => {
            try {
                const res = await users.logout();
                if (res && res.data.code === 200){
                    set({
                        ...get,
                        user: null
                    });
                    toast.success({
                        text: "登出成功"
                    })
                    window.location.href = "/auth/login";
                }
            }catch{
                toast.error({
                    text: "登出失败",
                })
            }
        }
    }),
    {
        name: "GitDataAI-User",
        storage:  createJSONStorage(() => localStorage)
    }
    )
))

export default useUser