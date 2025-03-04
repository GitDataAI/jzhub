import {Commits, Tree} from "@/server/types";
import {useState} from "react";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {IconFolder, IconFolderOpen} from "@tabler/icons-react";
import {Fileicon} from "@/component/repo/fileicon";


interface FileTreeProps {
    tree: Tree[]
}

export const FileTree = ({tree}: FileTreeProps) => {
    tree.sort((a, b) => {
        if (a.is_dir && !b.is_dir) {
            return -1;
        } else if (!a.is_dir && b.is_dir) {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    })
    return (
        <div className="file-tree">
            {tree.map((item, index) => (
                <div key={item.id + index + item.dir}>
                    {item.is_dir ? (
                        <Folder tree={item}/>
                    ) : (
                        <FileItem tree={item}/>
                    )}
                </div>
            ))}
        </div>
    )
}


dayjs.extend(relativeTime);

function FileItem({tree}: { tree: Tree }) {
    const commit: Commits | undefined = tree.commit.sort((a, b) => {
        if (a.time > b.time) {
            return -1;
        } else if (a.time < b.time) {
            return 1;
        } else {
            return 0;
        }
    })[0];
    if (commit) {
        const max = commit.msg.length > 50;
        commit.msg = commit.msg.substring(0, 50)
        if (max) {
            commit.msg = commit.msg + "..."
        }
    }
    const relative_time = () => {
        if (commit) {
            const date = new Date(Number(commit.time) * 1000);
            const to_now = dayjs().to(dayjs(date));
            return <>{to_now}</>
        } else {
            return <>N/A</>
        }
    }

    return (
        <div className="file-item">
            <div>
                <span>
                    <Fileicon name={tree.name}/>
                </span>
                <a>{tree.name}</a>
            </div>
            {
                commit && (
                    <div className={"file-item-commit"}>
                        <div>{commit.msg}</div>
                        <div>
                            {relative_time()}
                        </div>
                    </div>
                )
            }
        </div>
    );
}


const Cmt = (tree: Tree) => {
    let result:Commits[] = [];
    for(const idx of tree.commit){
        result.push(idx);
    }
    for (const idx of tree.child) {
        result.push(...Cmt(idx));
    }
    return result;
}

function Folder({tree}: { tree: Tree }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleFolder = () => {
        setIsExpanded(!isExpanded);
    };
    tree.child.sort((a, b) => {
        if (a.is_dir && !b.is_dir) {
            return -1;
        } else if (!a.is_dir && b.is_dir) {
            return 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    })


    const commit = Cmt(tree);
    commit.sort((a, b) => {
        if (a.time > b.time) {
            return -1;
        } else if (a.time < b.time) {
            return 1;
        } else {
            return 0;
        }
    })
    if (commit.length >= 1) {
        const max = commit[0].msg.length > 50;
        commit[0].msg = commit[0].msg.substring(0, 50)
        if (max) {
            commit[0].msg = commit[0].msg + "..."
        }
    }
    const relative_time = () => {
        if (commit[0]) {
            const date = new Date(Number(commit[0].time) * 1000);
            const to_now = dayjs().to(dayjs(date));
            return <>{to_now}</>
        } else {
            return <>N/A</>
        }
    }

    return (
        <div className="folder-container">
            <div
                className="folder-header"
                onClick={toggleFolder}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
            >


                <div className="folder-info">
                    <span className="folder-name">
                        <span className="folder-icon">
                              {isExpanded ? <IconFolderOpen size={18}/> : <IconFolder  size={18}/>}
                        </span>
                        <span>
                            {tree.name}
                        </span>
                    </span>
                    {
                        commit.length >= 1 && (
                            <div className={"file-item-commit"}>
                                <div>{commit[0].msg}</div>
                                <div>
                                    {relative_time()}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {isExpanded && tree.child && (
                <div className="folder-children" style={{marginLeft: '20px'}}>
                    {tree.child.map((item, index) => (
                        <div key={item.id + index + tree.dir}>
                            {item.is_dir ? (
                                <Folder tree={item}/>
                            ) : (
                                <FileItem tree={item}/>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}