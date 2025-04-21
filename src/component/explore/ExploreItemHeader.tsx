'use client'

import {ActionIcon, Button, Input, Menu, Tabs} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import {IconChevronDown} from "@tabler/icons-react";


export const ExploreItemHeader = () => {

    return (
        <div className="explore-nav">
            <div className="nav-header">
                <h1 className="title">Explore</h1>

            </div>
            <Tabs className="nav-tabs" defaultValue="Product">
                <Tabs.List>
                    <Tabs.Tab value="Product" className="tab-Product">
                        <span>Product</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="Users" className="tab-Users">
                        <span>Users</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="Organization" className="tab-Organization">
                        <span>Organization</span>
                    </Tabs.Tab>
                </Tabs.List>
                <div className="nav-filter">
                    <Input
                        className="search-input"
                        placeholder="Search or filter results..."
                        rightSection={
                            <ActionIcon style={{ backgroundColor: "#f15108" }}>
                                <BiSearch />
                            </ActionIcon>
                        }
                    />
                    <div className="search-filter-container">
                        <Menu >
                            <Menu.Target>
                                <Button variant="outline" color="gray">
                                    Filter <IconChevronDown size={14} className="icon-right"/>
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>public</Menu.Item>
                                <Menu.Item>private</Menu.Item>
                                <Menu.Item>archived</Menu.Item>
                                <Menu.Item>unrecorded</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="gray">
                                    Sort <IconChevronDown size={14} className="icon-right"/>
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>new</Menu.Item>
                                <Menu.Item>old</Menu.Item>
                                <Menu.Item>starts</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>

                <Tabs.Panel value="Product" pt="xs">
                    Product Content
                </Tabs.Panel>
                <Tabs.Panel value="Users" pt="xs">
                    Users Content
                </Tabs.Panel>
                <Tabs.Panel value="Organization" pt="xs">
                    Organization Content
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};