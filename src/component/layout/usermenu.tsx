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
                <MenuDropdown>
                    <MenuItem leftSection={<AiOutlineProfile size={14}/>} onClick={() => {
                        routes.replace("/u/" + props.user.username + "?tab=actively")
                    }}> Profile</MenuItem>
                    <MenuItem leftSection={<AiOutlineTeam size={14}/>}>Team</MenuItem>
                    <MenuItem leftSection={<HiMiniUserGroup size={14}/>}>Group</MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<RiGitRepositoryLine size={14}/>}>Repository</MenuItem>
                    <MenuItem leftSection={<VscGithubProject size={14}/>}>Project</MenuItem>
                    <MenuItem leftSection={<MdProductionQuantityLimits size={14}/>}>Product</MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<MdStar size={14}/>}>Star</MenuItem>
                    <MenuItem leftSection={<GiShadowFollower size={14}/>}>Follow</MenuItem>
                    <MenuItem leftSection={<FaThemeco size={14}/>}>Pro</MenuItem>
                    <MenuItem leftSection={<FaMoneyCheck size={14}/>}>Finance</MenuItem>
                    <MenuItem leftSection={<RiBillLine size={14}/>}>Bill</MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<CiSettings size={14}/>}>Setting</MenuItem>
                    <MenuItem leftSection={<CiLogout size={14}/>} onClick={()=>{
                        user.logout();
                        window.location.reload();
                    }}>Logout</MenuItem>
                    <MenuDivider/>
                    <MenuItem leftSection={<SlDocs size={14}/>}>GitDataAI Docs</MenuItem>
                    <MenuItem leftSection={<TfiHelpAlt size={14}/>}>GitDataAI Help</MenuItem>
                    <MenuItem leftSection={<MdOutlineContactSupport size={14}/>}>GitDataAI Contact</MenuItem>
                </MenuDropdown>
            </Menu>
        </div>
    )
}