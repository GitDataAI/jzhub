'use client'

import {DateTime} from "luxon";
import React, {useEffect, useState} from "react";
import {RepoFileHeader} from "@/component/repo/RepoFileHeader";
import {RepoFileList} from "@/component/repo/RepoFileList";
import {RepoMarkDown} from "@/component/repo/RepoMarkDown";
import {RepoFileDescription} from "@/component/repo/RepoFileDescription";

export interface RepoFileProps {
    uid: string,
    owner_name: string,
    owner_uid: string,
    repo_name: string,
    repo_uid: string,
    description?: string,
    is_private: boolean,
    topic: string[],
    rtype: string,
    default_branch: string,
    created_at: DateTime,
    updated_at: DateTime,
    owner: {
        avatar?: string,
        username: string,
        uid: string,
    },
    branch: RepoFileBranch[],
    nums_star: number,
    nums_watch: number,
    nums_fork: number,
    nums_branch: number,
    website?: string
}

export interface RepoFileBranch {
    name: string,
    is_head: boolean,
    upstream: string,
    active?: {
        id: string,
        msg: string,
        author: string,
        email: string,
        date: number
    }
}


export const RepoFile = (props: RepoFileProps) => {
    const [CurrentBranch, setCurrentBranch] = React.useState<RepoFileBranch>(props.branch.find((value)=>value.is_head) || props.branch[0]);
    const [Root, setRoot] = useState('')
    useEffect(() => {
        const head = props.branch.find((branch) => {
            return branch.is_head;
        });
        if (head) {
            setCurrentBranch(head);
        }else {
            setCurrentBranch(props.branch[0]);
        }
    }, []);
    return(
        <div className="repo-file-body">
            <div className="repo-file-left">
                <RepoFileHeader branch={props.branch} current={CurrentBranch} repo_name={props.repo_name} repo_uid={props.uid} owner_name={props.owner_name} owner_uid={props.owner_uid} ExChange={function(branch: RepoFileBranch): void {
                    setCurrentBranch(branch);
                    setRoot("")
                }}/>
                <RepoFileList props={props} current={CurrentBranch} Root={Root} setRoot={setRoot}/>
                {
                    CurrentBranch.active && (
                        <RepoMarkDown repo={props.repo_name} owner={props.owner_name} path={Root === ""?"README.md":Root+"/README.md"} sha={CurrentBranch.active.id}/>
                    )
                }
            </div>
            <div className="repo-file-right">
                <RepoFileDescription props={props}/>
            </div>
        </div>
    )
}