'use client'

import {Button, Input, Tabs, TabsList, TabsTab} from "@mantine/core";
import {BsSearch} from "react-icons/bs";
import {useRouter} from "next/navigation";

export default function Page(){
    const rt = useRouter();
    return(
        <div className="issues">
            <div className="issues-header">
                <div className="title">
                    <h1 >Issues</h1>
                    <Button onClick={()=>{
                        rt.replace(window.location.href + "/new")
                    }}>New Issues</Button>
                </div>
                <Tabs defaultValue="open">
                    <TabsList>
                        <TabsTab value="open">Open</TabsTab>
                        <TabsTab value="close">Close</TabsTab>
                        <TabsTab value="all">ALL</TabsTab>
                    </TabsList>
                    <Input className="issues-header-search" rightSection={
                        <BsSearch style={{
                            color: "#f15108",
                        }}/>
                    }/>
                </Tabs>
            </div>
        </div>
    )
}