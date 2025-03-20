'use client'

import {Avatar, Button, Indicator, Input} from "@mantine/core";
import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {useOs} from "@mantine/hooks";

export interface ProfileProps {
    description?: string,
    website: string[],
    language?: string,
    location?: string,
    timezone?: string,
    uid: string,
    avatar?: string,
    theme: string,
}

export default function ProfilePage() {
    const [Profile, setProfile] = useState<ProfileProps>();
    useEffect(() => {
        fetch("/api/v1/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                res.json()
                    .then(data=>{
                        if (data.code === 0) {
                            setProfile(data.data)
                        }else {
                            notifications.show({
                                title: 'Failed',
                                message: data.msg,
                                color: 'red',
                            });
                        }
                    }).catch(e=>{
                        notifications.show({
                            title: 'Failed',
                            message: e.message,
                            color: 'red',
                        });
                })
            })
            .catch(e=>{
                notifications.show({
                    title: 'Failed',
                    message: e.message,
                    color: 'red',
                });
            })

    },[])
    const os = useOs();
    const Submit = async () => {
        if (Profile) {
            fetch("/api/v1/users/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inner: {
                        description: Profile.description,
                        website: Profile.website,
                        language: Profile.language,
                        location: Profile.location,
                        timezone: Profile.timezone,
                        theme: Profile.theme,
                    },
                    unix: parseInt(String(new Date().getTime() / 1000)),
                    device: os.toString(),
                })
            })
                .then(res => {
                    res.json()
                        .then(data=>{
                            if (data.code === 0) {
                                notifications.show({
                                    title: 'Success',
                                    message: data.msg,
                                    color: 'green',
                                });
                            }else {
                                notifications.show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                            }
                    })
                        .catch(e=>{
                            notifications.show({
                                title: 'Failed',
                                message: e.message,
                                color: 'red',
                            });
                        })
                })
                    .catch(e=>{
                        notifications.show({
                            title: 'Failed',
                            message: e.message,
                            color: 'red',
                        });
                    })
        }
    }
    return (
        <div className="profile">
            {
                Profile && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar-upload"
                            onChange={(e)=>{
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const  form = new FormData();
                                    form.append("file", file);
                                    const xhr = new XMLHttpRequest();
                                    xhr.open("post", "/api/v1/static/upload_avatar", true);
                                    xhr.onload = function () {
                                        console.log(xhr.status)
                                        notifications
                                            .show({
                                                title: "Upload Success",
                                                message: "Upload Success",
                                                icon: <i className="iconfont icon-success"></i>,
                                                color: "green",
                                            });
                                        setTimeout(()=>{
                                            window.location.reload();
                                        }, 1000)
                                    }
                                    xhr.onerror =  function () {
                                        notifications
                                            .show({
                                                title: "Upload Failed",
                                                message: "Upload Failed",
                                                icon: <i className="iconfont icon-error"></i>,
                                                color: "red",
                                            });
                                    };
                                    xhr.send(form);
                                }
                            }}
                            style={{
                                display: 'none',
                            }}
                        />
                        <section>
                            <h1>Avatar</h1>
                            <Indicator
                                color="#ffffff"
                                className={"avatar"}
                                position={"bottom-start"}
                                offset={20}
                                label={
                                <Button onClick={()=>{
                                    const query = document.getElementById("avatar-upload");
                                    if (query) {
                                        query.click();
                                    }
                                }}>
                                    <span>
                                        Upload
                                    </span>
                                </Button>
                            }>
                                <Avatar style={{
                                    width: "max(300px, 10rem)",
                                    height: "max(300px, 10rem)",
                                }} src={Profile.avatar || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png" }/>
                            </Indicator>
                        </section>
                        <hr/>
                        <section>
                            <h1>Timezone</h1>
                            <span>
                                Setting You TimeZone
                            </span>
                            <Input value={Profile.timezone || ""} onChange={(e)=>{
                                setProfile({
                                    ...Profile,
                                    timezone: e.target.value
                                })
                            }}/>
                        </section>
                        <hr/>
                        <section>
                            <h1>Main</h1>
                            <span>
                                Setting Your Main
                            </span>
                            <div className="main">
                                <section>
                                    <h3>Users Uid</h3>
                                    <Input value={Profile?.uid} disabled />
                                </section>
                                <section>
                                    <h3>Description</h3>
                                    <Input value={Profile.description || ""} onChange={(e)=>{
                                        setProfile({
                                            ...Profile,
                                            description: e.target.value
                                        })
                                    }}/>
                                </section>
                                <section>
                                    <h3>Website</h3>
                                    <Input value={Profile.website.join(",") || ""} onChange={(e)=>{
                                        setProfile({
                                            ...Profile,
                                            website: e.target.value.split(",")
                                        })
                                    }}/>
                                    <span>
                                        <span style={{
                                            fontSize: "0.8rem",
                                            color: "#999999",
                                        }}>
                                            Separate with comma
                                        </span>
                                    </span>
                                </section>
                                <section>
                                    <h3>Language</h3>
                                    <Input value={Profile.language || ""} onChange={(e)=>{
                                        setProfile({
                                            ...Profile,
                                            language: e.target.value
                                        })
                                    }}/>
                                </section>
                                <section>
                                    <h3>Location</h3>
                                    <Input value={Profile.location || ""} onChange={(e)=>{
                                        setProfile({
                                            ...Profile,
                                            location: e.target.value
                                        })
                                    }}/>
                                </section>
                            </div>
                        </section>
                        <hr/>

                        <section className="save">
                            <Button onClick={()=>{
                                if (Profile) {
                                    Submit();
                                }
                            }}>
                                <span>Save</span>
                            </Button>
                        </section>
                    </>
                )
            }
        </div>
    )
}