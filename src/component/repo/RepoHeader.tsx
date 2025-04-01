'use client'

import {Badge, Button, Indicator} from "@mantine/core"
import {useState} from "react";
import {notifications} from "@mantine/notifications";


export interface RepoHeaderProps {
    owner: string,
    repo: string,
    rtype: string,
    nums_star: number,
    nums_watch: number,
    nums_fork: number,
    nums_branch: number,
    is_private: boolean,
    star: boolean,
    watch: boolean,
}


export const RepoHeader = (props: RepoHeaderProps) => {
    const [Star, setStar] = useState(props.nums_star)
    const [Watch, setWatch] = useState(props.nums_watch);
    return(
        <div className="repo-header">
            <div className="header-left">
                <h1>
                    <a href={`/${props.owner}?tab=Repository`} className="floating-owner-name">
                        {props.owner}</a>/
                    <span>{props.repo}</span>
                </h1>
                <span className="rtype">
                    {props.rtype}
                </span>
                {
                    props.is_private ?
                        <Badge color="red" variant="filled">Private</Badge> :
                        <Badge color="green" variant="filled">Public</Badge>
                }
            </div>
            <div className="header-right">
                <Indicator color="red" label={Watch}>
                    <Button onClick={(e)=>{
                        e.stopPropagation();
                        fetch(`/api/v1/repo/${props.owner}/${props.repo}/watch`,{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                        })
                        .then(res=>res.json())
                        .then(data=>{
                            if (data.code === 0) {
                                if (props.watch){
                                    setWatch(Watch-1)
                                }else {
                                    setWatch(Watch+1)
                                }
                            }else {
                                notifications.show({
                                    title: 'Error',
                                    message: data.msg,
                                    color: 'red',
                                })
                            }
                        })
                    }}>
                        {
                            !props.watch ?"Watch":"unWatch"
                        }
                    </Button>
                </Indicator>
                <Indicator color="red" label={Star}>
                    <Button onClick={()=>{
                        fetch(`/api/v1/repo/${props.owner}/${props.repo}/star`,{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                        })
                        .then(res=>res.json())
                        .then(data=>{
                            if (data.code === 0) {
                                if (props.star){
                                    setStar(Star-1)
                                }else {
                                    setStar(Star+1)
                                }
                            }else {
                                notifications.show({
                                    title: 'Error',
                                    message: data.msg,
                                    color: 'red',
                                })
                            }
                        })
                    }}>
                        {
                            !props.star ?"Star":"unStar"
                        }
                    </Button>
                </Indicator>
                <Indicator color="red" label={props.nums_fork}>
                    <Button>Fork</Button>
                </Indicator>
            </div>
        </div>
    )
}