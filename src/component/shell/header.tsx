import {Avatar, Button, Indicator, Menu, MenuDropdown, MenuItem, MenuTarget} from "@mantine/core";
import {CiAlignLeft, CiAlignRight} from "react-icons/ci";
import {RiGitRepositoryLine, RiGroupLine} from "react-icons/ri";
import useUserContext from "@/store/useUserContext";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useRouter} from "next/navigation";

interface AppHeaderProps {
    close: () => void,
    opened: boolean,
    open: () => void
}

export const AppHeader = (props: AppHeaderProps) => {
    const context = useUserContext();
    const nav = useRouter().replace;
    return (
        <div className="app-header">
            <div className="app-header-left">
                <Button className="collapsed" onClick={(e) => {
                    if (props.opened) {
                        props.close()
                    } else {
                        props.open()
                    }
                    e.stopPropagation();
                }}>
                    {props.opened ? <CiAlignLeft/> : <CiAlignRight/>}
                </Button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/gitdata-ai.png" className="logo" alt="gitdata-ai" onClick={() => {
                    nav("/");
                }}/>
            </div>
            <div className="app-header-right">
                <div>
                    <Menu>
                        <MenuTarget>
                            <Button className="app-header-right-create-target">+</Button>
                        </MenuTarget>
                        <MenuDropdown className="app-header-right-create">
                            <MenuItem onClick={() => {
                                nav("/product/new");
                            }}>
                                <RiGitRepositoryLine/><a>New Repository</a>
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                nav("/group/new");
                            }}>
                                <RiGroupLine/><a>New Group</a>
                            </MenuItem>
                        </MenuDropdown>
                    </Menu>
                </div>
                <div>
                    <div className="app-header-right-create-notify">
                        <Indicator inline>
                            <IoIosNotificationsOutline/>
                        </Indicator>
                    </div>
                </div>
                {
                    context.data && (
                        <div>
                            <Menu>
                                <MenuTarget>
                                    <Avatar
                                        size="md"
                                        radius="sm"
                                        src={context.data.avatar || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"}
                                    />
                                </MenuTarget>
                                <MenuDropdown className="app-header-right-users">
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Overview";
                                        }
                                    }}>
                                        <a>Overview</a>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Repository";
                                        }
                                    }}>
                                        <a>Repository</a>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Product";
                                        }
                                    }}>
                                        <a>Product</a>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Project";
                                        }
                                    }}>
                                        <a>Project</a>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Star";
                                        }
                                    }}>
                                        <a>Star</a>
                                    </MenuItem>

                                    <MenuItem onClick={() => {
                                        window.location.href = "/settings";
                                    }}>
                                        <a>Settings</a>
                                    </MenuItem>
                                </MenuDropdown>
                            </Menu>
                        </div>
                    )
                }
            </div>

        </div>
    )
}