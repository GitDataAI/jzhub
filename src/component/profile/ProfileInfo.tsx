import {Avatar} from "@primer/react";
import {UserAPi} from "@/api/action/User.tsx";
import {useUser} from "@/store/useUser.tsx";
import {GraphQLUserModel} from "@/api/graphql/user/Struct.tsx";

export interface ProfileInfoProps{
    ov?: GraphQLUserModel
}


const ProfileInfo = (props: ProfileInfoProps) => {
    console.log(props.ov)
    const user = useUser();
    const user_api = new UserAPi();
    const UploadAvatar = () => {
        const file_btn = document.getElementById('hiddenFileInput');
        file_btn?.click();
    }
    document.getElementById('hiddenFileInput')?.addEventListener('change', function(e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const file = e.target.files[0]; 
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const base64String = event.target.result;
            if (base64String) {
                user_api.PostAvatar(typeof base64String === "string" ? base64String : "").then(res => {
                    console.log(res)
                })
            }
            console.log(base64String);
        };
        reader.readAsDataURL(file);
    });
    return (
        <div className="profile-page-info">
            <div className="profile-header-info">
                <input type="file" id="hiddenFileInput" style={{
                    display: 'none'
                }} accept={"image/*"}/>
                <Avatar src={`${props.ov?.profile?.avatar}`} id={"avatar"} alt="Profile Image"
                        className="profile-image-info"
                        onClick={() => {
                            UploadAvatar()
                        }}/>

                <div className="profile-info-info">
                    <h1>{props.ov?.profile?.username}</h1>
                    <p>{props.ov?.profile?.name}</p>
                    {
                        user.model?.username != props.ov?.profile?.username ? (
                            <button className="follow-button" onClick={() => {
                                if (props.ov?.profile?.username) {
                                    user_api.LocalAddFollow(props.ov?.profile.username).then(res => {
                                        console.log(res)
                                    })
                                }
                            }}>Follow</button>
                        ):<button>Edit profile</button>
                    }
                    <div className="stats">
                        <span>{props.ov?.data?.follow.length} followers · {props.ov?.data?.following.length} following</span>
                    </div>
                    <div className="location-time">
                        <span>{props.ov?.profile?.timezone}</span>
                        <span>{props.ov?.profile?.localtime}</span>
                    </div>
                    <div className="links">
                        {props.ov?.profile?.website?.map((item, index) => (
                            <a key={index} href={item}>{item}</a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="organizations">
                {/* Organizations content */}
            </div>
        </div>
    )
}

export default ProfileInfo