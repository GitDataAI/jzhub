'use client'

import {ActionIcon, Button, Input, Menu, Tabs} from "@mantine/core";
import {BiSearch} from "react-icons/bi";
import {IconChevronDown} from "@tabler/icons-react";


interface ExploreItemHeaderProps {
    rtype: "product" | "user" | "organization" | undefined,
    setRtype: (x: string) => void,
    Filter?: "public" | "private" | undefined,
    setFilter: (x: string) => void,
    search: string,
    setSearch: (x: string) => void,
}

export const ExploreItemHeader = ({setRtype, rtype, Filter, setFilter, search,setSearch}: ExploreItemHeaderProps) => {
    return (
        <div className="explore-nav">
            <div className="nav-header">
                <h1 className="title">Explore</h1>

            </div>
            <Tabs className="nav-tabs" defaultValue="Product" onChange={(value) => {
                if (value) {
                    setRtype(value)
                }
            }}
                  value={rtype ? rtype : "product"}
            >
                <Tabs.List>
                    <Tabs.Tab value="product" className="tab-Product">
                        <span>Repository</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="user" className="tab-Users">
                        <span>Users</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="organization" className="tab-Organization">
                        <span>Organization</span>
                    </Tabs.Tab>
                </Tabs.List>
                <div className="nav-filter">
                    <Input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        className="search-input"
                        placeholder="Search or filter results..."
                        rightSection={
                            <ActionIcon style={{backgroundColor: "#f15108"}}>
                                <BiSearch/>
                            </ActionIcon>
                        }
                    />
                    <div className="search-filter-container">
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="gray">
                                    {
                                        Filter === "public" ? "public" : Filter === "private" ? "private" : "Filter"
                                    } <IconChevronDown size={14} className="icon-right"/>
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item onClick={() => {
                                    setFilter("public")
                                }}>public</Menu.Item>
                                {/*<Menu.Item onClick={() => {*/}
                                {/*    setFilter("private")*/}
                                {/*}}>private</Menu.Item>*/}
                            </Menu.Dropdown>
                        </Menu>
                        {/*<Menu>*/}
                        {/*    <Menu.Target>*/}
                        {/*        <Button variant="outline" color="gray">*/}
                        {/*            Sort <IconChevronDown size={14} className="icon-right"/>*/}
                        {/*        </Button>*/}
                        {/*    </Menu.Target>*/}
                        {/*    <Menu.Dropdown>*/}
                        {/*        <Menu.Item>new</Menu.Item>*/}
                        {/*        <Menu.Item>old</Menu.Item>*/}
                        {/*        <Menu.Item>starts</Menu.Item>*/}
                        {/*    </Menu.Dropdown>*/}
                        {/*</Menu>*/}
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