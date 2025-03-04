'use client'

import React, {useEffect, useState} from "react";
import {RepoApi} from "@/server/RepoApi";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {RepoInfo} from "@/server/types";
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
        setRepo(json.data);
        context.setRepoCtx({
            repo: json.data.model,
            owner: owner,
            repoName: repo,
            repoInfo: json.data
        })
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