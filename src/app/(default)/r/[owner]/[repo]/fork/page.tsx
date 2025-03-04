'use client'

import {RepoApi} from "@/server/RepoApi";
import {useEffect, useState} from "react";
import {RepoAccess} from "@/server/types";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {Form, useForm} from "@mantine/form";
import {Box, Button, Divider, Input, InputLabel, LoadingOverlay, Radio, RadioGroup, Select} from "@mantine/core";
import usePageContext from "@/store/usePageContext";
import {useRouter} from "next/navigation";

export default function Fork(){
    const [Parma,setParma] = useState<{ owner: string, repo: string } | undefined>();

    const repo_api = new RepoApi();
    const [Access, setAccess] = useState<RepoAccess[]>([]);
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
    }
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            owner: '',
            name: '',
            description: '',
            visibility: true,
        },
        validate: {
            owner: (value) => {
                if (!value) {
                    return "Owner is required";
                }
                if (value.length === 0){
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
            },
        }
    });
    const context = usePageContext();

    useEffect(() => {
        if (context.repoCtx){
            const {owner, repoName} = context.repoCtx;
            setParma({owner,repo: repoName})
        }
    }, []);
    const [Loading, setLoading] = useState(false);
    const [Forking, setForking] = useState(false);
    const nav = useRouter().replace;

    const onSubmit = () => {
        if (Loading) return;
        setLoading(true);
        form.validate();
        const values = form.getValues();
        if (!form.isValid()){
            notifications
                .show({
                    message: "Please fill in all required fields",
                    color: "red",
                })
            setLoading(false)
            return;
        }
        const owner = Parma?.owner;
        const repo = Parma?.repo;
        const owner_uid = values.owner;
        const name = values.name;
        const prv = values.visibility;
        const description = values.description;
        const owner_name = Access.find((item) => (item.owner_uid === owner_uid))?.name;
        if (!owner || !repo || !owner_uid || !name || !prv || !owner_name) {
            notifications
                .show({
                    message: "Please fill in all required fields",
                    color: "red",
                })
            setLoading(false)
            return;
        }
        if (owner === owner_uid){
            notifications
                .show({
                    message: "Owner is same as current user",
                    color: "red",
                })
            setLoading(false)
            return;
        }
        if (Access.find((item) => (item.owner_uid === owner_uid && item.repos.includes(name)))) {
            form.setFieldError("name", "Repository name already exists");
            setLoading(false)
            return;
        }

        setForking(true);
        repo_api.Fork(
            owner,
            repo,
            owner_uid,
            name,
            prv,
            description
        ).then((res) => {
            if (res.status !== 200 || !res.data){
                notifications.show({
                    message: "数据请求失败"
                })
                setForking(false)
                setLoading(false)
                return;
            }
            const json:AppWrite<string> = JSON.parse(res.data);
            if (json.code !== 200){
                notifications.show({
                    title: "Error",
                    message: json.msg
                })
                setForking(false)
                setLoading(false)
                return;
            }
            notifications.show({
                title: "Success",
                message: "Fork success"
            })
            setTimeout(() => {
                nav(`/r/${owner_name}/${name}`)
            }, 1000)
            return;
        })

        setLoading(false)

    }
    useEffect(() => {
        Init().then().catch().finally()
    }, []);
    return(
        <div className="fork">
            <h1>
                Fork
            </h1>
            <Box pos="relative">
                <LoadingOverlay visible={Forking} loaderProps={{ children: 'Forking...' }} />
                <Form
                    form={form}
                    id="LayoutModelRepositoryFork"
                >
                    <Select
                        name={"owner"}
                        label="Owner"
                        title="Select Owner"
                        withAsterisk
                        key={form.key("owner")}
                        data={
                            Access.map((item) => {
                                return {
                                    value: item.owner_uid,
                                    label: item.name
                                }
                            })
                        }
                        {...form.getInputProps("owner")}
                    />
                    <InputLabel className="w-full">
                        name<a style={{color: 'red'}}> *</a>
                        <Input
                            name="name"
                            placeholder="Enter repository name"
                            type="tel"
                            aria-autocomplete={"none"}
                            key={form.key("name")}
                            {...form.getInputProps("name")}
                        />
                    </InputLabel>

                    <InputLabel className="w-full">
                        description(optional)
                        <Input
                            name="description"
                            placeholder="Enter repository descrition"
                            type="tel"
                            aria-autocomplete={"none"}
                            key={form.key("description")}
                            {...form.getInputProps("description")}
                        />
                    </InputLabel>
                    <Divider/>
                    <RadioGroup
                        withAsterisk
                        name="visibility"
                        color="success"
                        label="Select the visibility of the repository"
                        key={form.key("visibility")}
                        defaultValue="Public"
                        onChange={(value) => {
                            form.setFieldValue("visibility", value === "Public");
                        }}
                    >
                        <Radio
                            label={"Public"}
                            description="Anyone on the internet can see this repository. You choose who can commit."
                            value="Public"/>
                        <br/>
                        <Radio description="You choose who can see and commit to this repository."
                               value="Private"
                               label={"Private"}
                        />
                    </RadioGroup>
                    <Divider/>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "1rem",
                        marginRight: "auto"
                    }}>
                        <Button color="primary" variant="flat" type="reset">
                            Reset
                        </Button>
                        <Button color="green" type="submit" onClick={onSubmit}>
                            Create
                        </Button>
                    </div>
                </Form>
            </Box>
        </div>
    )
}