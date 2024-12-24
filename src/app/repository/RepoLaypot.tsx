import {useNavigate, useParams, useSearchParams} from "react-router-dom";
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
import RepoInfo from "@/component/Repos/RepoInfo.tsx";
import {useFiles} from "@/store/useFiles.tsx";
import ReactMarkdown from "react-markdown";
import RepoEmpty from "@/component/Repos/RepoEmpty.tsx";
import RepoSetting from "@/component/Repos/RepoSetting.tsx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import rehypeRaw from 'rehype-raw';
import CodeBlock from "@/utils/CodeBlock.tsx";



const RepoLayout = () => {
    const { owner, repo } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    const [tab, setTab] = useState(searchParams.get('tab'))
    const info = useInfo();
    const [Active, setActive] = useState("Files");
    const repo_graphql = useRepo();
    const file = useFiles();
    const [Repo, setRepo] = useState<GraphQLRepoModel>();
    const [Tree, setTree] = useState<RepoTree>()
    const [Load, setLoad] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [SelectBranch,setSelectBranch] = useState<GraphQLRepoBranchOv>();
    const [Readme, setReadme] = useState<string>("")
    const [ShowFile, setShowFile] = useState<null | {
        path: string,
        branch: string,
        data: Uint8Array
    }>(null);
    const files = useFiles();
    const nav = useNavigate();
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
                    let child = res.tree!.tree.children.find(item=>item.name.toUpperCase() === 'README.MD')
                    if (child){
                        files.getFiles(owner!, repo!, selectbranch, child.path).then(res=>{
                            const uint8Array = new Uint8Array([...res]);
                            const decoder = new TextDecoder('utf-8');
                            const markdownString = decoder.decode(uint8Array);
                            setReadme(markdownString)
                            console.log(markdownString)
                        })
                    }
                    setLoad(true)
                }).catch(()=>{
                    setIsEmpty(true)
                    setLoad(true)
                })
            }else {
                console.log("No branch")
                setIsEmpty(true)
                setLoad(true)
            }
        });

        if (!tab){
            setSearchParams({tab:'files'})
            setTab('files')
        }
    },[])
    const FluseTree = (branch:string, commit?:string) => {
        repo_graphql.getTree(owner!, repo!, branch).then(res=>{
            setTree(res.tree!.tree);
            console.log(commit);
            setSelectBranch(res.branchs!.find(item=>item.branch === branch))
        })
    }
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
    const ClickFind = (path?: string, filename?: string) => {
        console.log(path, filename)
        if (filename){
            if (path){
                file.getFiles(owner!, repo!, SelectBranch!.branch!, path).then(res=>{
                    setShowFile({
                        path: path,
                        branch: SelectBranch?.branch || "",
                        data: res
                    });
                })
            }else {
                setShowFile(null)
            }
        }else {
            setShowFile(null)
        }

    }
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
                             <Breadcrumbs.Item onClick={()=>{
                                 nav(`/${owner}`)
                             }}>
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
                                                <RepoEmpty model={Repo!} info={{
                                                    owner: owner!,
                                                    repo: repo!
                                                }}/>
                                            </>:
                                            <div>
                                                {
                                                    ShowFile === null ? (
                                                        <>
                                                            <RepoFile model={Repo!} branches={Repo!.branchs!} info={{
                                                                owner: owner!,
                                                                repo: repo!
                                                            }}
                                                                      isEmpty={isEmpty}
                                                                      selectBranch={SelectBranch!}
                                                                      tree={Tree!}
                                                                      clickFile={ClickFind}
                                                                      showFile={true}
                                                                      showNow={ShowFile}
                                                                      FlushTree={FluseTree}
                                                            />
                                                            {Readme.length > 0 ?
                                                                <div className="repo-readme">
                                                                    <div className="repo-readme-select">
                                                                        <a>README</a>
                                                                    </div>
                                                                    <div className="repo-readme-content">
                                                                        <ReactMarkdown
                                                                            components={{
                                                                                code({
                                                                                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                                                         node,
                                                                                         className, children, ...props }) {
                                                                                    const match = /language-(\w+)/.exec(className || '');
                                                                                    return match ? (
                                                                                        <CodeBlock
                                                                                            language={match[1]}
                                                                                            value={String(children).replace(/\n$/, '')}
                                                                                        />
                                                                                    ) : (
                                                                                        <code className={className} {...props}>
                                                                                            {children}
                                                                                        </code>
                                                                                    );
                                                                                },
                                                                            }}
                                                                            unwrapDisallowed={true}
                                                                            skipHtml={false}
                                                                            remarkPlugins={[remarkHtml,remarkGfm]}
                                                                            className="prose prose-zinc max-w-none dark:prose-invert"
                                                                            rehypePlugins={[rehypeHighlight,rehypeRaw]}>{Readme}</ReactMarkdown>
                                                                    </div>
                                                                </div>
                                                                :null
                                                            }
                                                        </>
                                                    ):(
                                                        <>
                                                            <RepoFile model={Repo!} branches={Repo!.branchs!} info={{
                                                                owner: owner!,
                                                                repo: repo!
                                                            }} isEmpty={isEmpty}
                                                                      selectBranch={SelectBranch!}
                                                                      tree={Tree!}
                                                                      clickFile={ClickFind}
                                                                      FlushTree={FluseTree}
                                                                      showFile={false}
                                                                      showNow={ShowFile}/>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        }
                                        <RepoInfo model={Repo!.profile!} info={{
                                            owner: owner!,
                                            repo: repo!
                                        }} isEmpty={isEmpty} data={Repo!.data!}/>
                                    </>
                                    : null
                            }
                            {
                                tab === 'setting' ? (
                                    <>
                                        <RepoSetting/>
                                    </>
                                ): null
                            }
                        </div>
                    ) : null
                }
            </Box>
        </div>
    )
}

export default RepoLayout