import {useParams, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import {SessionModel} from "../../lib/model/UserModel.tsx";
import useUser from "../../store/useUser.tsx";
import {UsersApi} from "../../lib/api/UsersApi.tsx";
import {Box, LoadingOverlay, Tabs} from "@mantine/core";
import UserIdcard from "../../component/profile/UserIdcard.tsx";
import RepositoryList from "./RepositoryList.tsx";
import {useInfo} from "../../store/useInfo.tsx";
import RootHeader from "../../component/root/RootHeader.tsx";
const ProfileLayout = () => {
    const user = useUser();
    const info = useInfo();
    const users_api = new UsersApi();
    const { username } = useParams();
    const [ UserModel, setUserModel ] = useState<SessionModel | null>(null);
    const [ Loading, setLoading ] = useState(false);
    const [ NotFound, setNotFound ] = useState(false);
    const [ Tab, setTab ] = useSearchParams();
    const [ TabValue, setTabValue ] = useState("");
    useEffect(()=>{
        if (!Tab.get("tab")){
            Tab.set("tab","dashboard");
            setTab(Tab);
            setTabValue("dashboard")
        }else {
            setTabValue(Tab.get("tab")!);
        }
        if (username){
            info.setLocal(username, `/${username}`)
        }
        if (user.user){

            if (user.user.username === username){
                setUserModel(user.user);
                setLoading(true);
                setNotFound(false);
            }
        }else if (username){
            users_api.information(username).then((res)=>{
                if (res.data.code === 200){
                    setUserModel(res.data.data!);
                    setLoading(true);
                    setNotFound(false);
                }else{
                    setLoading(true);
                    setNotFound(true);
                }
            })
        }
    },[])
    return(
        <>
            <RootHeader/>
            <Box pos="relative" className="profile">
                <LoadingOverlay visible={!Loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {
                    NotFound ? (
                        <div>
                            404
                        </div>
                    ):(
                        <div>
                            {
                                UserModel && (
                                    <div className="profile-grad">
                                        <div style={{
                                            position: "absolute",
                                            height: '100%',
                                            width: "25%",
                                            left: 0
                                        }}>
                                            <UserIdcard model={UserModel}/>
                                        </div>
                                        <div style={{
                                            position: "absolute",
                                            width: "75%",
                                            height: '100%',
                                            right: 0
                                        }}>
                                            <div className="profile-tab">
                                                <Tabs defaultValue={TabValue}>
                                                    <Tabs.List>
                                                        <Tabs.Tab onClick={() => {
                                                            Tab.set("tab", "dashboard");
                                                            setTab(Tab);
                                                        }} value="dashboard">
                                                            dashboard
                                                        </Tabs.Tab>
                                                        <Tabs.Tab
                                                            onClick={() => {
                                                                Tab.set("tab", "repository");
                                                                setTab(Tab);
                                                            }}
                                                            value="repository">
                                                            Repository
                                                        </Tabs.Tab>
                                                        <Tabs.Tab
                                                            onClick={() => {
                                                                Tab.set("tab", "star");
                                                                setTab(Tab);
                                                            }}
                                                            value="star">
                                                            Star
                                                        </Tabs.Tab>
                                                        <Tabs.Tab
                                                            onClick={() => {
                                                                Tab.set("tab", "package");
                                                                setTab(Tab);
                                                            }}
                                                            value="package">
                                                            Package
                                                        </Tabs.Tab>
                                                        <Tabs.Tab
                                                            onClick={() => {
                                                                Tab.set("tab", "release");
                                                                setTab(Tab);
                                                            }}
                                                            value="release">
                                                            Release
                                                        </Tabs.Tab>
                                                    </Tabs.List>

                                                    <Tabs.Panel value="dashboard" pt="xs">
                                                        dashboard
                                                    </Tabs.Panel>
                                                    <Tabs.Panel value="repository" pt="xs">
                                                        <RepositoryList model={UserModel}/>
                                                    </Tabs.Panel>
                                                    <Tabs.Panel value="star" pt="xs">
                                                        Star
                                                    </Tabs.Panel>
                                                    <Tabs.Panel value="package" pt="xs">
                                                        Package
                                                    </Tabs.Panel>
                                                    <Tabs.Panel value="release" pt="xs">
                                                        Release
                                                    </Tabs.Panel>
                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </Box>
        </>
    )
}

export default ProfileLayout