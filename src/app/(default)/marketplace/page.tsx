'use client'

import {MarketTitle} from "@/component/market/marketTitle";
import {useState} from "react";
import {MarketItem} from "@/component/market/marketItem";
import {ProductList, ProductListParam} from "@/server/types";
import {ProductApi} from "@/server/ProductApi";
import {AppWrite} from "@/server/Client";

export default function MarketPlacePage() {
    const [ItemData, setItemData] = useState<ProductList[]>([]);
    const [Query, setQuery] = useState<ProductListParam>({
        limit: 50,
        page: 1,
        order: "created_at",
        search: ""
    });
    const [Tags, setTags] = useState<string[]>([]);
    const api = new ProductApi();



    const InitData = async (query: ProductListParam) => {
        try {
            const response = await api.List(query.limit, query.page, query.order, query.search);
            if (response.status === 200 && response.data) {
                const json: AppWrite<ProductList[]> = JSON.parse(response.data);
                if (json.code === 200 && json.data) {
                    setItemData(json.data);
                    setTags(json.data.flatMap(item => item.data.type.split(",")));
                }
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const setQuerys = (newQuery: ProductListParam) => {
        setQuery(newQuery);
        InitData(newQuery);
    };
    InitData(Query);

    return (
        <div className="market">
            <MarketTitle tags={Tags} query={setQuerys} value={Query} />
            <div className="market-display">
                {ItemData.map((item, index) => (
                    <MarketItem key={index + item.data.uid} data={item} />
                ))}
            </div>
        </div>
    );
}