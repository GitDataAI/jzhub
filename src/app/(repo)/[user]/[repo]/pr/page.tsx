'use client';
import { Button, Input, Tabs, Menu } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import { IconChevronDown } from '@tabler/icons-react';

export default function Page() {
    return (
        <div className="pr">
            <div className="pr-header">
                <div className="title">
                    <h1>Pull Request</h1>
                    <Button>New PR</Button>
                </div>
                <Tabs defaultValue="open">
                    <Tabs.List>
                        <Tabs.Tab value="open">Open</Tabs.Tab>
                        <Tabs.Tab value="close">Close</Tabs.Tab>
                        <Tabs.Tab value="all">ALL</Tabs.Tab>
                    </Tabs.List>
                    <div className="search-filter-container">
                        <Input
                            className="pr-header-search"
                            rightSection={
                                <BsSearch style={{
                                    color: "black",
                                }} />
                            }
                        />
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="orange">
                                    Author <IconChevronDown size={14} />
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>name1</Menu.Item>
                                <Menu.Item>name2</Menu.Item>
                                <Menu.Item>name3</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="orange">
                                    Label <IconChevronDown size={14} />
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>label1</Menu.Item>
                                <Menu.Item>label2</Menu.Item>
                                <Menu.Item>label3</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="orange">
                                    Reviews <IconChevronDown size={14} />
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>PReviews1</Menu.Item>
                                <Menu.Item>PReviews2</Menu.Item>
                                <Menu.Item>PReviews3</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline" color="orange">
                                    Sort <IconChevronDown size={14} />
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>Oldest</Menu.Item>
                                <Menu.Item>Newest</Menu.Item>
                                <Menu.Item>Best match</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
