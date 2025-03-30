import {Button, Input, Tabs, TabsList, TabsTab} from "@mantine/core";
import {BsSearch} from "react-icons/bs";

export default function Page(){
    return(
        <div className="pr">
            <div className="pr-header">
                <div className="title">
                    <h1 >Pull Request</h1>
                    <Button>New PR</Button>
                </div>
                <Tabs defaultValue="open">
                    <TabsList>
                        <TabsTab value="open">Open</TabsTab>
                        <TabsTab value="close">Close</TabsTab>
                        <TabsTab value="all">ALL</TabsTab>
                    </TabsList>
                    <Input className="pr-header-search" rightSection={
                        <BsSearch style={{
                            color: "#f15108",
                        }}/>
                    }/>
                </Tabs>
            </div>
        </div>
    )
}