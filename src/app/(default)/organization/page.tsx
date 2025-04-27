'use client'



import {useEffect, useState} from "react";
import useUserContext from "@/store/useUserContext";
import {notifications} from "@mantine/notifications";
import {OrgItem} from "@/component/org/OrgItem";
import {OrgItemHeader} from "@/component/org/OrgItemHeader";


export interface GroupPageProps {
    code: number,
    data: {
        org: GroupModel,
        member: GroupMemberModel,
        nums_member: number,
        nums_repo: number,
        access: number,
    }[],
    msg: string,
}


export interface GroupModel {
    active: boolean,
    avatar?: string,
    created_at: string,
    created_by: string,
    description: string,
    email: string,
    language?: string,
    location?: string,
    name: string,
    owner_org?: string,
    theme?: string,
    timezone?: string,
    uid: string,
    updated_at: string,
    website?: string,
}

export interface GroupMemberModel {
    access: number,
    group_uid: string,
    uid: string,
    users_uid: string,
    join_at: string,
}

export default function GroupPage() {
    const user = useUserContext();
    const [Data,setData] = useState<{
        org: GroupModel,
        member: GroupMemberModel,
        nums_member: number,
        nums_repo: number,
        access: number,
    }[]>([]);
    const FetchData = async () => {
        if (!user.data) {
            notifications.show({
                title: 'Failed',
                message: 'Please login first',
                color: 'red',
            });
            return
        }
        const response = await fetch(`/api/v1/users/orgs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            })
        });
        if (response.status === 200) {
            response.json().then(data => {
                if (data.code === 0) {
                    setData(data.data);
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: data.message,
                        color: 'red',
                    });
                }
            });
        }else {}
    }
    useEffect(() => {
        FetchData().then().catch().finally();
    }, []);
    return (
        <div className="project">
          <OrgItemHeader/>
            <div className="org-list">
                {Data.map((item, index) => {
                    return <OrgItem key={index} data={item}/>
                })}
            </div>
        </div>
    )
}