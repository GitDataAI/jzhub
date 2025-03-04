import {ExploreBodyHeader} from "@/component/explore/explorebodyheader";
import React, {useEffect, useState} from "react";
import {HotRepo, HotTimeParma} from "@/server/types";
import {ExploreApi} from "@/server/ExploreApi";
import {AppWrite} from "@/server/Client";
import { MdStar } from "react-icons/md";
import {CgGitFork} from "react-icons/cg";
import {useRouter} from "next/navigation";

export const ExploreBody = () => {
    const [BodyTab, setBodyTab] = useState('hot');
    const api = new ExploreApi();
    const [Hot,setHot] = useState<HotRepo[]>([]);
    const date = new Date();


    const [HotParma] = useState<HotTimeParma>({
        start: {
            years: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate() - 1
        },
        end: {
            years: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate()
        },
        limit: 50
    })
    const FethaHot = () => {
        api.HotRepo(HotParma).then((res) => {
            if (res.status === 200 && res.data) {
                const json:AppWrite<HotRepo[]> = JSON.parse(res.data);
                if (json.code !== 200 || !json.data) {
                    return;
                }
                json.data.sort((a, b) => {
                    return b.complex - a.complex;
                })
                setHot(json.data);
            }
        });
    }
    useEffect(() => {
        FethaHot();
    }, []);
    return(
        <div className="explore-intro">
            <ExploreBodyHeader tab={BodyTab} setTab={setBodyTab}/>
            <div className="explore-intro-body">
                {
                    BodyTab === 'hot' && Hot.map((repo) => {
                        return (
                            <RepoExploreItem repo={repo} key={repo.model.uid + repo.owner}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const RepoExploreItem = ({repo}: { repo: HotRepo }) => {
    const nav = useRouter().replace;
    return (
        <div className="explore-intro-item" onClick={() => {
            nav(`/r/${repo.owner}/${repo.model.name}?tab=file`)
        }}>
            <div className="explore-intro-item-header">
                <img src={repo.model.avatar || '/gitdata.ai.png'}/>
                <span>
                    <a
                        style={{
                            position: "relative"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            nav(`/u/${repo.owner}`)
                    }}>{repo.owner}</a> / <a onClick={() => {
                        nav(`/r/${repo.owner}/${repo.model.name}?tab=file`)
                }}>{repo.model.name}</a>
                </span>
            </div>
            <div className="explore-intro-item-body">
                {repo.model.description?.substring(0, 50) || 'No description'}
            </div>
            <div className="explore-intro-item-footer">
                <div>
                    <a><MdStar/> {repo.model.nums_star}</a>
                    <a><CgGitFork/> {repo.model.nums_fork}</a>
                </div>
            </div>
        </div>
    )
}