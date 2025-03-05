import {Divider} from "@mantine/core";
import {AiOutlineProfile} from "react-icons/ai";
import {IoMdNotificationsOutline} from "react-icons/io";
import {IoAppsSharp} from "react-icons/io5";
import {MdAccountCircle} from "react-icons/md";
import {RiBillLine, RiSecurePaymentFill, RiTokenSwapLine} from "react-icons/ri";
import {BsShieldLock} from "react-icons/bs";
import {TbAuth2Fa} from "react-icons/tb";
import {CgPassword} from "react-icons/cg";
import {UserDashBored} from "@/server/types";
import {UserButton} from "@/component/layout/userbtn";

interface UserSettingSidebarProps {
    tab: string,
    setTab: (value: string) => void,
    dash: UserDashBored
}

export const UserSettingSidebar = ({tab, setTab, dash}: UserSettingSidebarProps) => {

    return (
        <div className="user-setting-sidebar">
            <div className="user-setting-sidebar-header">
                <UserButton
                    image={dash.user.avatar || ""}
                    name={dash.user.username}
                    email={dash.user.name}
                    icon={
                        <span>
                            Current User
                        </span>
                    }
                />
            </div>
            <ul>
                <Divider label="Preferences"/>
                <li className={tab === "profile" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("profile")}
                >
                    <AiOutlineProfile/>
                    <a>
                        Profile
                    </a>
                </li>
                <li
                    className={tab === "account" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("account")}
                >
                    <MdAccountCircle/>
                    <a>
                        Account
                    </a>
                </li>
                <li
                    className={tab === "appearance" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("appearance")}
                >
                    <IoAppsSharp/>
                    <a>
                        Appearance
                    </a>
                </li>
                <li
                    className={tab === "notifications" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("notifications")}
                >
                    <IoMdNotificationsOutline/>
                    <a>
                        Notifications
                    </a>
                </li>
                <Divider label="Finance"/>
                <li
                    className={tab === "billing" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("billing")}
                >
                    <RiBillLine/>
                    <a>
                        Billing
                    </a>
                </li>
                <li
                    className={tab === "payment" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("payment")}
                >
                    <RiSecurePaymentFill/>
                    <a>
                        Payment
                    </a>
                </li>
                <Divider label="Access"/>
                <li
                    className={tab === "tokens" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("tokens")}
                >
                    <RiTokenSwapLine/>
                    <a>
                        Tokens
                    </a>
                </li>
                <li
                    className={tab === "ssh" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("ssh")}
                >
                    <BsShieldLock/>
                    <a>
                        SSH Keys
                    </a>
                </li>
                <li
                    className={tab === "2fa" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("2fa")}
                >
                    <TbAuth2Fa/>
                    <a>
                        Two-factor Authentication
                    </a>
                </li>
                <li
                    className={tab === "password" ? "user-setting-sidebar-indi active" : "user-setting-sidebar-indi"}
                    onClick={() => setTab("password")}
                >
                    <CgPassword/>
                    <a>
                        Password
                    </a>
                </li>
            </ul>
        </div>
    )
}