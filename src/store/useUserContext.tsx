import {create} from "zustand/react";
import {createJSONStorage, devtools, persist} from "zustand/middleware";


export interface UserState {
    data?: {
        uid: string,
        username: string,
        email: string,
        avatar: string,
    },
    isLogin: boolean,
    setUser: (data: {
        uid: string,
        username: string,
        email: string,
        avatar: string,
    }) => void,
    setLogin: (isLogin: boolean) => void,
    logout: () => void,
    getUser: () => {
        uid: string,
        username: string,
        email: string,
        avatar: string,
    } | undefined,
    getLogin: () => boolean,
}

const useUserContext = create<UserState>()(
    devtools(
        persist(
            (set, get) => (
                {
                    data: undefined,
                    isLogin: false,
                    setUser: (data) => {
                        set({
                            data: data,
                            isLogin: true,
                        })
                    },
                    setLogin: (isLogin) => {
                        set({
                            isLogin: isLogin,
                        })
                    },
                    logout: () => {
                        set({
                            data: undefined,
                            isLogin: false,
                        })
                    },
                    getUser: () => {
                        return get().data;
                    },
                    getLogin: () => {
                        return get().isLogin;
                    }
                }
            ),
            {
                name: "user",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
);


export default useUserContext;