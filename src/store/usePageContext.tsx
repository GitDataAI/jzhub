import {create} from "zustand/react";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {BranchModel, ProductList, RepoInfo, Repository, UserDashBored} from "@/server/types";


export interface PageState {
    url: string;
    tab?: string;
    repoCtx?: {
        repo: Repository,
        owner: string,
        repoName: string,
        repoInfo: RepoInfo,
        branches: BranchModel[],
        products: ProductList[]
    };
    userCtx?: {
        user: UserDashBored,
        username: string
    };
    productCTX?: ProductList,
    reset: () => void;
    setTab: (tab: string) => void;
    setUrl: (url: string) => void;
    setRepoCtx: (repoCtx: { repo: Repository, owner: string, repoName: string, repoInfo: RepoInfo, branches: BranchModel[],products: ProductList[]}) => void;
    setUserCtx: (userCtx: { user: UserDashBored, username: string }) => void;
    setUrlAndTab: (url: string, tab: string) => void;
    setProduct: (product: ProductList) => void,
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
                    reset: () => set({url: '', tab: ''}),
                    setTab: (tab: string) => set({tab: tab}),
                    setUrl: (url: string) => set({url: url}),
                    setRepoCtx: (repoCtx: { repo: Repository, owner: string, repoName: string , repoInfo: RepoInfo, branches: BranchModel[],products: ProductList[]}) => set({repoCtx: repoCtx}),
                    setUserCtx: (userCtx: { user: UserDashBored, username: string }) => set({userCtx: userCtx}),
                    setUrlAndTab: (url: string, tab: string) => set({url: url, tab: tab}),
                    setProduct: (product: ProductList) => set({productCTX: product}),
                }
            ),
            {
                name: 'page',
                storage: createJSONStorage(() => localStorage)
            }
        ),
        {
            enabled: true,
            name: 'page',
        }
    )
);


export default usePageContext;