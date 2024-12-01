import {create} from "zustand";
import {persist, devtools, createJSONStorage} from "zustand/middleware";
import {Navigate} from "react-router-dom";

export interface useInfoImpl{
    href: { label: string, url: string},
    setHref: (href: { label: string, url: string}) => void;
    goto: () => void;
    ModelShowId: number;
    setModelShowId: (id: number) => void;
}

export const useInfo = create<useInfoImpl>()((devtools(persist(
    (set,get) => ({
        href: {
           label: "Repository",
           url: "/"
       },
        ModelShowId: 0,
        setHref: (href) => set({href}),
        goto: () => {
            Navigate({
                to: get().href.url,
            })
        },
        setModelShowId: (id) => {
            console.log(id)
            set({ModelShowId: id})
        }
    }),
    {
        name: "GitDataAiInfo",
        storage: createJSONStorage(() => sessionStorage),
    }
))))