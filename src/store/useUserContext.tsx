import {create} from "zustand/react";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {UserDashBored, UserModel} from "@/server/types";
import {AuthApi} from "@/server/AuthApi";
import {UserApi} from "@/server/UserApi";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";


export interface UserState {
    user?: UserModel;
    dash?: UserDashBored,
    isLogin: boolean;
    setUser: (user: UserModel) => void;
    setLogin: (isLogin: boolean) => void;
    logout: () => void;
    getUser: () => UserModel | undefined;
    getIsLogin: () => boolean;
    getDashBored: () => UserDashBored | undefined;
    setDashBored: (dash: UserDashBored) => void;
    syncData: () => void
}

const authApi = new AuthApi();
const userApi = new UserApi();
const useUserContext = create<UserState>()(
    devtools(
        persist(
            (set, get) => (
                {
                    user: undefined,
                    dash: undefined,
                    isLogin: false,
                    setUser: (user: UserModel) => set({user: user, isLogin: true}),
                    setLogin: (isLogin: boolean) => set({isLogin: isLogin}),
                    logout: () => {
                        authApi.LoginOut().then(() => {
                            notifications.show({
                                title: '退出成功',
                                message: '您已成功退出',
                                color: 'green',
                            })
                        });
                        set({user: undefined, isLogin: false, dash: undefined})
                    },
                    getUser: () => get().user,
                    getIsLogin: () => get().isLogin,
                    getDashBored: () => get().dash,
                    setDashBored: (dash: UserDashBored) => set({dash: dash, user: dash.user}),
                    syncData: () => {
                        userApi.GetNow().then(res => {
                            if (res.status === 200 && res.data) {
                                const json: AppWrite<UserModel> = JSON.parse(res.data);
                                if (json.code === 200 && json.data) {
                                    const data = json.data;
                                    set({user: data, isLogin: true})
                                    userApi.DashBoredData(data.username)
                                        .then((res) => {
                                            const json = JSON.parse(res.data);
                                            if (json.code === 200 && json.data && res.status) {
                                                const data = json.data;
                                                set({dash: data, user: data.user})
                                            } else {
                                                notifications.show({
                                                    title: '同步失败，登陆失效',
                                                    message: json.msg,
                                                    color: 'red',
                                                })
                                                set({user: undefined, isLogin: false, dash: undefined})
                                            }
                                        })
                                } else {
                                    notifications.show({
                                        title: '同步失败，登陆失效',
                                        message: json.msg,
                                        color: 'red',
                                    })
                                }
                            }
                        })

                    }
                }
            ),
            {
                name: 'user',
                storage: createJSONStorage(() => localStorage)
            }
        ),
        {
            enabled: true,
            name: 'user',
        }
    )
);


export default useUserContext;