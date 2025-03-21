import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Input,
    InputLabel,
    NativeSelect,
    Radio,
    RadioGroup,
    Select
} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {useRouter} from "next/navigation";


export const CreateRepo = () => {
    const [Access, setAccess] = useState<{
        uid: string,
        username: string,
        avatar: string,
        owner: boolean,
        group: boolean,
        list: {
            id: string,
            name: string
        }[]
    }[]>([]);
    const Init = async () => {
        const FetchAccess = async () => {
            const res = await fetch("/api/v1/repo/access", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status !== 200) {
                notifications.show({
                    title: "Failed",
                    message: "Failed to fetch access",
                    color: "red",
                });
                return;
            }
            const data = await res.json();
            if (data.code === 0) {
                setAccess(data.data);
                const owner:{
                    uid: string,
                    username: string,
                    avatar: string,
                    owner: boolean,
                    group: boolean,
                    list: {
                        id: string,
                        name: string
                    }[]
                } = data.data.find((item:{
                    uid: string,
                    username: string,
                    avatar: string,
                    owner: boolean,
                    group: boolean,
                    list: {
                        id: string,
                        name: string
                    }[]
                }) => item.owner);
                if (owner) {
                    form.setFieldValue("owner", owner.uid);
                }
            } else {
                notifications.show({
                    title: "Failed",
                    message: (data as { code: number, msg: string }).msg,
                    color: "red",
                });
            }
        }
        await FetchAccess();
    }
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            owner: Access.find((item) => item.owner)?.uid || "",
            name: "",
            description: "",
            is_private: false,
            auto_init: true,
            readme: true,
            default_branch: "main",
            topic: [],
            type: "Data",
        },
        validate: {
            owner: (value) => {
                if (!value) {
                    return "Owner is required";
                }
                return null;
            },
            name: (value) => {
                if (!value) {
                    return "Name is required";
                }
                if (value.length > 100) {
                    return "Name is too long";
                }
                if (value.includes("/")) {
                    return "Name is invalid";
                }
                if (value.includes(" ")) {
                    return "Name is invalid";
                }
                if (value.includes(".")) {
                    return "Name is invalid";
                }
                const owner = form.getValues().owner;
                if (owner) {
                    const new_access = Access.find((item) => {
                        return item.uid === owner;
                    });
                    if (new_access) {
                        if (new_access.list.find((item) => {
                            return item.name === value;
                        })) {
                            return "Name is already exist";
                        }
                    }
                } else {
                    return "Please select owner"
                }
                return null;
            },
            description: (value) => {
                if (!value) {
                    return "Description is required";
                }
                return null;
            },
        }
    });
    const nav = useRouter().replace;
    const Submit = async () => {
        form.validate();
        if (form.isValid()) {
            const owner = form.getValues().owner;
            if (owner) {
                const new_access = Access.find((item) => {
                    return item.uid === owner;
                });
                if (new_access) {
                    if (new_access.list.find((item) => {
                        return item.name === form.getValues().name;
                    })) {
                        notifications.show({
                            title: "Failed",
                            message: "Name is already exist",
                            color: "red",
                        });
                        return;
                    }
                    const payload = {
                        owner_name: new_access.username,
                        owner_uid: new_access.uid,
                        repo_name: form.getValues().name,
                        description: form.getValues().description,
                        is_private: form.getValues().is_private,
                        readme: form.getValues().auto_init,
                        default_branch: form.getValues().default_branch,
                        topic: form.getValues().topic,
                        rtype: form.getValues().type,
                        node: "00000000-0000-0000-0000-000000000000"
                    }
                    console.log(payload)
                    fetch("/api/v1/repo/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            inner: payload,
                            unix: parseInt(String(new Date().getTime() / 1000)),
                            device: "N/A",
                        }),
                    })
                        .then(res => {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    if (data.code === 200) {
                                        notifications.show({
                                            title: "Success",
                                            message: "Repository created",
                                            color: "green",
                                        });
                                        setTimeout(()=>{
                                            nav("/" + new_access.username + "/" + form.getValues().name)
                                        },2000)
                                    } else {
                                        notifications.show({
                                            title: "Failed",
                                            message: data.msg,
                                            color: "red",
                                        })
                                    }
                                })
                            } else {
                                notifications.show({
                                    title: "Failed",
                                    message: "Failed to create repository",
                                    color: "red",
                                });
                            }
                        });
                }
            }
        } else {
            if (form.getValues().name === "") {
                notifications.show({
                    title: "Failed",
                    message: "Name is required",
                    color: "red",
                });
                return;
            }
            if (form.getValues().description === "") {
                notifications.show({
                    title: "Failed",
                    message: "Description is required",
                    color: "red",
                });
                return;
            }
            if (form.getValues().owner === "") {
                notifications.show({
                    title: "Failed",
                    message: "Owner is required",
                    color: "red",
                });
                return;
            }
            const owner = form.getValues().owner;
            if (owner) {
                const new_access = Access.find((item) => {
                    return item.uid === owner;
                });
                if (new_access) {
                    if (new_access.list.find((item) => {
                        return item.name === form.getValues().name;
                    })) {
                        notifications.show({
                            title: "Failed",
                            message: "Repository Name is already exist",
                            color: "red",
                        });
                    }
                }
            }
        }
    }

    useEffect(() => {
        Init();
    }, []);
    return (
        <div className="create-repo">
            <h1>Create Repository</h1>
            <Form
                id="LayoutModelRepository" form={form}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "100%",
                    }}
                >
                    <NativeSelect
                        name={"owner"}
                        label="Owner"
                        title="Select Owner"
                        data={Access.map((item) => {
                            return {
                                value: item.uid,
                                label: item.group ? "[Group] " + item.username : item.owner ? "[Self] " + item.username : item.username,
                            };
                        })}
                        onChange={(value) => {
                            if (value) {
                                form.setFieldValue("owner", value.target.value);
                            }
                        }}
                    />
                    <InputLabel>
                        Repository Name
                        <Input
                            name="name"
                            placeholder="Enter repository name"
                            type="tel"
                            id={"name"}
                            onChange={(e) => {
                                form.setFieldValue("name", e.target.value);
                            }}
                            onBlur={() => {
                                form.validate();
                            }}

                        />
                    </InputLabel>

                    <InputLabel>
                        Description(optional)
                        <Input
                            name="description"
                            placeholder="Enter repository descrition"
                            type="tel"
                            onChange={(e) => {
                                form.setFieldValue("description", e.target.value);
                            }}
                        />
                    </InputLabel>
                    <Divider/>
                    <RadioGroup
                        name="is_private"
                        color="success"
                        label="Select the visibility of the repository"
                        withAsterisk
                        defaultValue="Public"
                        onChange={(value) => {
                            form.setFieldValue("is_private", value === "Private");
                        }}
                    >
                        <Radio
                            description="Anyone on the internet can see this repository. You choose who can commit."
                            value="Public"
                            label="Public"/>
                        <Radio
                            description="You choose who can see and commit to this repository."
                            value="Private"
                            label="Private"/>
                    </RadioGroup>
                    <Divider/>
                    <CheckboxGroup
                        color="success"
                        label="Initialize this repository with"
                        onChange={(value) => {
                            form.setFieldValue("auto_init", value[0] === "true");
                        }}
                    >
                        <Checkbox value="true" label="Add a README file">
                        </Checkbox>
                    </CheckboxGroup>
                    <Divider/>

                    <InputLabel>
                        Default Branch
                        <Input
                            name="default_branch"
                            placeholder="Enter default branch"
                            type="tel"
                            defaultValue="main"
                            onChange={(e) => {
                                form.setFieldValue("default_branch", e.target.value);
                            }}
                        />
                    </InputLabel>
                    <Divider/>
                    <InputLabel>
                        <Select
                            name="type"
                            label="Type"
                            title="Select Type"
                            defaultValue="Data"
                            data={[
                                {
                                    value: "Code",
                                    label: "Code",
                                },
                                {
                                    value: "Data",
                                    label: "Data",
                                },
                                {
                                    value: "Model",
                                    label: "Model",
                                },
                                {
                                    value: "Other",
                                    label: "Other",
                                },
                            ]}
                            onChange={(value) => {
                                if (value) {
                                    form.setFieldValue("type", value);
                                }
                            }}
                            onBlur={() => {
                                form.validate();
                            }}
                        />

                    </InputLabel>
                </div>
                <div style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                    marginTop: "1rem"
                }}>
                    <Button style={{
                        backgroundColor: "#f04e02",
                    }} type="button" onClick={Submit}>
                        <span style={{
                            color: "white"
                        }}>
                            Create Repository
                        </span>
                    </Button>
                </div>
            </Form>
        </div>
    )
}