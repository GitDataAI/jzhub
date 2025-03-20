import {ActionIcon, Button, Input} from "@mantine/core";
import {BiSearch} from "react-icons/bi";

export const MemberHeader = () => {
    return (
        <div className="member-header">
            <Input placeholder="Search" className="member-search" rightSection={
                <ActionIcon style={{
                    backgroundColor: "#f15108",
                }}>
                    <BiSearch/>
                </ActionIcon>
            }/>
            <Button className="member-new">Invite</Button>
        </div>
    );
};