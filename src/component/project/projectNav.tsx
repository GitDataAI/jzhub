import {ActionIcon, Button, Input, Tabs} from "@mantine/core";
import {BiSearch} from "react-icons/bi";
import {useRouter} from "next/navigation";
import {RepoListOwner} from "@/component/project/RepoListOwner";
import useUserContext from "@/store/useUserContext";

export const ProjectNav = () => {
    const nav = useRouter().replace;
    const context = useUserContext().data;
    return (
        <div className="project-nav">
            <div className="nav-header">
                <h1 className="title">Product</h1>
                <div className="exnew">
                    <Button onClick={() => {
                        nav("/product/new");
                    }}>New</Button>
                </div>
            </div>
            <Tabs className="nav-tabs" defaultValue="Owner">
                <Tabs.List>
                    <Tabs.Tab value="Owner">
                        <span>Owner Repository</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="Participate">
                        <span>Participate Repository</span>
                    </Tabs.Tab>
                    <Tabs.Tab value="Group">
                        <span>Group Repository</span>
                    </Tabs.Tab>
                </Tabs.List>
                <div className="nav-filter">
                    <Input placeholder="Search or filter results..." rightSection={
                        <ActionIcon style={{
                            backgroundColor: "#f15108",
                        }}>
                            <BiSearch/>
                        </ActionIcon>
                    }/>
                </div>
                <Tabs.Panel value="Owner" pt="xs">
                    {
                        context && <RepoListOwner username={context.username}/>
                    }
                </Tabs.Panel>
                <Tabs.Panel value="Participate" pt="xs">
                    Participate Repository
                </Tabs.Panel>
                <Tabs.Panel value="Group" pt="xs">
                    Group Repository
                </Tabs.Panel>
            </Tabs>

        </div>
    )
}