'use client'

import { useEffect, useState } from "react";
import useUserContext from "@/store/useUserContext";
import { notifications } from "@mantine/notifications";
import {ExploreItem} from "@/component/explore/ExploreItem";
import { ExploreItemHeader } from "@/component/explore/ExploreItemHeader";

export interface ExplorePageProps {
    code: number,
    data: ExploreModel[],
    msg: string,
}

export interface ExploreModel {
    id: string,
    title: string,
    description: string,
    image: string,
    created_at: string,
}

export default function ExplorePage() {
    const user = useUserContext();
    const [Data, setData] = useState<ExploreModel[]>([]);

    const FetchData = async () => {
        if (!user.data) {
            notifications.show({
                title: 'Failed',
                message: 'Please login first',
                color: 'red',
            });
            return;
        }

        const response = await fetch("/api/v1/users/explore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            }),
        });

        if (response.status === 200) {
            response.json().then((result: ExplorePageProps) => {
                if (result.code === 0) {
                    setData(result.data);
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: result.msg,
                        color: 'red',
                    });
                }
            });
        } else {
            notifications.show({
                title: 'Failed',
                message: 'Unable to fetch explore data',
                color: 'red',
            });
        }
    };

    useEffect(() => {
        FetchData().then().catch().finally();
    }, []);

    return (
        <div className="explore">
            <ExploreItemHeader />
            <div className="explore-list">
                {Data.map((item, index) => (
                    <ExploreItem key={index} data={item} />
                ))}
            </div>
        </div>
    );
}
