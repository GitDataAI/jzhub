import {useParams, useSearchParams} from "react-router-dom";
import {LayoutHeader} from "@/component/layout/Header.tsx";
import {Box, Breadcrumbs, Button, Label, PageHeader, UnderlineNav} from "@primer/react";
import {GoEye, GoGitPullRequest, GoRepoForked} from "react-icons/go";
import {FaBoxTissue} from "react-icons/fa";
import {useEffect, useState} from "react";
import {RepoAPi} from "@/api/action/Repo.tsx";
import {RepoBranchModel, RepoModel, RepoTree} from "@/api/dto/RepoDto.tsx";
import {CiSettings, CiStar} from "react-icons/ci";
import {BsFiles} from "react-icons/bs";
import {useInfo} from "@/store/useInfo.tsx";
import RepoFile from "@/component/Repos/RepoFile.tsx";

const RepoLayout = () => {
    const { owner, repo } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    const [tab, setTab] = useState(searchParams.get('tab'))
    const info = useInfo();
    const [Active, setActive] = useState("Files");
    const repo_api = new RepoAPi();
    const [Repo, setRepo] = useState<RepoModel>();
    const [Branches, setBranches] = useState<RepoBranchModel[]>([]);
    const [selectbranch, setSelectBranch] = useState<RepoBranchModel>();
    const [Tree, setTree] = useState<RepoTree>()
    const [Load, setLoad] = useState(false);
    useEffect(()=>{
       repo_api.Info(owner!,repo!).then(res=>{
           if (res.data.code === 200 && res.status === 200){
               setRepo({
                   ...res.data.data!,
                   owner: owner!,
                   name: repo!
               });
           }
       })
        repo_api.GetBranch(owner!,repo!).then(res=>{
            if (res.data.code === 200 && res.status === 200){
                setBranches(res.data.data!)
                setSelectBranch(res.data.data![0])
                repo_api.Tree(owner!,repo!,res.data.data![0].branch).then(res=>{
                    setTree(res.data.data!)
                    setLoad(true)
                })
            }
        })
        info.setHref({
            label: `${owner}/${repo}`,
            url: `/${owner}/${repo}`
        })
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
            count: Repo?.open_issue || 0
        },
        {
            label: "Pull requests",
            url: "pr",
            icon: <GoGitPullRequest/>,
            count: Repo?.open_pr || 0
        },
        {
            label: "Setting",
            url: "setting",
            icon: <CiSettings />
        },

    ]
    return(
        <>
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
                            <Label className="label">{Repo?.visible ? "Public" : "Private"}</Label>
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
                            <Button count={Repo?.fork} className="repo-header-btn" variant="default"><GoEye/><a>Watch</a></Button>
                            <Button count={Repo?.fork} className="repo-header-btn" variant="default"><GoRepoForked/><a>Fork</a></Button>
                            <Button count={Repo?.star} className="repo-header-btn" variant="default"><CiStar/><a>Starred</a></Button>
                    </PageHeader.Actions>
                </PageHeader>
                {
                    Load ? (
                        <div className="repo-body">
                            {
                                tab === 'files' && Load ?
                                    <RepoFile model={Repo!} branches={Branches} info={{
                                        owner: owner!,
                                        repo: repo!
                                    }} selectBranch={selectbranch!} tree={Tree!}/>
                                    : null
                            }
                        </div>
                    ) : null
                }

            </Box>

        </>
    )
}

export default RepoLayout