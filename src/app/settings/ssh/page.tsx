'use client'

import {DateTime} from "luxon";
import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {Button, Divider, Input, InputLabel, Textarea} from "@mantine/core";

export interface SshModel {
    uid: string,
    user_uid: string,
    name: string,
    fingerprint: string,
    description: string,
    created_at: DateTime,
    updated_at: DateTime,
}



export default function Page() {
    const [List, setList] = useState<SshModel[]>([])
    const [Edit, setEdit] = useState(false);
    const [Create, setCreate] = useState({
        name: "",
        description: "",
        context: ""
    });
    const Submit = async () => {
        fetch("/api/v1/users/ssh_key", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inner: {
                    name: Create.name,
                    description: Create.description,
                    content: Create.context,
                },
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            })
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data=>{
                            if (data.code === 0) {
                                notifications.show({
                                    title: 'Success',
                                    message: 'Successfully created ssh key',
                                    color: 'green',
                                });
                                setEdit(false)
                                Fetch().then().finally()
                            }else {
                                notifications.show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                            }
                        })
                }
            })
    }
    const Fetch = async () => {
        fetch("/api/v1/users/ssh_key", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data=>{
                            if (data.code === 0) {
                                setList(data.data)
                            }else {
                                notifications.show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                            }
                        })
                }else {
                    notifications.show({
                        title: 'Failed',
                        message: 'Failed to get ssh key list',
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
    }
    useEffect(() => {
        Fetch().then().finally()
    }, []);
    return (
        <div className="ssh">
            <h1>SSH Keys</h1>
            <span>
                SSH keys allow you to establish a secure connection between your computer and GitDataAI. SSH fingerprints verify that the client is connecting to the correct host.
            </span>
            <Divider style={{
                margin: "1rem 0"
            }}/>
            {
                Edit ? (
                    <div className="ssh-edit">
                         <h1>Add an SSH key</h1>
                        <InputLabel style={{
                            display: "grid",
                            marginTop: "1rem"
                        }}>
                            <h2>
                                Ssh public key
                            </h2>
                            <Textarea
                                withAsterisk
                                style={{
                                    minWidth: "320px",
                                    maxWidth: "640px",
                                }}
                                placeholder="Paste your SSH key here"
                                value={Create.context}
                                onChange={(e) => setCreate({...Create, context: e.target.value})}
                            />
                        </InputLabel>
                        <InputLabel style={{
                            display: "grid",
                            marginTop: "1rem"
                        }}>
                            <h2>
                                Ssh name
                            </h2>
                            <Input
                                style={{
                                    minWidth: "320px",
                                    maxWidth: "640px",
                                }}
                                placeholder="Paste your SSH name here"
                                value={Create.name}
                                onChange={(e) => setCreate({...Create, name: e.target.value})}
                            />
                        </InputLabel>
                        <InputLabel style={{
                            display: "grid",
                            marginTop: "1rem"
                        }}>
                            <h2>
                                Ssh description
                            </h2>
                            <Input
                                style={{
                                    minWidth: "320px",
                                    maxWidth: "640px",
                                }}
                                placeholder="Paste your SSH description here"
                                value={Create.description}
                                onChange={(e) => setCreate({...Create, description: e.target.value})}
                            />
                        </InputLabel>

                        <div className="ssh-edit-button">
                            <Button
                                style={{
                                    backgroundColor: "#a5a5a5",
                                }}
                                onClick={() => {
                                    setEdit(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                style={{
                                    marginLeft: "2rem",
                                }}
                                onClick={Submit}>
                                Add SShkey
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="ssh-list">
                        <div className="ssh-list-head">
                            <div>
                            </div>
                            <Button onClick={()=>{
                                setEdit(true)
                            }}>
                                Add SSH Key
                            </Button>
                        </div>
                        <div className="ssh-list-body">
                            {
                                List.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="ssh-list-item" >
                                                <div>
                                                    <h1>{item.name}</h1>
                                                    <span>{item.description}</span>
                                                    <h2>
                                                        {item.fingerprint}
                                                    </h2>
                                                </div>
                                                <Button color="red" className="ssh-list-delete">Delete</Button>
                                            </div>
                                            <Divider/>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}