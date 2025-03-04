import {RepoApi} from "@/server/RepoApi";
import {useEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {RepoAccess} from "@/server/types";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Input, InputLabel,
    Radio,
    RadioGroup,
    Select
} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {useRouter} from "next/navigation";


export const CreateRepo = () => {
    const repo_api = new RepoApi();
    const [Access, setAccess] = useState<RepoAccess[]>([]);
    const [loading, setloading] = useState(false);
    const Init = async () => {
        const res = await repo_api.Access();
        if (res.status !== 200 || !res.data){
            notifications.show({
                message: "数据请求失败"
            })
            return;
        }
        const json: AppWrite<RepoAccess[]> = JSON.parse(res.data);
        if (json.code !== 200 || !json.data){
            notifications.show({
                message: "数据请求失败"
            })
            return;
        }
        setAccess(json.data);
        setloading(true);

    }
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            owner: "",
            name: "",
            description: "",
            visibility: true,
            auto_init: true,
            readme: true,
            default_branch: "main",
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

    useEffect(() => {
        Init();
    }, []);
    const nav = useRouter().replace;

    if (!loading) {
        return (
            <>
                Loading
            </>
        )
    }else {
        return (
            <>
                <h1 className="flex flex-col gap-1">Create Repository</h1>
                <Form
                    onSubmit={(x)=>{
                        form.validate();
                        if (form.isValid()){
                            const owner = form.getValues().owner;
                            if (owner){
                                const new_access = Access.find((item) => {
                                    return item.owner_uid === owner;
                                });
                                if (new_access){
                                    if (new_access.repos.includes(form.getValues().name)){
                                        form.setFieldValue("name", "");
                                        notifications.show({
                                            message: "Repository name already exists",
                                            color:"red",
                                       })
                                        return
                                    }else {
                                        repo_api
                                            .CreateRepo(
                                                form.getValues().name,
                                                form.getValues().description,
                                                form.getValues().visibility,
                                                form.getValues().auto_init,
                                                form.getValues().readme,
                                                form.getValues().default_branch,
                                                form.getValues().owner,
                                            )
                                            .then(res=>{
                                                if (res.status === 200 && res.data){
                                                    const json: AppWrite<string> = JSON.parse(res.data);
                                                    if (json.code === 200 && json.data){
                                                        notifications.show({
                                                            message: "Repository created, Redirecting...",
                                                            color: "green",
                                                        });
                                                        setTimeout(()=>{
                                                            nav(`/r/${new_access.name}/${form.getValues().name}`)
                                                        }, 1000)
                                                    }else {
                                                        notifications.show({
                                                            message: "Repository created failed",
                                                            color: "red",
                                                        });
                                                    }
                                                }else {
                                                    notifications.show({
                                                        title: "Repository created failed",
                                                        message: "Repository created failed",
                                                        color: "red",
                                                    });
                                                }
                                            })
                                    }
                                }
                            }

                            console.log(x)
                            console.log(form.getValues())
                        }
                    }}
                    id="LayoutModelRepository" form={form}                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "100%",
                        }}
                    >
                        <Select
                            name={"owner"}
                            label="Owner"
                            title="Select Owner"
                            data={
                                Access.map((item) => {
                                    return {
                                        value: item.owner_uid,
                                        label: item.name
                                    }
                                })
                            }
                            onChange={(value) => {
                                if (value) {
                                    const new_access = Access.find((item) => {
                                        return item.owner_uid === value;
                                    });
                                    if (new_access) {
                                        form.setFieldValue("owner", new_access.owner_uid);
                                    }
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
                                    const name = form.getValues().name;
                                    const owner = form.getValues().owner;
                                    if (name && owner) {
                                        const new_access = Access.find((item) => {
                                            return item.owner_uid === owner;
                                        });
                                        if (new_access) {
                                            if (new_access.repos.includes(name)) {
                                                form.setFieldValue("name", "");
                                                notifications.show({
                                                    message: "Repository name already exists",
                                                    color:"red",
                                                })
                                                document.getElementById("name")?.focus();
                                            }
                                        }
                                    }
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
                            name="visibility"
                            color="success"
                            label="Select the visibility of the repository"
                            withAsterisk
                            onChange={(value) => {
                                form.setFieldValue("visibility", value === "Public");
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
                                onChange={(e) => {
                                    form.setFieldValue("default_branch", e.target.value);
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
                        <Button color="primary" variant="flat" type="reset">
                            Reset
                        </Button>
                        <Button color="green" type="submit" >
                            Create
                        </Button>
                    </div>
                </Form>
            </>
        )
    }
}