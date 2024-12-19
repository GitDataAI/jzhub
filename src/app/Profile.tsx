import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";
import {LayoutHeader} from "@/component/layout/Header.tsx";
import ProfileHeader from "@/component/profile/ProfileHeader.tsx";
import {useInfo} from "@/store/useInfo.tsx";
import {UsersApi} from "@/api/action/Users.tsx";
import {UserOv} from "@/api/dto/UsersDto.tsx";
import ProfileInfo from "@/component/profile/ProfileInfo.tsx";
import {UserAPi} from "@/api/action/User.tsx";
import ProfileDashBoard from "@/component/profile/ProfileDashBorad.tsx";
import ProfileRepoList from "@/component/profile/ProfileRepoList.tsx";
import {useUser} from "@/store/useUser.tsx";

const ProfileLayout = () => {
    const { username } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get("tab")
    const info = useInfo();
    const user = useUser();
    const users_api = new UsersApi();
    const [userInfo, setUserInfo] = React.useState<UserOv>()
    const user_api = new UserAPi();
    const [follow, setFollow] = React.useState({
        following: 0,
        follower: 0
    });

    const Local = async () => {
        try {
            if (username === user.model?.username && user.model){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUserInfo({
                    ...user.model,
                    avatar: user.Avatar
                })
                return
            }
            const resp = await users_api.OnceInfo(username!)
            if (resp.status === 200 && resp.data.code === 200){
                setUserInfo(resp.data.data)
            }
        }catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        console.log(tab)
        if (!tab){
            setSearchParams({tab:'dashboard'})
        }
        user_api.LocalFollowers().then((resp)=>{
            if (resp.status === 200 && resp.data.code === 200){
                setFollow({
                    ...follow,
                    following: resp.data.data?.length || 0,
                })
            }
        }).catch()
        user_api.LocalFollowing().then((resp)=>{
            if (resp.status === 200 && resp.data.code === 200){
                setFollow({
                    ...follow,
                    follower: resp.data.data?.length || 0,
                })
            }
        }).catch()
        Local().catch().then()
        console.log(username)
        info.setHref({label:username!,url: `/${username!}?tab=dashboard`})
    },[])
    return(
        <>
            <LayoutHeader/>
            <ProfileHeader username={username!} tab={tab!}/>
            <div className="profile-container">
                <ProfileInfo ov={userInfo!} follow={follow}/>
                {tab === 'dashboard' ? (<>
                    <ProfileDashBoard/>
                </>) : null}
                {tab === 'repo' ? <ProfileRepoList/> : null}
            </div>
        </>
    )
}


export default ProfileLayout