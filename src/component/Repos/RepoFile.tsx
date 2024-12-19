import {RepoBranchModel, RepoModel, RepoTree} from "@/api/dto/RepoDto.tsx";
import {Button, FormControl, SelectPanel, TreeView} from "@primer/react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ItemInput } from "@primer/react/lib/SelectPanel/types";
import {FaFileAlt} from "react-icons/fa";

export interface RepoFileProps{
    model: RepoModel,
    branches: RepoBranchModel[],
    selectBranch: RepoBranchModel,
    info: {
        owner: string,
        repo: string
    },
    tree: RepoTree,
}

const RepoFile = (props: RepoFileProps) => {
    const items:ItemInput[] = props.branches.map(item => ({
        text: item.branch,
        id: item.repo_id
    }))
    const [selected, setSelected] = useState<ItemInput>({
        text: props.selectBranch.branch,
        id: props.selectBranch.uid
    });
    useEffect(()=>{
       for(let i=0;i<props.branches.length;i++) {
           if (props.branches[i] != null) {
               setSelected(items[i])
               break
           }
       }
    },[])
    const [open, setOpen] = useState(false)

    return (
        <div className="repo-file">
            <div className="repository-header">
                <FormControl className="branch-selector">
                    <SelectPanel
                       items={items}
                       onOpenChange={setOpen}
                       onSelectedChange={setSelected}
                       selected={selected}
                       onFilterChange={()=>{}}
                       open={open}
                    >
                    </SelectPanel>
                </FormControl>
                <div className="branch-info">{props.branches.length} Branches </div>
                <div className="right">
                    <input type="text" placeholder="Go to file" className="file-search"/>
                    <Button className="add-file">Add file</Button>
                    <Button className="code-button" variant="primary">Clone</Button>
                </div>
            </div>
            <div className="repo-file-body">
                <TreeView aria-label="Files">
                    {FilePageBuild(props.tree)}
                </TreeView>
            </div>
        </div>
    )
}

const FilePageBuild = (tree: RepoTree) => {
    return (
        <>
            {
                tree.children.map((value, index)=>{
                    if (!value.id_dir) {
                        return(
                            <TreeView.Item key={index} id={value.path}>
                                <TreeView.LeadingVisual>
                                    <FaFileAlt />
                                </TreeView.LeadingVisual>
                                {value.name}
                            </TreeView.Item>
                        )
                    }else {
                        return (
                            <TreeView.Item key={index} id={value.path}>
                                <TreeView.LeadingVisual>
                                    <FaFileAlt />
                                </TreeView.LeadingVisual>
                                <TreeView.SubTree>
                                    {FilePageBuild(value)}
                                </TreeView.SubTree>
                            </TreeView.Item>
                        )
                    }
                })
            }
        </>
    )
}

export default RepoFile