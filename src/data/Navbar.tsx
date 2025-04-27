import React from "react";
import {GrActions, GrIntegration, GrProjects} from "react-icons/gr";
import {FaUserGroup} from "react-icons/fa6";
import {
    AiFillAlert,
    AiFillAudio,
    AiFillBehanceCircle, AiFillHeart,
    AiFillProduct,
    AiOutlineProfile
} from "react-icons/ai";
import {RiGalleryView, RiGitRepositoryCommitsLine} from "react-icons/ri";
import {CiStar} from "react-icons/ci";
import { VscBrowser } from "react-icons/vsc";
import {
    MdAppRegistration,
    MdDeveloperBoard,
    MdNotificationsNone,
    MdOutlineProductionQuantityLimits,
    MdPrivacyTip,
    MdSecurity
} from "react-icons/md";
import {VscAccount,} from "react-icons/vsc";
// import { VscIssues} from "react-icons/vsc";
import {TbHttpConnect} from "react-icons/tb";
import {BsShieldLock} from "react-icons/bs";
import {SiPrivateinternetaccess} from "react-icons/si";
import {BiFile} from "react-icons/bi";
import { VscRemoteExplorer } from "react-icons/vsc";
// import {FaWikipediaW} from "react-icons/fa";
// import {GoGitPullRequest} from "react-icons/go";
import {CgInsights} from "react-icons/cg";

export interface AppNavbarItem {
    title: string,
    href?: string,
    icon?: React.ReactNode,
    active: boolean,
    children?: AppNavbarItem[],
    onClick?: () => void,
    id?: string,
}

export interface AppNavbarProps {
    title: string,
    url: string,
    tab: boolean,
    menu: AppNavbarItem[],
}


export const DashboardMenu: AppNavbarProps = {
    title: "Dashboard",
    url: "/",
    tab: false,
    menu: [
        {
            title: "Explore",
            href: "/Explore",
            icon: <VscRemoteExplorer/>,
            active: true,
            id: "dashboard-explore",
        },
        {
            title: "Repository",
            href: "/repository",
            icon: <GrProjects/>,
            active: false,
            id: "dashboard-product",
        },
        {
            title: "Product",
            href: "/product",
            icon: <AiFillProduct/>,
            active: false,
            id: "dashboard-product",
        },
        {
            title: "Organization",
            href: "/organization",
            icon: <FaUserGroup/>,
            active: false,
            id: "dashboard-group",
        },
        {
            title: "Team",
            href: "/team",
            icon: <AiOutlineProfile/>,
            active: false,
            id: "dashboard-team",
        },
        {
            title: "Workspace",
            href: "/workspaces",
            icon: <VscBrowser/>,
            active: false,
            id: "dashboard-workspace",
        },
    ]
}


export const ProfileMenu: AppNavbarProps = {
    title: "Profile",
    url: "",
    tab: true,
    menu: [
        {
            title: "Overview",
            icon: <RiGalleryView/>,
            active: true,
            id: "profile-overview",
        },
        {
            title: "Repository",
            icon: <RiGitRepositoryCommitsLine/>,
            active: false,
            id: "profile-repository",
        },
        {
            title: "Product",
            icon: <MdOutlineProductionQuantityLimits/>,
            active: false,
            id: "profile-product",
        },
        {
            title: "Project",
            icon: <GrProjects/>,
            active: false,
            id: "profile-project",
        },
        {
            title: "Star",
            icon: <CiStar/>,
            active: false,
            id: "profile-star",
        },

    ]
}

export const SettingsMenu: AppNavbarProps = {
    title: "Settings",
    url: "/settings/",
    tab: false,
    menu: [
        {
            title: "Profile",
            icon: <RiGalleryView/>,
            active: true,
            id: "settings-profile",
        },
        {
            title: "Account",
            icon: <VscAccount/>,
            active: false,
            id: "settings-account",
        },
        {
            title: "App",
            icon: <MdAppRegistration/>,
            active: false,
            id: "settings-app",
        },
        {
            title: "Security",
            icon: <MdSecurity/>,
            active: false,
            id: "settings-security",
        },
        {
            title: "Notify",
            icon: <MdNotificationsNone/>,
            active: false,
            id: "settings-notify",
        },
        {
            title: "Privacy",
            icon: <MdPrivacyTip/>,
            active: false,
            id: "settings-privacy",
        },
        {
            title: "Imploded",
            icon: <GrIntegration/>,
            active: false,
            id: "settings-imploded",
        },
        {
            title: "Developer",
            icon: <MdDeveloperBoard/>,
            active: false,
            id: "settings-developer",
        },
        {
            title: "Connect",
            icon: <TbHttpConnect/>,
            active: false,
            id: "settings-connect",
        },
        {
            title: "SSH",
            icon: <BsShieldLock/>,
            active: false,
            id: "settings-ssh",
        },
        {
            title: "Access",
            icon: <SiPrivateinternetaccess/>,
            active: false,
            id: "settings-access",
        },
    ]
}

export const RepoMenu = (props: { owner: string, repo: string }): AppNavbarProps => {
    return {
        title: props.owner + "/" + props.repo,
        url: `/${props.owner}/${props.repo}/`,
        tab: false,
        menu: [
            {
                title: "File",
                icon: <BiFile/>,
                active: true,
                id: "repo-file",
            },
            // {
            //     title: "Wiki",
            //     icon: <FaWikipediaW/>,
            //     active: false,
            //     id: "repo-wiki",
            // },
            // {
            //     title: "Issues",
            //     icon: <VscIssues/>,
            //     active: false,
            //     id: "repo-issues",
            // },
            // {
            //     title: "PR",
            //     icon: <GoGitPullRequest/>,
            //     active: false,
            //     id: "repo-pr",
            // },
            {
                title: "Actions",
                icon: <GrActions/>,
                active: false,
                id: "repo-actions",
            },
            {
                title: "Product",
                icon: <AiFillProduct/>,
                active: false,
                id: "repo-product",
            },
            {
                title: "Insights",
                icon: <CgInsights/>,
                active: false,
                id: "repo-insights",
            },
        ]
    }
}

export const RepoSettingMenu = (props: {owner:string,repo: string,setting: string}): AppNavbarProps => {
    return {
        title: props.owner + "/" + props.repo,
        url: `/${props.owner}/${props.repo}/${props.setting}`,
        tab: false,
        menu: [
            {
                title: "General",
                icon: <BiFile/>,
                active: true,
                id: "setting-general",
            },
            {
                title: "Branch",
                icon: <GrActions/>,
                active: false,
                id: "setting-branch",
            },
            {
                title: "Actions",
                icon: <AiFillProduct/>,
                active: false,
                id: "setting-action",
            },
            {
                title: "Webhook",
                icon: <CgInsights/>,
                active: false,
                id: "setting-webhook",
            },
            {
                title: "Secret",
                icon: <AiFillAlert/>,
                active: false,
                id: "setting-secret",
            },
            {
                title: "Env",
                icon: <AiFillBehanceCircle/>,
                active: false,
                id: "setting-env",
            },
            {
                title: "App",
                icon: <AiFillHeart/>,
                active: false,
                id: "setting-app",
            },
            {
                title: "Email",
                icon: <AiFillAudio/>,
                active: false,
                id: "setting-email",
            },
        ]
    }
}