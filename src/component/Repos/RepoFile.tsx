import {RepoTree} from "@/api/dto/RepoDto.tsx";
import {Button, FormControl, SelectPanel, TreeView} from "@primer/react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ItemInput } from "@primer/react/lib/SelectPanel/types";
import {FaFileAlt} from "react-icons/fa";
import {GraphQLRepoBranchOv, GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";
import {useFiles} from "@/store/useFiles.tsx";

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
    const file = useFiles();
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
    const ClickFind = (path: string, filename: string) => {
        console.log(path, filename)
        file.getFiles(props.info.owner, props.info.repo, props.selectBranch.branch, path).then(res=>{
            console.log(res)
        })
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
                <div className="branch-info">branch:{props.branches.length}</div>
                <div className="right">
                    <input type="text" placeholder="Go to file" className="file-search"/>
                    <Button className="add-file">Add file</Button>
                    <Button className="code-button" variant="primary">Clone

                    </Button>

                </div>
            </div>
            <div className="repo-file-body">
                <TreeView aria-label="Files">
                    {FilePageBuild(props.tree.children, ClickFind)}
                </TreeView>
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const FilePageBuild = (tree: RepoTree[], click: Function) => {
    tree.sort((a,b)=>{
        if (a.is_dir !== b.is_dir){
            return a.is_dir ? -1 : 1
        }
        return a.name.localeCompare(b.name)
    })
    return tree.map((value, index)=>{
        const child = FilePageBuild(value.children,click);
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

                <TreeView.Item onSelect={()=>{
                    click(value.path, value.name)

                }} key={index} id={value.path}>
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