import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export interface useInfoImpl{
    local:{
        label: string,
        url: string
    },
    setLocal(label: string, url: string):void
}



export const useInfo = create<useInfoImpl>()(devtools(persist(
        (set,get)=>({
            local:{
                label: "Local",
                url: "http://localhost:8080"
            },
            setLocal(label: string, url: string) {
                set({
                    ...get,
                    local:{
                        label: label,
                        url: url
                    }
                })
            }
        }),
        {
            name: "GitDataAi-useInfo",
            storage:  createJSONStorage(() => localStorage)
        }
        )
    )
)