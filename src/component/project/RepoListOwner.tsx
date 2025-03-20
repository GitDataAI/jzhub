import {useEffect, useState} from "react";
import {DateTime} from "luxon";
import {notifications} from "@mantine/notifications";
import {RepoListOwnerItem} from "@/component/project/RepoListOwnerItem";

export const RepoListOwner = (props: { username: string }) => {
    const [RepoList, setRepoList] = useState<{
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
        owner: boolean,
        nums_star: number,
        nums_fork: number,
        nums_watch: number,
        nums_branch: number,
    }[]>();
    useEffect(() => {
        fetch(`/api/v1/users/${props.username}/repo`, {
            method: 'POST',
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        if (data.code === 0) {
                            setRepoList(data.data);
                        } else {
                            notifications
                                .show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                        }
                    })
                } else {
                    notifications
                        .show({
                            title: 'Failed',
                            message: '获取仓库列表失败',
                            color: 'red',
                        });
                }
            })
    }, []);
    return (
        <div className="repo-list">
            {
                RepoList && RepoList.map((repo, index) => (
                    <div key={index}>
                        <RepoListOwnerItem data={repo}/>
                    </div>
                ))
            }
        </div>
    );
};