'use client'

import React, {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {ProductList} from "@/server/types";
import usePageContext from "@/store/usePageContext";
import {ProductApi} from "@/server/ProductApi";


export default function RepoLayout(props: { children: React.ReactNode, params: Promise<{ uid: string }> }) {
    const api = new ProductApi();
    const [Loading, setLoading] = useState(false);
    const [NotFound, setNotFound] = useState(false);
    const [Product,setProduct] = useState<ProductList | undefined>();
    const [Parma,setParma] = useState<{ uid: string } | undefined>();
    const context = usePageContext();

    const Init = async () => {
        const {uid} = await props.params;
        setParma({uid});
        const basic = await api.Info(uid);
        if (basic.status !== 200){
            notifications
                .show({
                    title: '数据请求失败',
                    message: 'Repo Not Found',
                    color: 'red',
                });
        }
        const json: AppWrite<ProductList> = JSON.parse(basic.data);
        if (json.code !== 200 || !json.data) {
            setNotFound(true);
            return;
        }
        setProduct(json.data);
        context.setProduct(json.data);
        setLoading(true);
    }
    useEffect(() => {
        Init().then().catch();
    }, []);

    return (
        <div className="market">
            {
                NotFound && (
                    <div className="not-found">
                        <h1>404</h1>
                        <span>Repo Not Found</span>
                    </div>
                )
            }
            {
                (Product && Loading && Parma) && (
                    <>
                        {props.children}
                    </>
                )
            }
        </div>
    );
}