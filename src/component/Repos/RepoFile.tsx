import {RepoTree} from "@/api/dto/RepoDto.tsx";
import {Button, FormControl, SelectPanel, TreeView} from "@primer/react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ItemInput } from "@primer/react/lib/SelectPanel/types";
import {FaFileAlt} from "react-icons/fa";
import {GraphQLRepoBranchOv, GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";
import Markdown from "react-markdown";
import Editor from '@monaco-editor/react';
export interface RepoFileProps{
    model: GraphQLRepoModel,
    branches: GraphQLRepoBranchOv[],
    selectBranch: GraphQLRepoBranchOv,
    info: {
        owner: string,
        repo: string
    },
    tree: RepoTree,
    isEmpty: boolean,
    clickFile(path: string, filename: string): void,
    showFile: boolean,
    showNow: {
        path: string,
        branch: string,
        data: Uint8Array
    } | null
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
    const [FIleElement, setFIleElement] = useState<JSX.Element | null>(null)
    useEffect(()=>{
        const FIleType = (filename: string) => {
            const type = filename.split(".").pop()
            const uint8Array = new Uint8Array([...props.showNow!.data]);
            const decoder = new TextDecoder('utf-8');
            const str = decoder.decode(uint8Array);
            if (type === "md" || type === "markdown" || type === "mdx") {
                return <Markdown className={"repo-readme-content"}>{str}</Markdown>
            }
            if (type === "png" || type === "jpg" || type === "jpeg" || type === "gif" || type === "bmp" || type === "svg") {
                return <img src={URL.createObjectURL(new Blob([props.showNow!.data]))} alt={filename}/>
            }
            if (
                type === "txt" ||
                type === "log" ||
                type === "json" ||
                type === "xml" ||
                type === "html" ||
                type === "css" ||
                type === "js" ||
                type === "ts" ||
                type === "tsx" ||
                type === "jsx" ||
                type === "yml" ||
                type === "yaml" ||
                type === "conf" ||
                type === "ini" ||
                type === "java" ||
                type === "c" ||
                type === "cpp" ||
                type === "h" ||
                type === "hpp" ||
                type === "php" ||
                type === "py" ||
                type === "rb" ||
                type === "go" ||
                type === "rs" ||
                type === "cmake" ||
                type === "makefile" ||
                type === "dockerfile" ||
                type === "sh" ||
                type === "bat" ||
                type === "ps1" ||
                type === "cmd" ||
                type === "gitignore" ||
                type === "gitattributes" ||
                type === "gitmodules" ||
                type === "gitconfig"
            )
            {
                return (
                    <>
                        <Editor onChange={() => {
                            return false;
                        }} height="50vh" defaultLanguage={type} value={str} options={{
                            readOnly: true,
                            selectOnLineNumbers: true,
                            automaticLayout: true,
                            minimap: {
                                enabled: false
                            },
                            lineNumbers: "on",
                            renderLineHighlight: "none",
                            scrollBeyondLastLine: false,
                            scrollbar: {
                                vertical: "auto",
                                horizontal: "hidden"
                            }
                        }}/>
                    </>
                )
            }
            console.log(type)
            return (
                <div className="repo-file-disable">
                    <h1>This file is not currently supported for viewing</h1>
                </div>
            )
        }
        if (props.showNow !== null) {
            setFIleElement(FIleType(props.showNow!.path));
        }
    }, [props.showNow])
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
                    {
                        props.showFile ?
                            <>
                                <input type="text" placeholder="Go to file" className="file-search"/>
                                <Button className="add-file">Add file</Button>
                                <Button className="code-button" variant="primary">Clone</Button>
                            </>
                            :
                            null
                    }
                </div>
            </div>
            <div className={props.showFile ? "repo-file-body" : "repo-file-body-side"}>
                <TreeView aria-label="Files">
                {FilePageBuild(props.tree.children, props.clickFile)}
                </TreeView>
                {
                    props.showFile ? null : (
                        <div className="repo-file-content">
                            <div className="repo-file-content-header">
                                <a>
                                    Path: {props.showNow?.path}
                                </a>
                                <a>
                                    Size: {
                                    props.showNow!.data.length > 1024 ?
                                        (props.showNow!.data.length / 1024).toFixed(2) + "kb"
                                        :
                                        props.showNow?.data.length + "b"
                                }
                                </a>
                            </div>
                            <div className="repo-file-content-body">
                                {FIleElement}
                            </div>
                        </div>
                    )
                }
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