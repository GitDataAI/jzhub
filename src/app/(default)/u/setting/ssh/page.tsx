'use client'

import {SSHKeyCreateParma, SSHKeyModel} from "@/server/types";
import {useEffect, useState} from "react";
import {UserApi} from "@/server/UserApi";
import {AppWrite} from "@/server/Client";
import {notifications} from "@mantine/notifications";
import {Button, Divider, Input, InputLabel, Textarea} from "@mantine/core";

export default function SettingSSh() {
    const api = new UserApi();
    const [SshList, setSShList] = useState<SSHKeyModel[]>([]);
    const [Edit, setEdit] = useState(true);
    const [Param, setParam] = useState<SSHKeyCreateParma>({
        name: "",
        description: "",
        public_key: "",
    })
    const Fetch = async () => {
        try {
            const response = await api.SSHList();
            if (response.status === 200 && response.data) {
                const json: AppWrite<SSHKeyModel[]> = JSON.parse(response.data);
                if (json.code === 200 && json.data) {
                    setSShList(json.data);
                }
            }else {
                notifications
                    .show({
                        title: 'Error',
                        message: "NetWork Error"
                    });
            }
        }catch (e) {
            notifications
                .show({
                    title: 'Error',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    message: e.toString()
                });
        }
    }
    const Submit = async () => {
        if (Param.name === "" || Param.public_key === "" || Param.name.length < 3) {
            notifications
                .show({
                    title: 'Error',
                    message: "Please fill in all fields"
                });
            return;
        }
        try {
            const response = await api.SSHCreate(Param);
            if (response.status === 200 && response.data) {
                const json: AppWrite<string> = JSON.parse(response.data);
                if (json.code === 200 ) {
                    notifications
                        .show({
                            title: 'Success',
                            message: "Add SSH Key Success"
                        });
                    setEdit(false);
                    Fetch().then().catch();
                }else{
                    notifications
                        .show({
                            title: 'Error',
                            message: json.msg
                        });
                }
            }
        }catch (e) {
            notifications
                .show({
                    title: 'Error',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    message: e.toString()
                });
        }
    }
    useEffect(() => {
        Fetch().then().catch();
    }, []);
    return(
        <div className="setting-ssh">
            {
                !Edit && (
                    <>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <h1>
                                SSH Key
                            </h1>
                            <Button onClick={()=>{
                                setEdit(true);
                            }}>
                                Add SSH Key
                            </Button>
                        </div>
                        <Divider/>
                        <span style={{
                            marginTop: "1rem"
                        }}>
                            This is a list of SSH keys associated with your account.
                            Remove any keys that you do not recognize.
                        </span>
                        <fieldset style={{
                            border: "none"
                        }} title="Authentication keys">
                            <b>
                                Authentication keys
                            </b>
                            <div style={{
                                border: "1px #d6d6d6 solid",
                                padding: "0 1rem",
                                width: "100%",
                                borderRadius: 5
                            }}>
                                {
                                    SshList.map((item) => {
                                        return (
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                alignItems: "center"
                                            }}  key={item.uid}>
                                                <div>
                                                    <h2 style={{
                                                        margin:  "1rem 0",
                                                    }}>{item.name}</h2>
                                                    <a style={{
                                                        color: "grey"
                                                    }}>{item.description}</a>
                                                    <p>Created <a style={{
                                                        color: "grey"
                                                    }}>
                                                        {item.created_at.toString().split(".")[0]}
                                                    </a></p>
                                                    <p>Last use {item.updated_at === item.created_at ? <a style={{
                                                        color: "red"
                                                    }}>
                                                        Never
                                                    </a> : item.updated_at.toString()}</p>
                                                </div>
                                                <Button
                                                    style={{
                                                        backgroundColor: "red"
                                                    }}
                                                    onClick={()=>{
                                                        api
                                                            .SSHDelete(item.uid)
                                                            .then((res)=>{
                                                                if (res.status === 200) {
                                                                    notifications
                                                                        .show({
                                                                            title: 'Success',
                                                                            message: "Delete SSH Key Success"
                                                                        });
                                                                }else {
                                                                    notifications
                                                                        .show({
                                                                            title: 'Error',
                                                                            message: "Delete SSH Key Failed"
                                                                        });
                                                                }
                                                                Fetch().then().catch();
                                                            })
                                                    }}

                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </fieldset>
                    </>
                )
            }
            {
                Edit && (
                    <>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <h1>
                                Add new SSH Key
                            </h1>
                        </div>
                        <Divider/>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem"

                        }}>
                            <InputLabel style={{
                                maxWidth: "60%"
                            }}>
                                <b>Title<a style={{color: "red"}}>*</a></b>
                                <Input placeholder="lenght last 3" onChange={(x)=>{
                                    setParam((prev)=>{
                                        return {
                                            ...prev,
                                            name: x.target.value
                                        }
                                    })
                                }}/>
                            </InputLabel>
                            <InputLabel>
                                <b>Description(optional)</b>
                                <Input onChange={(x)=>{
                                    setParam((prev)=>{
                                        return {
                                            ...prev,
                                            description: x.target.value
                                        }
                                    })
                                }}/>
                            </InputLabel>
                            <InputLabel>
                                <b>Key<a style={{color: "red"}}>*</a></b>
                                <Textarea
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(x)=>{
                                        setParam((prev)=>{
                                            return {
                                                ...prev,
                                                public_key: x.target.value
                                            }
                                        })
                                    }}
                                    placeholder="Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'"/>
                            </InputLabel>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "2rem"
                            }}>
                                <Button onClick={Submit} style={{
                                    minWidth: "100px",
                                    width: "15%"
                                }}>
                                    Add SSH key
                                </Button>
                                <Button onClick={()=>{
                                    setEdit(false)
                                }} color="gray" style={{
                                    minWidth: "100px",
                                    width: "15%"
                                }}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}