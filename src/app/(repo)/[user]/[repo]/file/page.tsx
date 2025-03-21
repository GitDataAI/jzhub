'use client'

import {useEffect, useState} from "react";
import {DateTime} from "luxon";
import {RepoHeader} from "@/component/repo/RepoHeader";
import {RepoFile, RepoFileProps} from "@/component/repo/RepoFile";
import {useParams} from "next/navigation";


export interface PageData{
    code: number,
    msg?: string,
    data?: {
        uid: string,
        owner_name: string,
        owner_uid: string,
        repo_name: string,
        repo_uid: string,
        description: string,
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
        branch: {
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
        }[],
        nums_star: number,
        nums_watch: number,
        nums_fork: number,
        nums_branch: number,
        star: boolean,
        watch: boolean,
        setting: boolean,
    }
}


export default function FilePage(){
    const {user, repo} = useParams();


    const [HandleData,setHandleData] = useState<{
        owner: string,
        repo: string,
        rtype: string,
        nums_star: number,
        nums_watch: number,
        nums_fork: number,
        nums_branch: number,
        is_private: boolean,
        star: boolean,
        watch: boolean
    } | undefined>(undefined);
    const [JsonData,setJsonData] = useState<RepoFileProps | undefined>(undefined);
    useEffect(() => {
        const Init = async () => {
            const data = await fetch(`/api/v1/repo/${user}/${repo}`, {
                method: 'POST',
            })
            const json:PageData = await data.json()
            const model = json.data;
            if (json.code !== 0 || !model) { // 404
                return (
                    <div>
                        {json.msg}
                    </div>
                )
            }
            setJsonData(model);
            const headerData = {
                owner: model.owner_name,
                repo: model.repo_name,
                rtype: model.rtype,
                nums_star: model.nums_star,
                nums_watch: model.nums_watch,
                nums_fork: model.nums_fork,
                nums_branch: model.nums_branch,
                is_private: model.is_private,
                star: model.star,
                watch: model.watch
            }
            setHandleData(headerData);
        }
        Init();
    }, []);
    return(
        <div className="repo-file">
            {
                HandleData && (
                    <RepoHeader {...HandleData} />
                )
            }
            {
                JsonData && (
                    <RepoFile {...JsonData}/>
                )
            }
        </div>
    )
}
