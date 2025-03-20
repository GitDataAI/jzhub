import {ActionIcon, Button, Input} from "@mantine/core";
import {BiSearch} from "react-icons/bi";
import {useRouter} from "next/navigation";

export const OrgItemHeader = () => {
    const nav = useRouter().replace;
    return(
        <>
            <div className="project-nav">
                <div className="nav-header">
                    <h1 className="title">Group</h1>
                    <div className="exnew">
                        <Button onClick={() => {
                            nav("/group/new");
                        }}>New</Button>
                    </div>
                </div>
                <div className="nav-filter">
                    <Input placeholder="Search or filter results..." rightSection={
                        <ActionIcon style={{
                            backgroundColor: "#f15108",
                        }}>
                            <BiSearch/>
                        </ActionIcon>
                    }/>
                </div>
            </div>

        </>
    )
}