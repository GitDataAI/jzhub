'use client'

import React, {useEffect, useState} from "react";
import {RepoApi} from "@/server/RepoApi";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {BranchModel, RepoInfo} from "@/server/types";
import {Repoheader} from "@/component/repo/repoheader";
import usePageContext from "@/store/usePageContext";


export default function RepoLayout(props: { children: React.ReactNode, params: Promise<{ owner: string, repo: string }> }) {
    const api = new RepoApi();
    const [Loading, setLoading] = useState(false);
    const [NotFound, setNotFound] = useState(false);
    const [Repo,setRepo] = useState<RepoInfo | undefined>();
    const [Parma,setParma] = useState<{ owner: string, repo: string } | undefined>();
    const context = usePageContext();
   const Sync = async () => {
        const {owner, repo} = await props.params;
        const basic = await api.GetInfo(owner, repo);
        if (basic) {
            const json: AppWrite<RepoInfo> = JSON.parse(basic.data);
            if (json.data?.model.status !== "Syncing") {
                notifications
                    .show({
                        title: '完成',
                        message: '仓库索引同步成功',
                        color: 'green',
                    });
                Init().then().catch();
                return;
            }
        }
        setTimeout(Sync, 5000);
    };

    const Init = async () => {
        const {owner, repo} = await props.params;
        setParma({owner,repo});
        const basic = await api.GetInfo(owner,repo);
        if (basic.status !== 200){
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
        }
        const json: AppWrite<RepoInfo> = JSON.parse(basic.data);
        if (json.code !== 200 || !json.data) {
            setNotFound(true);
            return;
        }
        const products = json.data.products;
        setRepo(json.data);
        let branches: BranchModel[] = [];
        context.setRepoCtx({
            repo: json.data.model,
            owner: owner,
            repoName: repo,
            repoInfo: json.data,
            branches: branches,
            products: products
        })
        const branchesRes = await api.Bhtc(owner, repo);
        if (branchesRes.status !== 200 || !branchesRes.data) {
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Branches Not Found',
                    color: 'red',
                });
        }
        if (branchesRes.data) {
            const js: AppWrite<{ branches: Record<string, BranchModel> }> = JSON.parse(branchesRes.data);
            if (js.code !== 200 || !js.data) {
                notifications
                    .show({
                        title: '数据请求失败',
                        message: 'Branches Not Found',
                        color: 'red',
                    });

            }
            branches = Object.keys(js.data!).map((key) => {
                const result: BranchModel = JSON.parse(key);
                return result;
            })
            context.setRepoCtx({
                repo: json.data.model,
                owner: owner,
                repoName: repo,
                repoInfo: json.data,
                branches: branches,
                products: products
            })
        }

        setLoading(true);
        if (json.data.model.status === "Syncing") {
            setTimeout(Sync, 5000);
        }
    }
    useEffect(() => {
        Init().then().catch();
    }, []);

    return (
        <div className="repo">
            {
                NotFound && (
                    <div className="not-found">
                        <h1>404</h1>
                        <span>Repo Not Found</span>
                    </div>
                )
            }
            {
                (Repo && Loading && Parma) && (
                    <>
                        <Repoheader repo={Repo.model} owner={Parma.owner} info={Repo}/>
                    </>
                )
            }
            {props.children}
        </div>
    );
}