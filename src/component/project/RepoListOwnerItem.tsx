import {DateTime} from "luxon";
import {FiLock, FiUnlock} from "react-icons/fi";
import {Badge} from "@mantine/core";
import {MdStar} from "react-icons/md";
import {CgGitBranch, CgGitFork} from "react-icons/cg";

export interface RepoListOwnerItemProps {
    data: {
        uid: string,
        owner_name: string,
        owner_uid: string,
        repo_name: string,
        repo_uid: string,
        description: string,
        is_private: boolean,
        topic: string[],
        rtype: string,
        default_branch: string,
        created_at: DateTime,
        updated_at: DateTime,
        owner: boolean,
        nums_star: number,
        nums_fork: number,
        nums_watch: number,
        nums_branch: number,
    }
}


export const RepoListOwnerItem = (props: RepoListOwnerItemProps) => {
    const data = props.data;
    return (
        <div className="repo-list-item" onClick={()=>{
            window.location.href = `/${data.owner_name}/${data.repo_name}`
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <a className="repo-list-title">
                    {data.owner_name}/{data.repo_name}
                </a>
                {
                    data.is_private ? (
                        <FiLock/>
                    ) : (
                        <FiUnlock/>
                    )
                }
                {
                    data.owner && (
                        <Badge style={{
                            marginLeft: 4,
                            fontSize: 10,
                            backgroundColor: '#ececef',
                            color: '#636269',
                        }}>Owner</Badge>
                    )
                }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                color: '#414141',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}>
                    <span style={{
                        display: "flex",
                        alignItems: 'center',
                    }}>
                        <MdStar/>
                        {data.nums_star}
                    </span>
                    <span style={{
                        display: "flex",
                        alignItems: 'center',
                    }}>
                        <CgGitFork/>
                        {data.nums_fork}
                    </span>
                    <span style={{
                        display: "flex",
                        alignItems: 'center',
                    }}>
                        <CgGitBranch/>
                        {data.nums_branch}
                    </span>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}>
                    <span>created: {data.created_at.toLocaleString().split(".")[0].replace("T", " ")}</span>
                </div>
            </div>
        </div>
    );
};