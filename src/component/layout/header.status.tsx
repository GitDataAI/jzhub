'use client'

import {Menu, MenuDropdown, MenuItem, MenuTarget, UnstyledButton} from "@mantine/core";
import React, {useState} from "react";
import {MdOutlineExplore} from "react-icons/md";
import {FaBagShopping} from "react-icons/fa6";
import {RiGitRepositoryLine} from "react-icons/ri";
import {VscIssues} from "react-icons/vsc";
import {IoIosGitPullRequest} from "react-icons/io";
import {GoCommentDiscussion} from "react-icons/go";
import {IoCode} from "react-icons/io5";
import {FaCaretRight} from "react-icons/fa";
import {useRouter} from "next/navigation";

export const HeaderStatus = () => {
    const nav = useRouter().replace;
    const [location, setLocation] = useState<{
        icon: React.ReactNode,
        name: string,
    }>({
        icon: <MdOutlineExplore />,
        name: 'Explore',
    });
    const Item = [
        {
            icon: <MdOutlineExplore />,
            name: 'Explore',
            url: "/explore"
        },
        {
            icon: <FaBagShopping />,
            name: 'MarketPlace',
            url: "/marketplace"
        },
        {
            icon: <RiGitRepositoryLine />,
            name: 'Repository',
            url: "/workspace/repository"
        },
        {
            icon: <VscIssues />,
            name: 'Issues',
            url: "/workspace/issues"
        },
        {
            icon: <IoIosGitPullRequest />,
            name: 'Pull Request',
            url: "/workspace/pull_request"
        },
        {
            icon: <GoCommentDiscussion />,
            name: 'Discussion',
            url: "/workspace/discussion"
        },
        {
            icon: <IoCode />,
            name: 'CodeSpace',
            url: "/workspace/codespace"
        },
    ]
    return(
        <div >
            <Menu trigger="click-hover" withArrow openDelay={100} closeDelay={400}>
                <MenuTarget >
                    <UnstyledButton>
                        <div className="header-status">
                            {location.icon}
                            <span>{location.name}</span>
                            <FaCaretRight className="header-status-arrow"/>
                        </div>
                    </UnstyledButton>
                </MenuTarget>
                <MenuDropdown className="header-status-menus">
                    {
                        Item.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        nav(item.url)
                                        setLocation({
                                            icon: item.icon,
                                            name: item.name
                                        })
                                    }}
                                    leftSection={item.icon}
                                >

                                    <span>{item.name}</span>
                                </MenuItem>
                            )
                        })
                    }
                </MenuDropdown>
            </Menu>
        </div>
    )
}