import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {LayoutHeader} from "@/component/layout/Header.tsx";
import ProfileHeader from "@/component/profile/ProfileHeader.tsx";
import {useInfo} from "@/store/useInfo.tsx";
import ProfileInfo from "@/component/profile/ProfileInfo.tsx";
import ProfileDashBoard from "@/component/profile/ProfileDashBorad.tsx";
import ProfileRepoList from "@/component/profile/ProfileRepoList.tsx";
import {useUser} from "@/store/useUser.tsx";

const ProfileLayout = () => {
    const { username } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get("tab")
    const info = useInfo();
    const user = useUser();


    useEffect(()=>{
        console.log(tab)
        if (!tab){
            setSearchParams({tab:'dashboard'})
        }
        console.log(username)
        info.setHref({label:username!,url: `/${username!}?tab=dashboard`})
    },[])
    return(
        <>
            <LayoutHeader/>
            <ProfileHeader username={username!} tab={tab!}/>
            <div className="profile-container">
                <ProfileInfo ov={user.user!}/>
                {tab === 'dashboard' ? (<>
                    <ProfileDashBoard/>
                </>) : null}
                {tab === 'repo' ? <ProfileRepoList/> : null}
            </div>
        </>
    )
}


export default ProfileLayout