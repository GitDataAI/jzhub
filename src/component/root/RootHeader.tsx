import useUser from "../../store/useUser.tsx";
import {useEffect, useState} from "react";
import {ActionIcon, Drawer, Input, Menu, Modal, NavLink} from "@mantine/core";
import {CiSearch, CiSettings, CiTextAlignRight} from "react-icons/ci";
import UserAvatarButton from "./UserAvatarButton.tsx";
import {IoAddOutline} from "react-icons/io5";
import {GoGitPullRequest, GoIssueOpened, GoPackage, GoRepo, GoRepoPush} from "react-icons/go";
import {LuMessageSquareText} from "react-icons/lu";
import {HiUserGroup} from "react-icons/hi";
import {useInfo} from "../../store/useInfo.tsx";
import {CgProfile, CgWebsite} from "react-icons/cg";
import {SiReadthedocs} from "react-icons/si";
import {MdSupportAgent} from "react-icons/md";
import {LiaDiscourse} from "react-icons/lia";
import {SlLogout} from "react-icons/sl";
import {useNavigate} from "react-router";

const RootHeader = () => {
    const user = useUser();
    const info = useInfo();
    const [HeaderInfo, setHeaderInfo] = useState<{
        label: string,
        url: string
    }>({
        label: info.local.label,
        url: info.local.url
    });
    useInfo.subscribe((state)=>{
        setHeaderInfo(state.local)
    })
    const nav = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [HasAvatar, setHasAvatar] = useState(false);
    const [SearchModel, setSearchModel] = useState(false);
    const [OpenLeft, setOpenLeft] = useState(false);
    const [OpenRight, setOpenRight] = useState(false);
    useEffect(()=>{
       if (user.user) {
           if (!user.user.avatar_url) {
               setAvatar(user.user.name[0])
               setHasAvatar(false);
               setIsLogin(true);
           }else {
               setAvatar(user.user.avatar_url);
               setHasAvatar(true);
               setIsLogin(true);
           }
       }
    },[])
    useEffect(() => {
        const handleKeyDown = (event:KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "f") {
                event.preventDefault();
                setSearchModel(true)
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return(
        <div className="root-header">
            <Modal
                opened={SearchModel}
                onClose={()=>{
                    setSearchModel(false)
                }}
                title="Search"
                fullScreen={false}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <Input onChange={(x)=>{
                    console.log(x)
                }}/>
            </Modal>

            <div className="root-header-left-btn">
                <ActionIcon onClick={()=>{
                    setOpenLeft(true)
                }} size="lg" variant="default" >
                    <CiTextAlignRight />
                </ActionIcon>
                <a onClick={()=>{
                    nav(`${HeaderInfo.url}`)
                }}>
                    {HeaderInfo.label}
                </a>
            </div>
            <div className="root-header-left-logo">
                <img src="/gitdata.ai-redpanda.png" alt="logo" />
            </div>
            <div className="root-header-search" onClick={()=>{
                setSearchModel(true)
            }}>
                <a>
                    <CiSearch />
                    <span>
                        Search
                    </span>
                </a>
                <b>
                    Ctrl + F
                </b>
            </div>
            <div className="root-header-right-tools">
                <Menu shadow="md">
                    <Menu.Target>
                        <ActionIcon size="lg" variant="default">
                            <IoAddOutline/>
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={()=>{
                            nav("/new/repository")
                        }}>
                            <GoRepo /> New Repository
                        </Menu.Item>
                        <Menu.Item>
                            <GoRepoPush /> Import Repository
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item>
                            <HiUserGroup /> New Groups
                        </Menu.Item>
                        <Menu.Item>
                            <HiUserGroup /> New Teams
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <ActionIcon size="lg" variant="default">
                    <GoIssueOpened/>
                </ActionIcon>
                <ActionIcon size="lg" variant="default">
                    <LuMessageSquareText/>
                </ActionIcon>
            </div>
            <div className="root-header-right-avatar">
                {
                    isLogin ? (
                        <>
                            <UserAvatarButton
                                onClick={()=>{
                                    setOpenRight(true)
                                }}
                                image={avatar}
                                name={user.user!.username}
                                email={user.user!.main_email}
                                hasAvatar={HasAvatar}
                            />
                        </>
                    ) : <div className="root-header-right-avatar-login">Login</div>
                }
            </div>
            <Drawer
                opened={OpenLeft}
                onClose={()=>{
                    setOpenLeft(false)
                }}
                size="xs"
                position="left"
                withCloseButton={false}
            >
                {/* Drawer content */}
            </Drawer>
            <Drawer
                withCloseButton={false}
                opened={OpenRight}
                position="right"
                size="xs"
                onClose={()=>{
                    setOpenRight(false)
                }}
                className="root-header-model-right"
            >
                {
                    user.user ? (
                        <UserAvatarButton
                            onClick={()=>{
                                setOpenRight(true)
                            }}
                            image={avatar}
                            name={user.user!.username}
                            email={user.user!.main_email}
                            hasAvatar={HasAvatar}
                            icon={<></>}
                        />
                    ):null
                }
                <div className="root-header-model-right-menu">
                    <NavLink label="Profile" onClick={()=>{
                        nav(`/${user.user!.username}?tab=dashboard`)
                    }} leftSection={<CgProfile/>}/>
                    <NavLink label="You Repository" onClick={()=>{
                        nav(`/${user.user!.username}?tab=repository`)
                    }}  leftSection={<GoRepo/>}/>
                    <NavLink label="You Package"  onClick={()=>{
                        nav(`/${user.user!.username}?tab=package`)
                    }}  childrenOffset={28} leftSection={<GoPackage/>}/>
                    <NavLink label="You Pull Request" leftSection={<GoGitPullRequest/>}/>
                    <hr/>
                    <NavLink label="Setting" leftSection={<CiSettings />}/>
                    <hr/>
                    <NavLink label="GitDataAi Website" leftSection={<CgWebsite />}/>
                    <NavLink label="GitDataAi Docs" leftSection={<SiReadthedocs />}/>
                    <NavLink label="GitDataAi Support" leftSection={<MdSupportAgent />}/>
                    <NavLink label="GitDataAi Community" leftSection={<LiaDiscourse />}/>
                    <hr/>
                    <NavLink label="Logout" leftSection={<SlLogout />} onClick={()=>{
                        user.logout().then(()=>{})
                    }}/>
                </div>
            </Drawer>
        </div>
    )
}


export default RootHeader