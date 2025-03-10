'use client'

import usePageContext from "@/store/usePageContext";
import {useEffect, useState} from "react";
import {Blob, BranchModel, CommitModel, Repository, Tree} from "@/server/types";
import {RepoApi} from "@/server/RepoApi";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {FileTree} from "@/component/repo/filetree";
import {FileAction} from "@/component/repo/fileaction";
import {Loader} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {RepoIntro} from "@/component/repo/repointro";

dayjs.extend(relativeTime);


export default function RepositoryPage() {
    const [Repo, setRepo] = useState<Repository | undefined>()
    const [Loading, setLoading] = useState(false);
    const [Tab, setTab] = useState('intro');
    const [Owner, setOwner] = useState({
        owner: '',
        repo: ''
    })

    const [Branch,setBranch] = useState<BranchModel[]>([])
    const [DefaultBranch, setDefaultBranch] = useState<BranchModel | undefined>(undefined)

    const ExchangeBranch = (branch: BranchModel) => {
        FatchTree({
            owner: Owner.owner,
            repo: Owner.repo,
            branch: branch.name,
            head: branch.head
        }).then().catch();
        setDefaultBranch(branch)
    }

    const [Empty, setEmpty] = useState(false);

    const [Bhct,setBhct] = useState<Blob | undefined>();
    const [HeadCommit,setHeadCommit] = useState<CommitModel | undefined>(undefined)
    const api = new RepoApi();
    const FatchBhct = async (props: {owner: string, repo: string, model: Repository}) => {
        const basic = await api.Bhtc(props.owner, props.repo);
        if (basic.status !== 200) {
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
        }
        const json:AppWrite<Blob> = JSON.parse(basic.data);
        if (json.code !== 200 || !json.data) {
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
            return;
        }
        setBhct(json.data)
        setLoading(false);
        const keys = Object.keys(json.data).map((key)=>{
            const result:BranchModel = JSON.parse(key)
            return result
        })
        setBranch(keys)
        if (keys.find((key) => key.name === props.model.default_branch)){
            const head = keys.find((key) => key.name === props.model.default_branch);
            if (head){
                FatchTree({
                    owner: props.owner,
                    repo: props.repo,
                    branch: props.model.default_branch,
                    head: head.head
                }).then().catch();
                setDefaultBranch(head)
                api.OneCommit(
                    props.owner,
                    props.repo,
                    props.model.default_branch,
                    head.head
                )
                    .then((data) => {
                        if (data.status === 200) {
                            const json:AppWrite<CommitModel> = JSON.parse(data.data);
                            if (json.code === 200 && json.data) {
                                setHeadCommit(json.data)
                            }
                        }
                    })
            }
        }else {
            if (keys.length > 0) {
                FatchTree({
                    owner: props.owner,
                    repo: props.repo,
                    branch: keys[0].name,
                    head: keys[0].head
                }).then().catch();
                setDefaultBranch(keys[0])
                api.OneCommit(
                    props.owner,
                    props.repo,
                    keys[0].name,
                    keys[0].head
                )
                    .then((data) => {
                        if (data.status === 200) {
                            const json:AppWrite<CommitModel> = JSON.parse(data.data);
                            if (json.code === 200 && json.data) {
                                setHeadCommit(json.data)
                            }
                       }
                    })
            }else {
                setLoading(false);
                setEmpty(true)
            }
        }
    }

    const [Tree,setTree] = useState<Tree | undefined>();

    const FatchTree = async (props: {owner: string, repo: string, branch: string, head: string},) => {
        const basic = await api.Tree(props.owner, props.repo, props.branch, props.head);
        if (basic.status !== 200) {
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
        }
        const json:AppWrite<Tree> = JSON.parse(basic.data);
        if (json.code !== 200 || !json.data) {
            return;
        }
        setTree(json.data)
        setLoading(false);
    }

    const context = usePageContext();

    useEffect(() => {
        return usePageContext.subscribe((state)=> {
            if (state.repoCtx) {
                setRepo(state.repoCtx.repo)
                setOwner({
                    owner: state.repoCtx.owner,
                    repo: state.repoCtx.repoName
                })
                FatchBhct({
                    owner: state.repoCtx.owner,
                    repo: state.repoCtx.repoName,
                    model: state.repoCtx.repo
                }).then().catch();
            }
            if (state.tab) {
                setTab(state.tab)
            }
        })
    }, [context.url]);
    return (
        <div>
            {
                Repo?.status === "Syncing" && (
                    <div className="repo-sync">
                        <Loader color={"orange"} size={"xs"}/>
                        <p>正在同步仓库索引中...</p>
                    </div>
                )
            }
            {
                (Repo && !Empty && Tree && Bhct && DefaultBranch && HeadCommit ) && (
                    <>
                        {
                            Tab === 'file' && (
                                <div className="file-page">
                                    <FileAction branch={Branch} default_branch={DefaultBranch} echange={ExchangeBranch} repo={Repo} owner={Owner.owner} head={HeadCommit}/>
                                    <div className="file-body">
                                        <FileTree tree={Tree.child}/>
                                    </div>
                                </div>
                            )
                        }
                        {
                            Tab === 'intro' && (
                                <div className="intro-page">
                                    <RepoIntro repo={Repo} owner={Owner.owner} branch={DefaultBranch} head={HeadCommit} />
                                </div>
                            )
                        }
                    </>
                )
            }
            {
                Empty && (
                    <div>
                        Empty
                    </div>
                )
            }
            {
                Loading && (
                    <div>
                        Loading...
                    </div>
                )
            }
        </div>
    )
}