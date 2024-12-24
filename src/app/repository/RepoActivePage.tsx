import {LayoutHeader} from "@/component/layout/Header.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Breadcrumbs, RelativeTime} from "@primer/react";
import {GraphQLRepoCommits} from "@/api/graphql/repo/Struct.tsx";
import {useRepo} from "@/store/useRepo.tsx";


const RepoActivePage = () => {
    const { owner, repo } = useParams();
    const nav = useNavigate();
    // const [Repo, setRepo] = useState<GraphQLRepoModel>();
    const repo_graphql = useRepo();
    const [BranchsCommits, setCommits] = useState<{branchs: string, commits: GraphQLRepoCommits}[]>();
    // const [Page, setPage] = useState<number>(0);
    useEffect(()=>{
        repo_graphql.getModel(owner!, repo!).then(res=>{
            // setRepo(res)
            repo_graphql.getCommits(owner!, repo!, res.branchs![0].branch,0, 100).then(res=>{
                let commits: {branchs: string, commits: GraphQLRepoCommits}[]= [];
                if (res.branchs){
                    for (let i = 0; i < res.branchs.length; i++) {
                        for (let j = 0; j < res.branchs[i].commit.length; j++) {
                            commits = commits.concat({branchs: res.branchs[i].branch, commits: res.branchs[i].commit[j]})
                        }
                    }
                }
                commits.sort((a, b)=>{
                    return b.commits.created_at - a.commits.created_at
                })
                setCommits(commits)
                console.log(commits)
            })
            console.log(res)
        })
    },[])
    return(
        <>
            <LayoutHeader/>
            <div className="repo-active">
                <div className="repo-active-header">
                    <div className="repo-active-header-title">
                        <Breadcrumbs>
                            <Breadcrumbs.Item onClick={()=>{
                                nav(`/${owner}`)
                            }}>
                                {owner}
                            </Breadcrumbs.Item>
                            <Breadcrumbs.Item onClick={()=>{
                                nav(`/${owner}/${repo}`)
                            }}>
                                {repo}
                            </Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>
                    <div className="repo-active-header-branch">

                    </div>
                </div>
                <div className="repo-active-list">
                    {
                        BranchsCommits?.map((item, index)=>{
                            const lastUpdated = new Date(item.commits.created_at * 1000);
                            return (
                                <div className="repo-active-list-item" key={index}>
                                    <h2>
                                        {item.commits.bio}
                                    </h2>
                                    <div className="repo-active-list-item-tag">
                                        <a>
                                            {item.commits.commit_user}
                                        </a>
                                        <i>
                                            {item.branchs}
                                        </i>
                                        <a>
                                            {item.commits.commit_id}
                                        </a>
                                        <a className="repo-active-list-item-tag-update">Updated <RelativeTime date={lastUpdated} noTitle={true}/></a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default RepoActivePage