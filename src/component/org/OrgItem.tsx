import {GroupMemberModel, GroupModel} from "@/app/(default)/group/page";
import {RiGitRepositoryLine} from "react-icons/ri";
import {FaUsers} from "react-icons/fa";
import {useRouter} from "next/navigation";

interface OrgItemProps {
    data: {
        org: GroupModel;
        member: GroupMemberModel;
        nums_member: number;
        nums_repo: number;
        access: number;
    }
}

export const OrgItem = ({data}: OrgItemProps) => {
    const nav = useRouter().replace;
    return (
        <>
            <div className="org-item" onClick={() => nav(`/${data.org.name}`)}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <h1>
                        {data.org.name}
                    </h1>

                    {
                        data.access === 99 && (
                            <span>
                                Root
                            </span>
                        )
                    }
                    {data.org.active ? <a style={{color: "green"}}>Active</a> : <a style={{color: "red"}}>Inactive</a>}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}>
                    <p style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}>
                        <RiGitRepositoryLine/>
                        {data.nums_repo}
                    </p>
                    <p style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}>
                        <FaUsers />
                        {data.nums_member}
                    </p>
                </div>
            </div>
            <hr/>
        </>
    )
}