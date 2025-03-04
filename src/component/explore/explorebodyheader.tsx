import {Tabs} from "@mantine/core"

interface ExploreBodyHeaderProps {
    tab: string,
    setTab: (value: (((prevState: string) => string) | string)) => void
}

export const ExploreBodyHeader = ({tab, setTab}: ExploreBodyHeaderProps) => {
    return (
        <div className="explore-intro-header">
            <Tabs defaultValue={tab} value={tab} onChange={(val) => {
                if (val) {
                    setTab(val);
                }
            }} inverted>
                <Tabs.List>
                    <Tabs.Tab value="intro">推荐</Tabs.Tab>
                    <Tabs.Tab value="hot">热门</Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </div>
    )
}