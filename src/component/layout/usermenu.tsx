import {Menu, MenuDivider, MenuDropdown, MenuItem, MenuTarget} from "@mantine/core";
import {UserButton} from "@/component/layout/userbtn";
import {AiOutlineProfile, AiOutlineTeam} from "react-icons/ai";
import {HiMiniUserGroup} from "react-icons/hi2";
import {RiBillLine, RiGitRepositoryLine} from "react-icons/ri";
import {VscGithubProject} from "react-icons/vsc";
import {MdOutlineContactSupport, MdProductionQuantityLimits, MdStar} from "react-icons/md";
import {GiShadowFollower} from "react-icons/gi";
import {FaMoneyCheck, FaThemeco} from "react-icons/fa";
import {CiLogout, CiSettings} from "react-icons/ci";
import {SlDocs} from "react-icons/sl";
import {TfiHelpAlt} from "react-icons/tfi";
import {UserModel} from "@/server/types";
import useUserContext from "@/store/useUserContext";
import {useRouter} from "next/navigation";

interface UsermenuProps {
    user: UserModel
}

export const Usermenu = (props: UsermenuProps) => {
    const user = useUserContext();
    const routes = useRouter();
    return (
        <div className="user-menu">
            <Menu withArrow width={200} shadow={"md"}>
                <MenuTarget>
                    <UserButton
                        image={props.user.avatar || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"}
                        name={props.user.username}
                        email={props.user.email}
                    />
                </MenuTarget>
                <MenuDropdown className="user-menu-drop">
                    <MenuItem leftSection={<AiOutlineProfile size={14}/>} onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=actively")
                    }}>
                        <span>Profile</span>
                    </MenuItem>
                    <MenuItem leftSection={<AiOutlineTeam size={14}/>}>
                        <span>Team</span>
                    </MenuItem>
                    <MenuItem leftSection={<HiMiniUserGroup size={14}/>}>
                        <span>Group</span>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<RiGitRepositoryLine size={14}/>} onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=repository")
                    }}>
                        <span>Repository</span>
                    </MenuItem>
                    <MenuItem leftSection={<VscGithubProject size={14}/>} onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=project")
                    }}>
                        <span>Project</span>
                    </MenuItem>
                    <MenuItem leftSection={<MdProductionQuantityLimits size={14}/>} onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=product")
                    }}>
                        <span>Product</span>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<MdStar size={14}/>}  onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=star")
                    }}>
                        <span>Star</span>
                    </MenuItem>
                    <MenuItem leftSection={<GiShadowFollower size={14}/>}  onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=follow")
                    }}>
                        <span>Follow</span>
                    </MenuItem>
                    <MenuItem leftSection={<FaThemeco size={14}/>}>
                        <span>Pro</span>
                    </MenuItem>
                    <MenuItem leftSection={<FaMoneyCheck size={14}/>}>
                        <span>Finance</span>
                    </MenuItem>
                    <MenuItem leftSection={<RiBillLine size={14}/>}>
                        <span>Bill</span>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<CiSettings size={14}/>}  onClick={() => {
                        routes.replace("/u/setting/profile")
                    }}>
                        <span>Setting</span>
                    </MenuItem>
                    <MenuItem leftSection={<CiLogout size={14}/>} onClick={()=>{
                        user.logout();
                        window.location.reload();
                    }}>Logout</MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<SlDocs size={14}/>}>
                        <span>GitDataAI Docs</span>
                    </MenuItem>
                    <MenuItem leftSection={<TfiHelpAlt size={14}/>}>
                        <span>GitDataAI Help</span>
                    </MenuItem>
                    <MenuItem leftSection={<MdOutlineContactSupport size={14}/>}>
                        <span>GitDataAI Contact</span>
                    </MenuItem>
                </MenuDropdown>
            </Menu>
        </div>
    )
}