'use client'

import usePageContext from "@/store/usePageContext";
import {useEffect, useState} from "react";
import {Blob, Branches, Repository, Tree} from "@/server/types";
import {RepoApi} from "@/server/RepoApi";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {FileTree} from "@/component/repo/filetree";
import {FileAction} from "@/component/repo/fileaction";

export default function RepositoryPage() {
    const [Repo, setRepo] = useState<Repository | undefined>()
    const [Loading, setLoading] = useState(false);
    const [Tab, setTab] = useState('');
    const [Owner, setOwner] = useState({
        owner: '',
        repo: ''
    })

    const [Branch,setBranch] = useState<Branches[]>([])
    const [DefaultBranch, setDefaultBranch] = useState<Branches | undefined>(undefined)

    const ExchangeBranch = (branch: Branches) => {
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
            const result:Branches = JSON.parse(key)
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
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
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
                (Repo && !Empty && Tree && Bhct && DefaultBranch ) && (
                    <>
                        {
                            Tab === 'file' && (
                                <div className="file-page">
                                    <FileAction branch={Branch} default_branch={DefaultBranch} echange={ExchangeBranch} repo={Repo} owner={Owner.owner}/>
                                    <div className="file-body">
                                        <FileTree tree={Tree.child}/>
                                    </div>
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