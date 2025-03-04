import {Repository, UserDashBored} from "@/server/types";
import {Anchor, List} from "@mantine/core";
import {MdStar} from "react-icons/md";
import {CgGitFork} from "react-icons/cg";
import {IoWatch} from "react-icons/io5";
import {VscIssues} from "react-icons/vsc";
import {GoCommit, GoGitBranch, GoGitPullRequest} from "react-icons/go";
import {AiFillProduct, AiFillTag} from "react-icons/ai";

interface UserRepoListProps {
    userDash: UserDashBored
}

export const UserRepoList = ({userDash}: UserRepoListProps) => {
    const repo_list = userDash.repos;
    return (
        <div className="user-repo-list">
            <List style={{
                listStyle: "none"
            }}>
                {repo_list.map((repo) => {
                    return <UserRepoItem repo={repo} key={repo.uid} owner={userDash.user.username}/>
                })}
            </List>
        </div>
    )
}


const UserRepoItem = (props: { repo: Repository, owner: string }) => {
    const repo = props.repo;
    return (
        <li className="user-repo-item">
            <div className="title">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <div>
                        <Anchor href={`/u/${props.owner}`}>
                            <b>{props.owner} / </b>
                        </Anchor>
                        <Anchor href={`/r/${props.owner}/${repo.name}`}>
                            <b>{repo.name}</b>
                        </Anchor>
                    </div>
                    <span>
                    {
                        !repo.visibility ? "Public" : "Private"
                    }
                </span>
                </div>
                {
                    repo.description && (
                        <div className="desc">
                            {repo.description}
                        </div>
                    )
                }
                {
                    repo.updated_at && (
                        <div className="time">
                            最近更新： {repo.updated_at.toString()}
                        </div>
                    )
                }
            </div>
            <div className="action">
                <span><MdStar/> {repo.nums_star}</span>
                <span><GoGitBranch/> {repo.nums_branch}</span>
                <span><CgGitFork/>{repo.nums_fork}</span>
                <span><IoWatch/>{repo.nums_watch}</span>
                <span><VscIssues/>{repo.nums_issue}</span>
                <span><GoGitPullRequest/>{repo.nums_pullrequest}</span>
                <span><GoCommit/> {repo.nums_commit}</span>
                <span><AiFillProduct/> {repo.nums_release}</span>
                <span><AiFillTag/> {repo.nums_tag}</span>
            </div>
        </li>
    )
}