import {FaStar} from "react-icons/fa";
import {FiActivity} from "react-icons/fi";
import {IoMdEye} from "react-icons/io";
import {FaCodeFork} from "react-icons/fa6";
import {ActionList, Heading} from "@primer/react";
import {useNavigate} from "react-router-dom";
import {RepoModel} from "../../lib/model/RepoModel.tsx";

export interface RepoInfoProps {
    model: RepoModel,
}


const RepoInfo = (props: RepoInfoProps) => {
    const nav = useNavigate();
    return(
        <div className="repo-info">
            <Heading as="h1" id="list-heading" sx={{
                fontSize: 3,
                marginX: 3
            }}>
                {props.model.name}
            </Heading>
            <ActionList>
                {
                    props.model.website ?
                        <ActionList.Group>
                            <ActionList.Item>
                                <ActionList.LeadingVisual>
                                    <FaStar />
                                </ActionList.LeadingVisual>
                                {props.model.website}
                            </ActionList.Item>
                        </ActionList.Group>
                        : ""
                }
                {
                    props.model.description !== null ?
                        <ActionList.Group>
                            <ActionList.Item>
                                {props.model.description}
                            </ActionList.Item>
                        </ActionList.Group>
                        : ""
                }
                <ActionList.Group>
                    <ActionList.Item onClick={()=>{
                        nav(`/${props.model.owner}/${props.model.name}/active`)
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
                        {props.model.nums_watcher} watching
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
                        {props.model.nums_star} stars
                    </ActionList.Item>
                    <ActionList.Item>
                        <ActionList.LeadingVisual>
                            <FaCodeFork />
                        </ActionList.LeadingVisual>
                        {props.model.nums_fork} forks
                    </ActionList.Item>
                </ActionList.Group>

            </ActionList>
        </div>
    )
}

export default RepoInfo