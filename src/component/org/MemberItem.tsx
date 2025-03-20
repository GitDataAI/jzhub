import {Button} from "@mantine/core";

interface MemberItemProps {
    data: { uid: number; username: string; email: string; avatar?: string; access: number; join_at: string }
}

export const MemberItem = ({data}: MemberItemProps) => {
    return (
        <div className="member-item">
            <div className="flex items-center">
                <h2>
                    {data.username}
                </h2>
                <span className="access">
                    {data.access === 99 ? "Owner" : "Member"}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-gray-400">
                    Join At:{data.join_at.split(".")[0]}
                </span>
                <Button style={{
                    backgroundColor: "transparent",
                    color: "black"
                }}>
                    Edit
                </Button>
            </div>
        </div>
    );
};