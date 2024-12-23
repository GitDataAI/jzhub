import {GraphQLRepoData, GraphQLRepoProfile} from "@/api/graphql/repo/Struct.tsx";
import {FaStar} from "react-icons/fa";
import {FiActivity} from "react-icons/fi";
import {IoMdEye} from "react-icons/io";
import {FaCodeFork} from "react-icons/fa6";
import {ActionList, Heading} from "@primer/react";
import {useNavigate} from "react-router-dom";

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
    const nav = useNavigate();
    return(
        <div className="repo-info">
            <Heading as="h1" id="list-heading" sx={{
                fontSize: 3,
                marginX: 3
            }}>
                About
            </Heading>
            <ActionList>
                <ActionList.Group>
                    <ActionList.Item>
                        {props.model.description}
                    </ActionList.Item>
                </ActionList.Group>
                <ActionList.Group>
                    <ActionList.Item onClick={()=>{
                        nav(`/${props.info.owner}/${props.info.repo}/active`)
                    }}>
                        <ActionList.LeadingVisual>
                            <FiActivity />
                        </ActionList.LeadingVisual>
                        Activity
                    </ActionList.Item>
                    <ActionList.Item>
                        <ActionList.LeadingVisual>
                            <IoMdEye />
                        </ActionList.LeadingVisual>
                        {props.data.watch} watching
                    </ActionList.Item>
                    {/*<ActionList.Item>*/}
                    {/*    <ActionList.LeadingVisual>*/}
                    {/*        <FaStar />*/}
                    {/*    </ActionList.LeadingVisual>*/}
                    {/*    MIT License*/}
                    {/*</ActionList.Item>*/}
                    <ActionList.Item>
                        <ActionList.LeadingVisual>
                            <FaStar />
                        </ActionList.LeadingVisual>
                        {props.data.star} stars
                    </ActionList.Item>
                    <ActionList.Item>
                        <ActionList.LeadingVisual>
                            <FaCodeFork />
                        </ActionList.LeadingVisual>
                        {props.data.fork} forks
                    </ActionList.Item>
                </ActionList.Group>

            </ActionList>
        </div>
    )
}

export default RepoInfo