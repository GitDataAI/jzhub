import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {BlobTreeMsg, BranchModel, RepoModel} from "../../lib/model/RepoModel.tsx";
import {RepoApi} from "../../lib/api/RepoApi.tsx";
import {Button, FormControl, RelativeTime, SelectPanel, TreeView} from "@primer/react";
import {CiFileOn} from "react-icons/ci";
import RepoInfo from "../../component/repo/RepoInfo.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ItemInput} from "@primer/react/lib/deprecated/ActionList";

const FileTree = () => {
    const repo_api = new RepoApi();
    const { owner, repo } = useParams();
    const [Loading, setLoading] = useState(true);
    const [RepoModel ,setRepoModel] = useState<RepoModel | null>(null)
    const [FileTrees,setFileTrees] = useState<BlobTreeMsg | null>(null);
    const [Branchs, setBrachs] = useState<BranchModel[]>([])
    const [SELECTBranch,setSELECTBranch] = useState<BranchModel | null>(null)
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        if (owner && repo){
            repo_api.RepoInfo(owner,repo)
                .then(res=>{
                    if (res.data.code === 200){
                        if (res.data.data){
                            setRepoModel(res.data.data)
                            setLoading(false)
                            repo_api.GetBranch(owner,repo).then(res=>{
                                if (res.data.code === 200 && res.data.data){
                                    setBrachs(res.data.data)
                                    setSELECTBranch(res.data.data[0])
                                    repo_api.GetTree(owner,repo,res.data.data[0].name).then(res=>{
                                        if (res.data.code === 200 && res.data.data){
                                            const tree = res.data.data
                                            tree.children = tree.children.sort((a, b) => {
                                                if (a.is_dir && !b.is_dir) {
                                                    return -1;
                                                }
                                                if (!a.is_dir && b.is_dir) {
                                                    return 1;
                                                }
                                                return 0;
                                            })
                                            setFileTrees(tree)
                                        }
                                    })
                                }
                            })
                        }else {
                            setLoading(false)
                        }
                    }else {
                        setLoading(false)
                    }
                })
        }
    },[]);
    const RefreshTree = (branch: string) => {
        repo_api.GetTree(owner!,repo!,branch).then(res=>{
            if (res.data.code === 200 && res.data.data){
                const tree = res.data.data
                tree.children = tree.children.sort((a, b) => {
                    if (a.is_dir && !b.is_dir) {
                        return -1;
                    }
                    if (!a.is_dir && b.is_dir) {
                        return 1;
                    }
                    return 0;
                })
                setFileTrees(tree)
            }
        })
    }
    return (
        <div >
            {
                Loading  ? (
                    <div>Loading...</div>
                ) : (
                    <div>

                        <div className="file-tree">
                            {FileTrees && (
                                <div className="tree">
                                    <div className="file-header">
                                        <div className="repository-header">
                                            <FormControl className="branch-selector">
                                                <SelectPanel
                                                    items={Branchs.map((x)=>{
                                                        return {
                                                            text: x.name,
                                                            id: x.uid
                                                        }
                                                    })}
                                                    onOpenChange={setOpen}
                                                    onSelectedChange={(x: ItemInput) => {
                                                        RefreshTree(x.text)
                                                        setSELECTBranch(x)
                                                    }}
                                                    selected={{
                                                        text: SELECTBranch?.name,
                                                        id: SELECTBranch?.uid
                                                    }}
                                                    onFilterChange={() => {
                                                    }}
                                                    open={open}
                                                >
                                                </SelectPanel>
                                            </FormControl>
                                            <div className="branch-info">branch:{Branchs.length}</div>
                                            <div className="right">
                                                <Button className="add-file">Add file</Button>
                                                <Button className="code-button"
                                                        variant="primary">Clone</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <TreeView style={{
                                        padding: "10px"
                                    }} aria-label="Files changed" flat>
                                        <TreeBuild model={FileTrees} deep={0}/>
                                    </TreeView>
                                </div>
                            )}
                            <div>
                                {
                                    RepoModel && (
                                        <RepoInfo model={RepoModel}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

interface TreeBuildProps {
    model: BlobTreeMsg,
    deep: number
}

const TreeBuild = (props: TreeBuildProps) => {
    return (
        <div>
            {
                props.model.children.map((item: BlobTreeMsg) => {
                    if (item.is_dir) {
                        return (
                            <TreeView.Item id={item.path}>
                                <TreeView.LeadingVisual>
                                    <TreeView.DirectoryIcon/>
                                </TreeView.LeadingVisual>
                                {item.name}
                                <TreeView.SubTree>
                                    <TreeBuild model={item} deep={props.deep + 1}/>
                                </TreeView.SubTree>
                            </TreeView.Item>
                        )
                    }
                    return (
                        <div style={{
                            marginLeft: props.deep * 10
                        }}>
                            <TreeView.Item key={item.path} id={item.path}>
                                <TreeView.LeadingVisual>
                                    <CiFileOn />
                                </TreeView.LeadingVisual>
                                <div className="file-tree-item">
                                    <a>{item.name}</a>
                                    <span>{item.msg}</span>
                                    <b> <RelativeTime date={new Date(item.time * 1000)} noTitle={true}/></b>
                                </div>
                            </TreeView.Item>
                        </div>
                    )
                })
            }
        </div>
    )
}




export default FileTree