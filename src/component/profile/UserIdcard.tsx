import {SessionModel, UserFollowCount, UsersUpdateOption} from "../../lib/model/UserModel.tsx";
import {Button, Fieldset, Modal, Select, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import useUser from "../../store/useUser.tsx";
import {UserApi} from "../../lib/api/UserApi.tsx";
import {toast} from "@pheralb/toast";
import {UsersApi} from "../../lib/api/UsersApi.tsx";

export interface UserIdcardProps {
    model: SessionModel,
}



const UserIdcard = (props: UserIdcardProps) => {
    const user = useUser();
    const users_api = new UsersApi();
    const user_api = new UserApi();
    const [IsMe, setIsMe] = useState(false);
    const [Edit, setEdit] = useState(false);
    const [ModelLoading, setModelLoading] = useState({
        b: false,
        text: "Save"
    })
    const [FollowCount, setFollowCount] = useState<UserFollowCount>({
        follower: 0,
        following: 0
    })
    const [OptionUpdate, setOptionUpdate] = useState<UsersUpdateOption>(
        {
                name: props.model.name,
                bio: props.model.bio,
                pronouns: props.model.pronouns,
                company: props.model.company,
                location: props.model.location,
                localtime: props.model.localtime,
                i18n: props.model.i18n,
                website: props.model.website,
                orcid: props.model.orcid,
                social: props.model.social,
        }
    );
    const UpdateOptionCommit = () => {
        if (ModelLoading.b) return;
        setModelLoading({
            b: true,
            text: "Saving..."
        })
        user_api.UpdateOption(OptionUpdate).then((res)=>{
           if (res.data.code === 200){
               setModelLoading({
                   b: false,
                   text: "Ok"
               })
               toast.success({
                   text: "Save Success"
               });
               setEdit(false)
               user.init().then(()=>{
                   props.model = user.user!;
               }).catch();
               window.location.reload();
           }else {
               toast.error({
                   text: "Save Failed"
               });
               user.init().then(()=>{
                   props.model = user.user!;
               }).catch();
           }
        })
    }
    useEffect(()=>{
       if (user.user){
           setIsMe(user.user.uid === props.model.uid);
           users_api.FollowCount(props.model.username).then((res)=>{
               if (res.data.code === 200){
                   setFollowCount(res.data.data!)
               }
           })
       } else {
           setIsMe(false);
       }
    },[])
    const UploadAvatar = () => {
        document.getElementById("avatar-upload")!.click();

    }
    return(
        <div className="profile-idcard">
            <Modal
                opened={Edit}
                onClose={() => {
                    setEdit(false)
                    setModelLoading({
                        b: false,
                        text: "Save"
                    })
                }}
                withCloseButton={false}
                title="Edit">
                <Fieldset variant="unstyled">
                    <TextInput label="Name" onChange={(x)=>{
                        setOptionUpdate({
                            ...OptionUpdate,
                            name: x.target.value
                        })
                    }} placeholder="Your name" defaultValue={props.model.name}/>
                    <TextInput onChange={(x)=>{
                        setOptionUpdate({
                            ...OptionUpdate,
                            bio: x.target.value
                        })
                    }} label="Bio" placeholder="Bio" mt="md" defaultValue={props.model.bio}/>
                    <Select
                        onChange={(x)=>{
                            if (x) {
                                setOptionUpdate({
                                    ...OptionUpdate,
                                    pronouns: x
                                })
                            }
                        }}
                        label="pronouns" placeholder="pronouns" mt="md" data={[
                        'he/his', 'she/her', 'they/them', 'ze/zir', 'other'
                    ]} defaultValue={props.model.pronouns}/>
                    <TextInput onChange={(x)=>{
                        setOptionUpdate({
                            ...OptionUpdate,
                            company: x.target.value
                        })
                    }} label="Company" placeholder="Company" mt="md" defaultValue={props.model.company}/>
                    <TextInput onChange={(x)=>{
                        setOptionUpdate({
                            ...OptionUpdate,
                            location: x.target.value
                        })
                    }} label="Location" placeholder="Location" mt="md" defaultValue={props.model.location}/>
                    <TextInput onChange={(x)=>{
                        setOptionUpdate({
                            ...OptionUpdate,
                            localtime: x.target.value
                        })
                    }} label="ORCID" placeholder="ORCID" mt="md" defaultValue={props.model.orcid}/>
                    <Select onChange={(x)=>{
                        if (x) {
                            setOptionUpdate({
                                ...OptionUpdate,
                                theme: x
                            })
                        }
                    }} label="Theme" defaultValue={props.model.theme} data={[
                        'light', 'dark', 'system'
                    ]}/>
                </Fieldset>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem"
                }}>
                    <Button onClick={()=>{
                        UpdateOptionCommit();
                    }}>
                        {ModelLoading.text}
                    </Button>
                    <Button
                        style={{
                            marginLeft: "2rem"
                        }}
                        onClick={()=>{
                            setEdit(false)
                            setOptionUpdate({
                                name: props.model.name,
                                bio: props.model.bio,
                                pronouns: props.model.pronouns,
                                company: props.model.company,
                                location: props.model.location,
                                localtime: props.model.localtime,
                                i18n: props.model.i18n,
                                website: props.model.website,
                                orcid: props.model.orcid,
                                social: props.model.social,
                            })
                        }}>
                        Cancel
                    </Button>
                </div>
            </Modal>
            <div style={{
                display: "flex"
            }}>
                <div className="profile-idcard-avatar">
                    <img onClick={()=>UploadAvatar()} src={props.model.avatar_url} alt="avatar"/>
                    <input onChange={(x)=>{
                        if (x.target.files) {
                            user_api.UploadAvatar(x.target.files[0]).then(res=>{
                                if (res.data.code === 200) {
                                    toast.success({
                                        text: "Upload avatar success",
                                    })
                                    user.init().then().catch(()=>{});
                                    window.location.reload();
                                }
                            });
                        }
                    }} type="file" id="avatar-upload" style={{
                        display: "none"
                    }}/>
                </div>
                <div className="profile-idcard-name">
                    <h1>{props.model.name}</h1>
                    <h4>{props.model.username}</h4>
                    <a>{props.model.bio}</a>
                </div>
            </div>
            <div className="profile-idcard-follow">
                <a>
                    Followers: {FollowCount.follower}
                </a>
                <a>
                    Following: {FollowCount.following}
                </a>
            </div>
            <div className="profile-idcard-btn">
                {
                    IsMe ?
                        <Button
                            onClick={() => {
                                setEdit(true)
                            }}
                        >
                            Edit
                        </Button>
                        :
                        <Button>
                            Follow
                        </Button>
                }
            </div>
            <div className="profile-idcard-info">
                <ul className={"profile-idcard-info-item"}>
                    {
                        props.model.location ? <li>Location: {props.model.location}</li> : null
                    }
                    {
                        props.model.localtime ? <li>LocalTime: {props.model.localtime}</li> : null
                    }
                    {
                        props.model.company ? <li>Company: {props.model.company}</li> : null
                    }
                    {
                        props.model.i18n ? <li>Language: {props.model.i18n}</li> : null
                    }
                    {
                        props.model.website ? props.model.website.map((item, index)=>{
                            return <li key={'website'+index}>Website: {item}</li>
                        }): null
                    }
                    {
                        props.model.pronouns ? <li>Pronouns: {props.model.pronouns}</li> : null
                    }
                    {
                        props.model.orcid ? <li>ORCID: {props.model.orcid}</li> : null
                    }
                    {
                        props.model.social ?props.model.social.map((item, index)=>{
                            return <li key={'social'+index}>Social: {item}</li>
                        }) : null
                    }
                </ul>
            </div>


        </div>
    )
}

export default UserIdcard