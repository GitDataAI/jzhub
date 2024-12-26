import {RepoTree} from "@/api/dto/RepoDto.tsx";
import {Button, FormControl, SelectPanel, TreeView} from "@primer/react";
import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ItemInput } from "@primer/react/lib/SelectPanel/types";
import { Icon } from '@fluentui/react/lib/Icon';
import {FaFileAlt} from "react-icons/fa";
import {GraphQLRepoBranchOv, GraphQLRepoModel} from "@/api/graphql/repo/Struct.tsx";
import Editor, {OnMount} from '@monaco-editor/react';
import {getFileTypeIconProps, initializeFileTypeIcons} from "@fluentui/react-file-type-icons";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "@/utils/CodeBlock.tsx";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import {editor, IScrollEvent} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
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
    clickFile(path?: string, filename?: string): void,
    showFile: boolean,
    showNow: {
        path: string,
        branch: string,
        data: Uint8Array
    } | null,
    FlushTree(branch:string, commit?:string):void,
    UpNextBlock():void,
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
    const [EditStatus,setEditStatus] = useState(false);
    const [CanEdit, setCanEdit] = useState(false);
    let editorRef = useRef<IStandaloneCodeEditor>(null);
    const handleScroll = async (e: IScrollEvent) => {
        const { scrollTop, scrollHeight } = e;
        if (scrollTop + window.innerHeight / 2 >= scrollHeight - 10) {
            console.log("Reached bottom, loading more data...");
            props.UpNextBlock();
        }
    };
    const handleEditorMount: OnMount = (editor) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        editorRef.current = editor;
        editor.onDidScrollChange((e) => handleScroll(e));
    };
    useEffect(()=>{
        const FIleType = (filename: string) => {
            setEditStatus(false);
            setCanEdit(false);
            const type = filename.split(".").pop()
            const uint8Array = new Uint8Array([...props.showNow!.data]);
            const decoder = new TextDecoder('utf-8');
            const str = decoder.decode(uint8Array);
            if (type === "md" || type === "markdown" || type === "mdx") {
                return <ReactMarkdown
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
                    rehypePlugins={[rehypeHighlight,rehypeRaw]}>{str}</ReactMarkdown>
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
                setCanEdit(true);
                return (
                    <>
                        <Editor onChange={() => {
                            return false;
                        }} height="50vh"
                                onMount={handleEditorMount}
                                defaultLanguage={type}
                                value={str}
                                options={{
                                    readOnly: !EditStatus,
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
                            }
                        }/>
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
    initializeFileTypeIcons();
    return (
        <div className="repo-file">
            <div className="repository-header">
                <FormControl className="branch-selector">
                    <SelectPanel
                       items={items}
                       onOpenChange={setOpen}
                       onSelectedChange={(x:ItemInput)=>{
                           props.FlushTree(x.text)
                           setSelected(x)
                       }}
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
                                <span onClick={()=>{
                                    props.clickFile(undefined, undefined);
                                }}>
                                    close
                                </span>
                                {
                                    CanEdit ? (
                                        <span onClick={() => {
                                            setEditStatus(!EditStatus)
                                        }}>
                                           Edit
                                        </span>
                                    ): null
                                }
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
            const ext = value.name.split(".").pop();
            return (
                <TreeView.Item onSelect={()=>{
                    click(value.path, value.name)
                }} key={index} id={value.path}>
                    <TreeView.LeadingVisual>
                        {
                            ext ? (
                                <Icon {...getFileTypeIconProps({ extension: ext, size: 16 })} />
                            ) : (
                                <FaFileAlt/>
                            )
                        }
                    </TreeView.LeadingVisual>
                    {value.name}
                </TreeView.Item>
            )
        }
    })
}

export default RepoFile