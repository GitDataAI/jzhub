import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {Navigate} from "react-router-dom";
import {UserAPi} from "@/api/action/User.tsx";



export interface useInfoImpl{
    href: { label: string, url: string},
    setHref: (href: { label: string, url: string}) => void;
    goto: () => void;
    ModelShowId: number;
    setModelShowId: (id: number) => void;
    workspace: {
        avatar: string,
        name: string,
    },
    workspaces: {
        avatar: string,
        name: string,
    }[],
    setWorkspace: (workspace: {
        avatar: string,
        name: string,
    }) => void;
    InitWorkspace: () => Promise<void>;
}
const user_api = new UserAPi();
export const useInfo = create<useInfoImpl>()((devtools(persist(
    (set,get) => ({
        href: {
           label: "explore",
           url: "/"
       },
        ModelShowId: 3,
        workspaces: [],
        workspace: {
            avatar: "",
            name: ""
        },
        setHref: (href) => set({href}),
        goto: () => {
            Navigate({
                to: get().href.url,
            })
        },
        setModelShowId: (id) => {
            set({ModelShowId: id})
        },
        setWorkspace: (workspace) => set({workspace}),
        InitWorkspace: async () => {
            let workspaces: {avatar: string, name: string}[] = []
            const avatar = await user_api.GetLocalAvatar();
            const now = await user_api.GetLocalSetting();
            if (now.status === 200 && now.data.code === 200){
                workspaces.push({
                    avatar: avatar.data.data || 'None',
                    name: now.data.data?.username || 'None'
                })
            }else {
                workspaces.push({
                    avatar: avatar.data.data || 'None',
                    name: 'None'
                })
            }
            set({
                workspaces: workspaces,
                workspace: workspaces[0]
            })
        }
    }),
    {
        name: "GitDataAiInfo",
        storage: createJSONStorage(() => sessionStorage),
    }
))))