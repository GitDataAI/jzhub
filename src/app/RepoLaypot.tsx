import {useParams, useSearchParams} from "react-router-dom";
import {LayoutHeader} from "@/component/layout/Header.tsx";
import {Box, Breadcrumbs, Button, Label, PageHeader, UnderlineNav} from "@primer/react";
import {GoEye, GoGitPullRequest, GoRepoForked} from "react-icons/go";
import {FaBoxTissue} from "react-icons/fa";
import {useEffect, useState} from "react";
import {RepoTree} from "@/api/dto/RepoDto.tsx";
import {CiSettings, CiStar} from "react-icons/ci";
import {BsFiles} from "react-icons/bs";
import {useInfo} from "@/store/useInfo.tsx";
import RepoFile from "@/component/Repos/RepoFile.tsx";
import {useRepo} from "@/store/useRepo.tsx";
import {GraphQLRepoBranchOv, GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";

const RepoLayout = () => {
    const { owner, repo } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    const [tab, setTab] = useState(searchParams.get('tab'))
    const info = useInfo();
    const [Active, setActive] = useState("Files");
    const repo_graphql = useRepo();
    const [Repo, setRepo] = useState<GraphQLRepoModel>();
    const [Tree, setTree] = useState<RepoTree>()
    const [Load, setLoad] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [SelectBranch,setSelectBranch] = useState<GraphQLRepoBranchOv>();
    useEffect(()=>{
        info.setHref({
            label: `${owner}/${repo}`,
            url: `/${owner}/${repo}`
        })
        repo_graphql.getModel(owner!, repo!).then(res=>{
            setRepo(res)
            if (res.branchs && res.branchs.length > 0){
                let selectbranch = res.branchs[0].branch;
                repo_graphql.getTree(owner!, repo!, selectbranch).then(res=>{
                    setTree(res.tree!.tree)
                    setSelectBranch(res.branchs![0])
                    setLoad(true)
                })
            }else {
                setIsEmpty(true)
            }
        });
        if (!tab){
            setSearchParams({tab:'files'})
            setTab('files')
        }
    },[])
    const HeaderItem = [
        {
            label: "Files",
            url: "files",
            icon: <BsFiles />
        },
        {
            label: "Issues",
            url: "issues",
            icon: <FaBoxTissue/>,
            count: Repo?.data?.open_issue || 0
        },
        {
            label: "Pull requests",
            url: "pr",
            icon: <GoGitPullRequest/>,
            count: Repo?.data?.open_pr || 0
        },
        {
            label: "Setting",
            url: "setting",
            icon: <CiSettings />
        },

    ]
    return(
        <div onClick={(e)=>{
            info.setModelShowId(0);
            e.preventDefault();
        }}>
            <LayoutHeader/>
            <Box>
                <PageHeader className="repo-header" role="banner" aria-label={`${owner}/${repo}`}>
                    <PageHeader.TitleArea>
                        <PageHeader.Title className="title">
                            <Breadcrumbs>
                             <Breadcrumbs.Item>
                                 {owner}
                             </Breadcrumbs.Item>
                             <Breadcrumbs.Item>
                                 {repo}
                             </Breadcrumbs.Item>
                            </Breadcrumbs>
                        </PageHeader.Title>
                        <PageHeader.TrailingVisual>
                            <Label className="label">{Repo?.profile?.visible ? "Public" : "Private"}</Label>
                        </PageHeader.TrailingVisual>
                    </PageHeader.TitleArea>
                    <PageHeader.Navigation>
                        <UnderlineNav aria-label="Repository">
                            {HeaderItem.map((item, index)=>{
                                return <UnderlineNav.Item
                                    counter={item.count}
                                    aria-current={Active === item.label ? "page" : undefined}
                                    onClick={()=>{
                                        setActive(item.label)
                                        setTab(item.url)
                                        setSearchParams({tab: item.url})
                                    }}
                                    key={index} icon={item.icon}
                                >{item.label}</UnderlineNav.Item>
                            })}
                        </UnderlineNav>
                    </PageHeader.Navigation>
                    <PageHeader.Actions>
                            <Button count={Repo?.data!.watch} className="repo-header-btn" variant="default"><GoEye/><a>Watch</a></Button>
                            <Button count={Repo?.data!.fork} className="repo-header-btn" variant="default"><GoRepoForked/><a>Fork</a></Button>
                            <Button count={Repo?.data!.star} className="repo-header-btn" variant="default"><CiStar/><a>Starred</a></Button>
                    </PageHeader.Actions>
                </PageHeader>
                {
                    Load ? (
                        <div className="repo-body">
                            {
                                tab === 'files' && Load ?
                                    <>
                                        {
                                            isEmpty ?
                                            <>

                                            </>:
                                            <>
                                                <RepoFile model={Repo!} branches={Repo!.branchs!} info={{
                                                    owner: owner!,
                                                    repo: repo!
                                                }} isEmpty={isEmpty} selectBranch={SelectBranch!} tree={Tree!}/>
                                            </>
                                        }
                                    </>
                                    : null
                            }
                        </div>
                    ) : null
                }
            </Box>
        </div>
    )
}

export default RepoLayout