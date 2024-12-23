import {GraphQLRepoData, GraphQLRepoProfile} from "@/api/graphql/repo/Struct.tsx";
import {FaReadme, FaStar} from "react-icons/fa";
import {FiActivity} from "react-icons/fi";
import {IoMdEye} from "react-icons/io";
import {FaCodeFork} from "react-icons/fa6";

export interface RepoInfoProps{
    model: GraphQLRepoProfile,
    info: {
        owner: string,
        repo: string
    },
    isEmpty: boolean,
    data: GraphQLRepoData
}



const RepoInfo = (props: RepoInfoProps) => {
    return(
        <div className="repo-info">
            <h1>About</h1>
            <p className="repo-info-bio">{props.model.description}</p>
            <div className="repo-info-list">
                <FaReadme /> <p>Readme</p>
            </div>
            <div className="repo-info-list">
                <FiActivity /> <p>Activity</p>
            </div>
            <div className="repo-info-list">
                <FaStar /> <p>{props.data.star} Starred</p>
            </div>
            <div className="repo-info-list">
                <IoMdEye /> <p>{props.data.watch} Watching</p>
            </div>
            <div className="repo-info-list">
                <FaCodeFork /> <p>{props.data.fork} Fork</p>
            </div>
        </div>
    )
}

export default RepoInfo