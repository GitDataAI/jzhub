'use client'

import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import {
    ExploreItemOrganization,
    ExploreItemProduct,
    ExploreItemUser
} from "@/component/explore/ExploreItem";
import { ExploreItemHeader } from "@/component/explore/ExploreItemHeader";
import {Pagination} from "@mantine/core";

export type ExplorePageProps =
    undefined
    | ExploreProduct
    | ExploreUser
    | ExploreOrganization;

export interface ExploreProduct {
    total: number,
    type: string,
    data: {
        created_at: string,
        default_branch: string,
        description?: string,
        fork: number,
        star: number,
        watch: number,
        name: string,
        rtype: string,
        topic: string[],
        uid: string,
        updated_at: string,
        owner: {
            avatar: string,
            description?: string,
            uid: string,
            name: string,
        }
    }[]
}

export interface ExploreUser {
    total: number,
    type: string,
    data: {
        created_at: string,
        description?: string,
        name: string,
        uid: string,
        repo: number,
        following: number,
        followed: number,
        avatar?: string,
        updated_at: string,
    }[]
}

export interface ExploreOrganization {
    total: number,
    type: string,
    data: {
        created_at: string,
        description?: string,
        name: string,
        avatar?: string,
        uid: string,
        updated_at: string,
        repo: number,
        member: number,
    }[]
}

export default function ExplorePage() {
    const [Data, setData] = useState<ExplorePageProps>();
    const [Rtype,setRtype] = useState<undefined | "product" | "user" | "organization">();
    const [Filter, setFilter] = useState<undefined | 'public' | 'private'>();
    const [Search, setSearch] = useState<string>("");
    const [Page, setPage] = useState<{
        page: number,
        size: number,
    }>({
        page: 1,
        size: 10,
    })

    const FetchData = async () => {
        const payload = {
            type: Rtype,
            filter: Filter,
            search: Search,
        }
        const parma = new URLSearchParams();
        parma.append("rtype", payload.type ? payload.type : "product");
        parma.append("filter", payload.filter ? payload.filter : "all");
        parma.append("search", payload.search);
        parma.append("page", Page.page.toString())
        parma.append("size", Page.size.toString())
        const response = await fetch(`/api/v1/explore?${parma}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            response.json().then((result: ExplorePageProps) => {
                if(result) {
                    result.data.sort((a, b) => {
                        if (a.updated_at > b.updated_at) {
                            return -1;
                        } else if (a.updated_at < b.updated_at) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    setData(result);
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
    },
        // !!!forbid insert FetchData in useEffect deps
        [Rtype, Filter, Search,Page.page, Page.size]);
    useEffect(() => {
        setPage({
            page: 1,
            size: 10,
        })
    }, [Rtype,Filter,Search]);
    return (
        <div className="explore">
            <ExploreItemHeader setRtype={(x)=>{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setRtype(x)
            }} rtype={Rtype} Filter={Filter} setFilter={(x)=>{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setFilter(x)
            }} search={Search} setSearch={(x)=>{
                setSearch(x)
            }}
            />
            <div className="explore-list">
                {
                    Data?.type === "product" &&
                    Data?.data?.map((item, index) => (
                        <ExploreItemProduct props={item as {
                            created_at: string,
                            default_branch: string,
                            description?: string,
                            fork: number,
                            star: number,
                            watch: number,
                            name: string,
                            rtype: string,
                            topic: string[],
                            uid: string,
                            updated_at: string,
                            owner: {
                                avatar: string,
                                description?: string,
                                uid: string,
                                name: string,
                            }
                        }} key={index}/>
                    ))
                }
                {
                    Data?.type === "user" &&
                    Data?.data?.map((item, index) => (
                        <ExploreItemUser props={item as {
                            created_at: string,
                            description?: string,
                            name: string,
                            uid: string,
                            avatar?: string,
                            repo: number,
                            followed: number,
                            following: number,
                            updated_at: string,
                        }} key={index}/>
                    ))
                }
                {
                    Data?.type === "organization" &&
                    Data?.data?.map((item, index) => (
                        <ExploreItemOrganization props={item as {
                            created_at: string,
                            description?: string,
                            name: string,
                            avatar?: string,
                            uid: string,
                            updated_at: string,
                            repo: number,
                            member: number,
                        }} key={index}/>
                    ))
                }
            </div>
            <Pagination className="explore-pagin" total={Data?.total ? Math.ceil(Data?.total / Page.size) : 1} color={"gray"} onChange={(x)=>{
                setPage({
                    page: x,
                    size: Page.size,
                })
            }}/>
        </div>
    );
}
