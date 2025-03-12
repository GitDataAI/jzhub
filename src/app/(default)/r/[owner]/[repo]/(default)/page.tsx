'use client'

import usePageContext from "@/store/usePageContext";
import {useEffect, useRef, useState} from "react";
import { Blob, BranchModel, CommitModel, Repository, Tree } from "@/server/types";
import { RepoApi } from "@/server/RepoApi";
import { notifications } from "@mantine/notifications";
import { AppWrite } from "@/server/Client";
import { FileTree } from "@/component/repo/filetree";
import { FileAction } from "@/component/repo/fileaction";
import { Loader } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RepoIntro } from "@/component/repo/repointro";
import { debounce } from 'lodash';

dayjs.extend(relativeTime);


export default function RepositoryPage() {
    const [repo, setRepo] = useState<Repository | undefined>();
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('intro');
    const [owner, setOwner] = useState({ owner: '', repo: '' });
    const [branch, setBranch] = useState<BranchModel[]>([]);
    const [defaultBranch, setDefaultBranch] = useState<BranchModel | undefined>(undefined);
    const [empty, setEmpty] = useState(false);
    const [bhct, setBhct] = useState<Blob | undefined>();
    const [headCommit, setHeadCommit] = useState<CommitModel | undefined>(undefined);
    const [tree, setTree] = useState<Tree | undefined>();
    const api = new RepoApi();

    const isMounted = useRef(true);
    const context = usePageContext();
   useEffect(() => {
       isMounted.current = true;
       const unsubscribe = usePageContext.subscribe((state,prev) => {
           if (state.repoCtx) {
               setRepo(state.repoCtx.repo);
               setOwner({
                   owner: state.repoCtx.owner,
                   repo: state.repoCtx.repoName,
               });
               if ((state.url !== prev.url) || !loading){
                   fetchBhctDebounced({
                       owner: state.repoCtx.owner,
                       repo: state.repoCtx.repoName,
                       model: state.repoCtx.repo,
                   });
               }
           }
       });

       return () => {
           isMounted.current = false;
           unsubscribe();
           fetchBhctDebounced.cancel();
       };
   }, [window.location.href]);
    useEffect(() => {
        usePageContext.subscribe((state) => {
           if (state.tab) {
               setTab(state.tab);
           }
        })
    }, [context.tab,]);

    const exchangeBranch = (branch: BranchModel) => {
        fetchTree({
            owner: owner.owner,
            repo: owner.repo,
            branch: branch.name,
            head: branch.head,
        }).catch((error) => console.error("Error fetching tree:", error));
        setDefaultBranch(branch);
    };

    const fetchBhctDebounced = debounce(async (props: { owner: string; repo: string; model: Repository }) => {
       setLoading(true);
       try {
           const basic = await api.Bhtc(props.owner, props.repo);
           if (basic.status !== 200) {
               throw new Error("Repo Not Found");
           }

           const json: AppWrite<Blob> = JSON.parse(basic.data);
           if (json.code !== 200 || !json.data) {
               throw new Error("Invalid data");
           }

           if (isMounted.current) {
               setBhct(json.data);

               const keys = Object.keys(json.data).map((key) => JSON.parse(key) as BranchModel);
               setBranch(keys);

               const defaultBranch = keys.find((key) => key.name === props.model.default_branch);
               if (defaultBranch) {
                   await fetchTree({
                       owner: props.owner,
                       repo: props.repo,
                       branch: props.model.default_branch,
                       head: defaultBranch.head,
                   });
                   setDefaultBranch(defaultBranch);

                   const commitData = await api.OneCommit(
                       props.owner,
                       props.repo,
                       props.model.default_branch,
                       defaultBranch.head
                   );
                   if (commitData.status === 200) {
                       const commitJson: AppWrite<CommitModel> = JSON.parse(commitData.data);
                       if (commitJson.code === 200 && commitJson.data) {
                           setHeadCommit(commitJson.data);
                       }
                   }
               } else if (keys.length > 0) {
                   await fetchTree({
                       owner: props.owner,
                       repo: props.repo,
                       branch: keys[0].name,
                       head: keys[0].head,
                   });
                   setDefaultBranch(keys[0]);

                   const commitData = await api.OneCommit(
                       props.owner,
                       props.repo,
                       keys[0].name,
                       keys[0].head
                   );
                   if (commitData.status === 200) {
                       const commitJson: AppWrite<CommitModel> = JSON.parse(commitData.data);
                       if (commitJson.code === 200 && commitJson.data) {
                           setHeadCommit(commitJson.data);
                       }
                   }
               } else {
                   setEmpty(true);
               }
           }
       } catch {
           notifications.show({
               title: '数据请求失败',
               message:  '未知错误',
               color: 'red',
           });
       } finally {
           if (isMounted.current) {
               setLoading(false);
           }
       }
   }, 1000);

    const fetchTree = async (props: { owner: string; repo: string; branch: string; head: string }) => {
        try {
            const basic = await api.Tree(props.owner, props.repo, props.branch, props.head);
            if (basic.status !== 200) {
                throw new Error("Repo Not Found");
            }

            const json: AppWrite<Tree> = JSON.parse(basic.data);
            if (json.code !== 200 || !json.data) {
                throw new Error("Invalid data");
            }

            if (isMounted.current) {
                setTree(json.data);
            }
        } catch  {
            notifications.show({
                title: '数据请求失败',
                message: '未知错误',
                color: 'red',
            });
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            {repo?.status === "Syncing" && (
                <div className="repo-sync">
                    <Loader color={"orange"} size={"xs"} />
                    <p>正在同步仓库索引中...</p>
                </div>
            )}
            {(repo && tree && bhct && defaultBranch && headCommit &&!loading) && (
                <>
                    {(tab === 'intro' || tab === '') && (
                        <div className="intro-page">
                            <RepoIntro
                                repo={repo}
                                owner={owner.owner}
                                branch={defaultBranch}
                                head={headCommit}
                                empty={empty}
                            />
                        </div>
                    )}
                    {tab === 'file' && !empty && (
                        <div className="file-page">
                            <FileAction
                                branch={branch}
                                default_branch={defaultBranch}
                                echange={exchangeBranch}
                                repo={repo}
                                owner={owner.owner}
                                head={headCommit}
                            />
                            <div className="file-body">
                                <FileTree tree={tree.child} />
                            </div>
                        </div>
                    )}

                </>
            )}
            {empty && <div>Empty</div>}
        </div>
    );
}
