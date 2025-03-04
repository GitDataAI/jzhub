import {
    Button,
    Card, Checkbox, CheckboxGroup,
    Group,
    Input,
    SegmentedControl,
} from "@mantine/core";
import React, { useState} from "react";

interface ExploreHeadProps {
    Tab: string,
    setTab: (value: (((prevState: string) => string) | string)) => void
}

export const ExploreHead = ({Tab, setTab}: ExploreHeadProps) => {
    const [SearchCheckBox, setSearchCheckBox] = useState<string[]>(['repository', 'marketplace', 'product'])
    return (
        <Card className="explore-head">
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                flexDirection: "column"
            }}>
                <SegmentedControl defaultValue={Tab} onChange={setTab} data={['Search', 'Chat']}
                                  className="explore-head-tab"/>
                {
                    Tab === "Search" && (
                        <>
                            <div className="explore-head-search">
                                <Input placeholder="Search"/>
                                <Button color="#f35202">Search</Button>
                            </div>
                            <CheckboxGroup value={SearchCheckBox} onChange={setSearchCheckBox}
                                           className="explore-head-search-checkbox">
                                <Group>
                                    <Checkbox value={"marketplace"} label={"MarketPlace"}/>
                                    <Checkbox value={"repository"} label={"Repository"}/>
                                    <Checkbox value={"product"} label={"Product"}/>
                                    <Checkbox value={"user"} label={"User"}/>
                                    <Checkbox value={"group"} label={"Group"}/>
                                    <Checkbox value={"issues"} label={"Issues"}/>
                                    <Checkbox value={"pr"} label={"PR"}/>
                                    <Checkbox value={"wiki"} label={"Wiki"}/>
                                    <Checkbox value={"topic"} label={"Topic"}/>
                                </Group>
                            </CheckboxGroup>
                        </>
                    )
                }
                {
                    Tab === "Chat" && (
                        <>
                            <div className="explore-head-search">

                            </div>
                        </>
                    )
                }
            </div>
        </Card>
    )
}

