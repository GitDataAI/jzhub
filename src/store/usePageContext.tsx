import {create} from "zustand/react";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {ProductList, RepoInfo, Repository, UserDashBored} from "@/server/types";


export interface PageState {
    url: string;
    tab?: string;
    repoCtx?: {
        repo: Repository,
        owner: string,
        repoName: string,
        repoInfo: RepoInfo,
        products: ProductList[],
    };
    userCtx?: {
        user: UserDashBored,
        username: string
    };
    process: number,
    productCTX?: ProductList,
    reset: () => void;
    setTab: (tab: string) => void;
    setUrl: (url: string) => void;
    setRepoCtx: (repoCtx: { repo: Repository, owner: string, repoName: string, repoInfo: RepoInfo, products: ProductList[] }) => void;
    setUserCtx: (userCtx: { user: UserDashBored, username: string }) => void;
    setUrlAndTab: (url: string, tab: string) => void;
    setProduct: (product: ProductList) => void,
    setProcess:(process: number) => void,
}


const usePageContext = create<PageState>()(
    devtools(
        persist(
            (set) => (
                {
                    url: '',
                    tab: '',
                    repoCtx: undefined,
                    userCtx: undefined,
                    productCTX: undefined,
                    process: 0,
                    reset: () => set({url: '', tab: ''}),
                    setTab: (tab: string) => set({tab: tab}),
                    setUrl: (url: string) => set({url: url}),
                    setRepoCtx: (repoCtx: { repo: Repository, owner: string, repoName: string, repoInfo: RepoInfo, products: ProductList[] }) => set({repoCtx: repoCtx}),
                    setUserCtx: (userCtx: { user: UserDashBored, username: string }) => set({userCtx: userCtx}),
                    setUrlAndTab: (url: string, tab: string) => set({url: url, tab: tab}),
                    setProduct: (product: ProductList) => set({productCTX: product}),
                    setProcess: (process: number) => set({process: process}),
                }
            ),
            {
                name: 'page',
                storage: createJSONStorage(() => ({
                    setItem: (key, value) => sessionStorage.setItem(key, value),
                    getItem: (key) => sessionStorage.getItem(key),
                    removeItem: (key) => sessionStorage.removeItem(key),
                }))
            }
        ),
        {
            enabled: true,
            name: 'page',
        }
    )
);


export default usePageContext;