'use client'

import {MarketTitle} from "@/component/market/marketTitle";
import {useEffect, useState} from "react";
import {MarketItem} from "@/component/market/marketItem";
import {ProductList, ProductListParam} from "@/server/types";
import {ProductApi} from "@/server/ProductApi";
import {AppWrite} from "@/server/Client";

export default function MarketPlacePage(){
    const [ItemData,setItemData] = useState<ProductList[]>([])
    const [Query,setQuery] = useState<ProductListParam>({
        limit: 50,
        page: 1,
        order: "created_at",
        search: ""
        } as ProductListParam
    )
    const [Tags, setTags] = useState<string[]>([]);
    const api = new ProductApi();
    useEffect(() => {
        api
            .List(
                Query.limit,
                Query.page,
                Query.order,
                Query.search
            )
            .then((data) => {
                if (data.status === 200 && data.data) {
                    const json: AppWrite<ProductList[]> = JSON.parse(data.data);
                    if (json.code === 200 && json.data) {
                        setItemData(json.data)
                        setTags(json.data.map((item) => {
                            return item.data.type.split(",").map((tag) => {
                                return tag
                            })
                        }).flat())
                    }
                }
            })
    }, [Query]);
    return (
        <div className="market">
            <MarketTitle tags={Tags} query={setQuery}/>
            <div className="market-display">
                {
                    ItemData.map((item,index) => {
                        return (
                            <MarketItem key={index} data={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}