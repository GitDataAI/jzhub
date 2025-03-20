import {RepoListOwner} from "@/component/project/RepoListOwner";
import {ActionIcon, Input} from "@mantine/core";
import {BiSearch} from "react-icons/bi";
import {useParams} from "next/navigation";
import {useEffect} from "react";

export const Repository = () => {
    const parma: { user: string } = useParams();
    useEffect(() => {
        console.log(parma);
    }, []);
    return (
        <div className="owner-repo">
            <div className="repo-filter">
                <Input placeholder="Search or filter results..." rightSection={
                    <ActionIcon style={{
                        backgroundColor: "#f15108",
                    }}>
                        <BiSearch/>
                    </ActionIcon>
                }/>
            </div>
            <RepoListOwner username={parma.user}/>
        </div>
    )
}