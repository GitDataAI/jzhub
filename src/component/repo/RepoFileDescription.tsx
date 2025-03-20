import {RepoFileProps} from "@/component/repo/RepoFile";
import {BiGitBranch} from "react-icons/bi";
import {AiOutlineNotification, AiOutlineStar} from "react-icons/ai";
import {CgGitFork} from "react-icons/cg";

interface RepoFileDescriptionProps {
    props: RepoFileProps
}

export const RepoFileDescription = ({props}: RepoFileDescriptionProps) => {
    return (
        <div className="repo-description">
            <h1>{props.repo_name}</h1>
            {
                props.description &&
                <span>
                    {props.description}
                </span>
            }
            {
                props.website &&
                <span>
                    <a href={props.website}>{props.website}</a>
                </span>
            }
            <hr/>
            <ul>
                <li>
                   <BiGitBranch/> {props.nums_branch} Branch
                </li>
                <li>
                   <AiOutlineStar/> {props.nums_star} Star
                </li>
                <li>
                   <AiOutlineNotification/> {props.nums_watch} Watch
                </li>
                <li>
                   <CgGitFork/> {props.nums_fork} Fork
                </li>
            </ul>
            <hr/>
            <span>
                Created On {props.created_at.toString()}
            </span>
            <br/>
            <span>
                Updated On {props.updated_at.toString()}
            </span>
            <hr/>
        </div>
    );
};