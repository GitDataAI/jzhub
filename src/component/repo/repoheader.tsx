import {Repository} from "@/server/types";
import {Avatar, Button, FloatingIndicator, Indicator, Tabs, TabsList, TabsTab} from "@mantine/core";
import {useState} from "react";
import {useRouter} from "next/navigation";
import usePageContext from "@/store/usePageContext";
import {RepoApi} from "@/server/RepoApi";
import useUserContext from "@/store/useUserContext";

interface RepoheaderProps {
    repo: Repository,
    owner: string,
}

export const Repoheader = ({repo, owner}: RepoheaderProps) => {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('file');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const Route = useRouter();
    const nav = useRouter().replace;
    const context = usePageContext();
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };
    const api = new RepoApi();
    const user = useUserContext();

    const [Star,setStar] = useState(repo.nums_star);
    const [Watch, setWatch] = useState(repo.nums_watch);

    return (
        <div className="repo-header">
            <div className="repo-header-info">
                <div className="repo-header-info-title">
                    <Avatar src={repo.avatar || ""} radius="xl"/>
                    <h1>{repo.name}</h1>
                    <b>{repo.visibility ? "Public" : "Private"}</b>
                </div>
                    {
                        user.dash !== undefined ? (
                            <div className="repo-header-info-action" >
                                <Indicator inline label={Watch} className="ml-2">
                                    <Button
                                        onClick={()=>{
                                            api.Watch(owner,repo.name, 1)
                                                .then(()=>{
                                                    if (user.dash!.watch.find((value)=>value.repository_id === repo.uid)) {
                                                        setWatch((pre)=>pre - 1)
                                                    }else {
                                                        setWatch((pre)=>pre + 1)
                                                    }
                                                    user.syncData();
                                                })
                                        }}
                                    >{
                                        user.dash.watch.find((value)=>value.repository_id === repo.uid) ? "unWatch" : "Watch"
                                    }</Button>
                                </Indicator>
                                <Indicator inline label={Star}>
                                    <Button onClick={()=>{
                                        api.Star(owner,repo.name).then(()=>{
                                            if (user.dash!.stars.find((value)=>value.repository_id === repo.uid)) {
                                                setStar((pre)=>pre - 1)
                                            }else {
                                                setStar((pre)=>pre + 1)
                                            }
                                            user.syncData();
                                        })
                                    }}>
                                        {
                                            user.dash.stars.find((value)=>value.repository_id === repo.uid) ? "unStar" : "Star"
                                        }
                                    </Button>
                                </Indicator>
                                <Indicator inline label={repo.nums_fork}>
                                    <Button>Fork</Button>
                                </Indicator>
                            </div>
                        ):(
                            <div className="repo-header-info-action" >
                                <Indicator inline label={repo.nums_watch} className="ml-2">
                                    <Button>Watch</Button>
                                </Indicator>
                                <Indicator inline label={repo.nums_star}>
                                    <Button>Star</Button>
                                </Indicator>
                                <Indicator inline label={repo.nums_fork}>
                                    <Button
                                        onClick={()=>{
                                            console.log("fork")
                                            nav(`/r/${owner}/${repo.name}/fork`)
                                        }}
                                    >Fork</Button>
                                </Indicator>
                            </div>
                        )
                    }
            </div>
            <Tabs className="repo-header-menu" value={value} onChange={(val)=>{
                setValue(val);
                if (val) {
                    Route.push(`/r/${owner}/${repo.name}?tab=${val}`);
                    context.setUrlAndTab(`/r/${owner}/${repo.name}`, val);
                }
            }} variant="outline">
                <TabsList ref={setRootRef} className="list">
                    <TabsTab value="file" ref={setControlRef('file')}>File</TabsTab>
                    <TabsTab value="wiki" ref={setControlRef('wiki')}>Wiki</TabsTab>
                    <TabsTab value="issues" ref={setControlRef('issues')}>Issues</TabsTab>
                    <TabsTab value="pulls" ref={setControlRef('pulls')}>Pulls</TabsTab>
                    <TabsTab value="discussion" ref={setControlRef('discussion')}>Discussion</TabsTab>
                    <TabsTab value="actions" ref={setControlRef('actions')}>Actions</TabsTab>
                    <TabsTab value="settings" ref={setControlRef('settings')}>Settings</TabsTab>
                    <FloatingIndicator
                        target={value ? controlsRefs[value] : null}
                        parent={rootRef}
                        className="indicator"
                    />
                </TabsList>
            </Tabs>
        </div>
    )
}