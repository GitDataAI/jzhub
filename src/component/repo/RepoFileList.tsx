'use client'

import {RepoFileBranch, RepoFileProps} from "@/component/repo/RepoFile";
import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {Skeleton} from "@mantine/core";
import {GoFileDirectory} from "react-icons/go";
import {FaRegFile} from "react-icons/fa";

interface RepoFileListProps {
    props: RepoFileProps,
    current: RepoFileBranch,
    Root: string,
    setRoot: (value: (((prevState: string) => string) | string)) => void
}

export interface RepoFileTreeItem {
    name: string,
    path: string,
    root: string,
    type: string,
    oid: string,
    tree?: GitCommitTree,
}

export interface GitCommitTree {
    commit: string,
    author: string,
    email: string,
    date: number,
    msg: string,
    path: string,
    name: string,
    type: string
}


export const RepoFileList = ({props, current, Root, setRoot}: RepoFileListProps) => {
    const [Tree, setTree] = useState<RepoFileTreeItem[]>([]);
    let NA: RepoFileTreeItem[] = [];
    const FetchData = async () => {
        const response = await fetch(`/api/v1/repo/${props.owner_name}/${props.repo_name}/tree/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inner: {
                    path: Root,
                    branches: current.name,
                    sha: current.active?.id,
                },
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            })
        });
        const json = await response.json();
        if (json.code !== 500) {
            setTree(json);
            NA = json;
        } else {
            notifications.show({
                title: 'Failed',
                message: json.msg,
                color: 'red',
            });
        }
    }

    const FetchMsg = async () => {
        const response = await fetch(`/api/v1/repo/${props.owner_name}/${props.repo_name}/tree/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inner: {
                    path: Root,
                    branches: current.name,
                    sha: current.active?.id,
                },
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            })
        })
        setTimeout(() => {
            if (response.status === 200) {
                response.json().then(data => {
                    if (data.code !== 500) {
                        data.forEach((value: GitCommitTree) => {
                            const msg = document.getElementById("msg" + value.name + value.type);
                            const time = document.getElementById("time" + value.name + value.type);
                            if (msg && time) {
                                if (value.msg.length > 30) {
                                    msg.innerHTML = value.msg.substring(0, 30) + "...";
                                } else {
                                    msg.innerHTML = value.msg;
                                }
                                time.innerHTML = new Date(value.date * 1000).toLocaleString();
                            }
                            for (let i = 0; i < NA.length; i++) {
                                if (NA[i].name === value.name && NA[i].type === value.type) {
                                    NA.splice(i, 1);
                                    break;
                                }
                            }
                        })
                    } else {
                        notifications.show({
                            title: 'Failed',
                            message: data.msg,
                            color: 'red',
                        });
                    }
                })
            }
            setTimeout(() => {
                NA.forEach((value: RepoFileTreeItem) => {
                    const msg = document.getElementById("msg" + value.name + value.type);
                    const time = document.getElementById("time" + value.name + value.type);
                    if (msg && time) {
                        msg.innerHTML = "N/A";
                        time.innerHTML = "N/A";
                    }
                })
            })
        }, 1000)
    }

    useEffect(() => {
        FetchData().then().catch().finally(FetchMsg);
    }, [current, Root]);
    return (
        <div>
            <List props={Tree} setRoot={setRoot} root={Root}/>
        </div>
    )
}

const List = ({props, setRoot, root}: {
    props: RepoFileTreeItem[],
    setRoot: (value: (((prevState: string) => string) | string)) => void,
    root: string
}) => {
    props.sort((a, b) => {
        if (a.type === "tree" && b.type === "blob") {
            return -1;
        } else if (a.type === "blob" && b.type === "tree") {
            return 1;
        } else {
            return 0;
        }
    })
    return (
        <div className="repo-tree">
            <div className="repo-tree-head">
                <span>Name</span>
                <span>Last commit</span>
                <span>Last update</span>
            </div>
            {
                root !== "" && (
                    <div className="tree-item" onClick={() => {
                        console.log(root)
                        const split = root.split("/");
                        if (split.length > 1) {
                            setRoot(root.substring(0, root.lastIndexOf("/")));
                        } else {
                            setRoot("");
                        }
                    }}>
                        <span style={{
                            color: "#6c757d",
                            marginLeft: "1rem",
                        }}>
                            ...
                        </span>
                    </div>
                )
            }
            {
                props.map((value, index) => {
                    return (
                        <div className="tree-item" key={index}>
                            {value.type === "tree" ? <Tree setRoot={setRoot} props={value} root={root}/> :
                                <Blob props={value}/>}
                            <span className="msg" id={"msg" + value.name + value.type} style={{fontSize : "0.875rem" }}>
                                <Skeleton width={160} height={15}/>
                            </span>
                            <span id={"time" + value.name + value.type} style={{fontSize : "0.875rem" }}>
                                <Skeleton width={160} height={15}/>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Tree = ({props, setRoot, root}: {
    props: RepoFileTreeItem,
    setRoot: (value: (((prevState: string) => string) | string)) => void,
    root: string
}) => {
    return (
        <div className="title" onClick={() => {
            setRoot(root + "/" + props.name)
        }}>
            <GoFileDirectory/><span style={{fontSize : "0.875rem" }}>{props.name}</span>
        </div>
    )
}

const Blob = ({props}: { props: RepoFileTreeItem }) => {
    return (
        <div className="title">
            <FaRegFile/><span style={{fontSize : "0.875rem" }}>{props.name}</span>
        </div>
    )
}