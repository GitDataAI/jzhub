import {Avatar, Button, Indicator, Menu, MenuDropdown, MenuItem, MenuTarget} from "@mantine/core";
import {CiAlignLeft, CiAlignRight} from "react-icons/ci";
import {RiGitRepositoryLine, RiGroupLine} from "react-icons/ri";
import useUserContext from "@/store/useUserContext";
import {IoIosNotifications, IoIosNotificationsOff, IoIosNotificationsOutline} from "react-icons/io";
import {useRouter} from "next/navigation";
import { CiSettings,CiStar,CiLogout,CiCreditCard1,CiFileOn,CiDatabase,CiBoxes } from "react-icons/ci";

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gitdata-ai.png" className="logo" alt="gitdata-ai" onClick={() => {
                nav("/");
            }}/>
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
                        <IoIosNotificationsOutline
                        />
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
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiBoxes
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Overview</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Repository";
                                        }
                                    }}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiDatabase
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Repository</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Product";
                                        }
                                    }}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiFileOn
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Product</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Project";
                                        }
                                    }}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiCreditCard1
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Project</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        if (context.data) {
                                            window.location.href = "/" + context.data.username + "?tab=Star";
                                        }
                                    }}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiStar
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Star</span>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={() => {
                                        window.location.href = "/settings";
                                    }}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiSettings
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                            }}>Settings</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={() => context.logout()}>
                                        <div style={{ lineHeight: "0.5rem" }}>
                                            <CiLogout
                                                style={{
                                                    display: "inline-block",
                                                    verticalAlign: "middle",
                                                    marginRight: 8
                                                }}
                                            />
                                            <span style={{
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                                color: "red"
                                            }}>Logout</span>
                                        </div>
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