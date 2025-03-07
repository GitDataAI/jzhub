'use client'

import {MarketTitle} from "@/component/market/marketTitle";
import {useEffect, useState} from "react";
import {marketplace_data, MarketplaceData} from "@/app/(default)/marketplace/data";
import {MarketItem} from "@/component/market/marketItem";

export default function MarketPlacePage(){
    const [ItemData,setItemData] = useState<MarketplaceData[]>([])
    useEffect(() => {
        setItemData(marketplace_data)
    }, []);
    return (
        <div className="market">
            <MarketTitle/>
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