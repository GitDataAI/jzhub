'use client';
import { useState, useEffect } from 'react';
import { Button, Divider, Input, InputLabel, Modal, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DateTime } from 'luxon';
import { useDisclosure } from "@mantine/hooks";

export interface TokenModel {
    uid: string;
    user_uid: string;
    name: string;
    description: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export default function NewAccess() {
    const [List, setList] = useState<TokenModel[]>([]);
    const [Edit, setEdit] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [Create, setCreate] = useState({
        name: "",
        description: "",
    });
    const [GeneratedToken, setGeneratedToken] = useState<string | null>(null);

    const Fetch = async () => {
        try {
            const res = await fetch("/api/v1/users/token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (res.status === 200) {
                const data = await res.json();
                if (data.tokens) {
                    const tokens: TokenModel[] = data.tokens.map((token: { created_at: string; updated_at: string; uid: string; user_uid: string; name: string; description: string }) => ({
                        ...token,
                        created_at: DateTime.fromISO(token.created_at),
                        updated_at: DateTime.fromISO(token.updated_at),
                    }));
                    setList(tokens);
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: data.msg || 'Failed to get token list',
                        color: 'red',
                    });
                }
            } else {
                notifications.show({
                    title: 'Failed',
                    message: 'Failed to get token list',
                    color: 'red',
                });
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred';
            notifications.show({
                title: 'Failed',
                message,
                color: 'red',
            });
        }
    };

    const Submit = async () => {
        try {
            const res = await fetch("/api/v1/users/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Create.name,
                    description: Create.description,
                    expire: 30,
                    access: 1,
                }),
                credentials: "include",
            });
            if (res.status === 200) {
                const data = await res.json();
                if (data.token) {
                    notifications.show({
                        title: 'Success',
                        message: 'Successfully created access token',
                        color: 'green',
                    });

                    setGeneratedToken(data.token.token);
                    open();
                    setEdit(false);
                    await Fetch();
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: data.msg || 'Failed to create token',
                        color: 'red',
                    });
                }
            } else {
                const errorData = await res.json();
                notifications.show({
                    title: 'Failed',
                    message: errorData.msg || 'Failed to create token',
                    color: 'red',
                });
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred';
            notifications.show({
                title: 'Failed',
                message,
                color: 'red',
            });
        }
    };

    const Delete = async (uid: string, name: string) => {
        try {
            const res = await fetch("/api/v1/users/token", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid, name }),
                credentials: "include",
            });
            if (res.status === 200) {
                const data = await res.json();
                if (Object.keys(data).length === 0) {
                    notifications.show({
                        title: 'Success',
                        message: 'Successfully deleted access token',
                        color: 'green',
                    });
                    await Fetch();
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: data.msg || 'Failed to delete token',
                        color: 'red',
                    });
                }
            } else {
                const errorData = await res.json();
                notifications.show({
                    title: 'Failed',
                    message: errorData.msg || 'Failed to delete token',
                    color: 'red',
                });
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred';
            notifications.show({
                title: 'Failed',
                message,
                color: 'red',
            });
        }
    };

    useEffect(() => {
        Fetch().then().finally();
    }, []);

    return (
        <div className="access">
            <Modal opened={opened} onClose={close} withCloseButton={false} size={"lg"}>
                {GeneratedToken && (
                    <div className="generated-token">
                        <h2>Generated Token:</h2>
                        <p>{GeneratedToken}</p>
                    </div>
                )}
            </Modal>
            <h1>Personal Access Tokens</h1>
            <span>
                Personal access tokens allow you to authenticate with GitDataAI APIs and use Git over HTTPS.
            </span>
            <Divider style={{ margin: "1rem 0" }} />
            {Edit ? (
                <div className="access-edit">
                    <h1>Add new Access Token</h1>
                    <InputLabel style={{ display: "grid", marginTop: "1rem" }}>
                        <h2>Token name</h2>
                        <Input
                            style={{ minWidth: "220px", maxWidth: "340px" }}
                            placeholder="Enter token name"
                            value={Create.name}
                            onChange={(e) => setCreate({ ...Create, name: e.target.value })}
                        />
                    </InputLabel>

                    <InputLabel style={{ display: "grid", marginTop: "1rem" }}>
                        <h2>Description</h2>
                        <Textarea
                            style={{ minWidth: "320px", maxWidth: "640px" }}
                            placeholder="Enter description"
                            value={Create.description}
                            onChange={(e) => setCreate({ ...Create, description: e.target.value })}
                            rows={4}
                        />
                    </InputLabel>

                    <div className="access-edit-button">
                        <Button
                            style={{ backgroundColor: "#a5a5a5" }}
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ marginLeft: "2rem" }}
                            onClick={Submit}
                        >
                            Generate Token
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="access-list">
                    <div className="access-list-head">
                        <div></div>
                        <Button onClick={() => setEdit(true)}>Add Access Token</Button>
                    </div>
                    <div className="access-list-body">
                        {List.map((item, index) => (
                            <div key={index}>
                                <div className="access-list-item">
                                    <div>
                                        <h1>{item.name}</h1>
                                        <span>{item.description}</span>
                                        <h2>Created at: {item.created_at.toLocaleString()}</h2>
                                    </div>
                                    <Button
                                        color="red"
                                        className="access-list-delete"
                                        onClick={() => Delete(item.uid, item.name)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <Divider />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
