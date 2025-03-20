import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {MemberHeader} from "@/component/org/MemberHeader";
import {MemberItem} from "@/component/org/MemberItem";

interface MemberPageProps {
    org: string
}

export const MemberPage = ({org}: MemberPageProps) => {
    const [MemberList, setMemberList] = useState<{
        uid: number,
        username: string,
        email: string,
        avatar?: string,
        access: number,
        join_at: string,
    }[]>([]);
    useEffect(() => {
        fetch(`/api/v1/orgs/${org}/member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res=>{
                if (res.status === 200) {
                    const json = res.json();
                    json.then(data=>{
                        if (data.code === 0) {
                            setMemberList(data.data)
                        }else {
                            notifications.show({
                                title: 'Failed',
                                message: data.msg,
                                color: 'red',
                            });
                        }
                    })
                }else {
                    notifications.show({
                        title: 'Failed',
                        message: 'Failed to get member list',
                        color: 'red',
                    });
                }
            })
            .catch(e=>{
                notifications.show({
                    title: 'Failed',
                    message: e.message,
                    color: 'red',
                });
            })
    }, []);
    return (
        <div className="member">
            <h1>Member</h1>
            <MemberHeader/>
            <div className="member-list">
                {
                    MemberList.map((item, index) => {
                        return <MemberItem key={index} data={item}/>
                    })
                }
            </div>
        </div>
    )
}