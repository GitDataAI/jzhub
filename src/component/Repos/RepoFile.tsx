import {RepoTree} from "@/api/dto/RepoDto.tsx";
import {Button, FormControl, SelectPanel, TreeView} from "@primer/react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ItemInput } from "@primer/react/lib/SelectPanel/types";
import {FaFileAlt} from "react-icons/fa";
import {GraphQLRepoBranchOv, GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";

export interface RepoFileProps{
    model: GraphQLRepoModel,
    branches: GraphQLRepoBranchOv[],
    selectBranch: GraphQLRepoBranchOv,
    info: {
        owner: string,
        repo: string
    },
    tree: RepoTree,
    isEmpty: boolean
}

const RepoFile = (props: RepoFileProps) => {
    const items:ItemInput[] = props.branches.map(item => ({
        text: item.branch,
        id: item.created_at
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

    if (props.isEmpty) {
        return (
            <div className="repo-file">

            </div>
        )
    }
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
                    <Button className="code-button" variant="primary">Clone

                    </Button>

                </div>
            </div>
            <div className="repo-file-body">
                <TreeView aria-label="Files">
                    {FilePageBuild(props.tree.children)}
                </TreeView>
            </div>
        </div>
    )
}

const FilePageBuild = (tree: RepoTree[]) => {
    tree.sort((a,b)=>{
        if (a.is_dir !== b.is_dir){
            return a.is_dir ? -1 : 1
        }
        return a.name.localeCompare(b.name)
    })
    return tree.map((value, index)=>{
        const child = FilePageBuild(value.children);
        if (value.is_dir) {
            return(
                <TreeView.Item key={index} id={value.path}>
                    <TreeView.LeadingVisual>
                        <TreeView.DirectoryIcon />
                    </TreeView.LeadingVisual>
                    {value.name}
                    <TreeView.SubTree>
                        {child}
                    </TreeView.SubTree>
                </TreeView.Item>
            )
        }else {
            return (

                <TreeView.Item key={index} id={value.path}>
                    <TreeView.LeadingVisual>
                        <FaFileAlt />
                    </TreeView.LeadingVisual>
                    {value.name}
                </TreeView.Item>
            )
        }
    })
}

export default RepoFile