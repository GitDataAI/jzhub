'use client'


import {ExploreHead} from "@/component/explore/explorehead";
import {ExploreBody} from "@/component/explore/explorebody";
import {useState} from "react";

export default function ExplorePage(){
    const [Tab, setTab] = useState<string>("Search");

    return (
        <div className="explore">
            <div className="explore-body">
                <ExploreHead Tab={Tab} setTab={setTab}/>
                <ExploreBody/>
            </div>
        </div>
    )
}