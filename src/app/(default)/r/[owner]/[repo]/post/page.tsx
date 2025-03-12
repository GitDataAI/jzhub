'use client'

import {useEffect, useState} from "react";
import usePageContext from "@/store/usePageContext";
import {Form, useForm} from "@mantine/form";
import {BranchModel, CommitModel, DataProductPostParam} from "@/server/types";
import {RepoApi} from "@/server/RepoApi";
import {AppWrite} from "@/server/Client";
import {
    Box,
    Button,
    Divider,
    Input,
    InputLabel,
    LoadingOverlay,
    Pill,
    PillGroup, PillsInput,
    PillsInputField,
    Select
} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {ProductApi} from "@/server/ProductApi";
import {debounce} from "lodash";

export default function ProductPostPage(){
    const context = usePageContext();
    const [Parma,setParma] = useState<{ owner: string, repo: string } | undefined>();
    const [Heads, setHeads] = useState<CommitModel[]>([]);
    const [Publishing, setPublishing] = useState(false);
    const repo_api = new RepoApi();
    const product_api = new ProductApi();
    const Init = debounce(async ()=>{
        if (context.repoCtx){
            const {owner, repoName} = context.repoCtx;
            setParma({owner,repo: repoName})
            const btch = await repo_api.Bhtc(owner, repoName);
            if (btch.status !== 200) {
                notifications.show({
                    title: "Error",
                    message: "Get Branches Error",
                    color: "red",
                })
                return;
            }
            const json:AppWrite<Blob> = JSON.parse(btch.data);
            if (json.code !== 200 || !json.data) {
                notifications.show({
                    title: "Error",
                    message: "Get Branches Error",
                    color: "red",
                })
                return;
            }
            const branches = Object.keys(json.data).map((value)=>{
                return JSON.parse(value) as BranchModel
            });
            for(const idx in branches) {
                const branch = branches[idx];
                repo_api.OneCommit(owner,repoName, branch.name, branch.head)
                    .then((res) => {
                        if (res.status === 200) {
                            const json:AppWrite<CommitModel> = JSON.parse(res.data);
                            if (json.code === 200 && json.data) {
                                setHeads((prev) => {
                                    if (prev.find((item) => item.id === json.data!.id)) {
                                        return prev;
                                    }else {
                                        return [...prev, json.data!];
                                    }
                                });
                            }
                        }
                    })
            }
        }
    },300)
    useEffect(() => {
        Init()
    }, []);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: '',
            description: '',
            license: '',
            price: 0,
            hash: '',
            type: '',
        },
        validate: {
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
                return null;
            },
            license: (value) => {
                if (!value) {
                    return "License is required";
                }
                return null;
            },
            hash: (value) => {
                if (!value) {
                    return "Hash is required";
                }
                return null;
            },
            price: (value) => {
                if (value % 1 !== 0 && value !== 0) {
                    return "Price is invalid, it is integer";
                }
                if (value < 0){
                    return "Price is invalid, it is eqt 0";
                }
            },
        }
    });

    const [Topics,setTopics] = useState<string[]>([]);
    const [Topic,setTopic] = useState<string>("");
    const onSubmit = () => {
        if (Publishing) return;
        setPublishing(true);
        form.validate();
        if (!form.isValid()){
            notifications
                .show({
                    message: "Please fill in all required fields",
                    color: "red",
                })
            setPublishing(false)
            return;
        }
        const param:DataProductPostParam = {
            name: form.getValues().name,
            description: form.getValues().description,
            license: form.getValues().license,
            price: Number(form.getValues().price),
            hash: form.getValues().hash,
            type: Topics.join(","),
        }
        console.log(param);
        product_api.Post(Parma!.owner, Parma!.repo, param)
            .then((res) => {
                if (res.status === 200) {
                    const json:AppWrite<string> = JSON.parse(res.data);
                    if (json.code === 200 ) {
                        notifications.show({
                            title: "Success",
                            message: "Post Jobs Submit success, Please You wait"
                        })
                        setTimeout(() => {
                            window.location.href = "/r/" + Parma!.owner + "/" + Parma!.repo;
                        }, 1000);
                    }
                }
            })

        setPublishing(false);

    }

    return (
        <div className="post">
            <h1>
                POST
            </h1>
            <Box pos="relative">
                <LoadingOverlay visible={Publishing} loaderProps={{ children: 'Publish...' }} />
                <Form
                    form={form}
                    id="LayoutModelRepositoryPOST"
                >
                    <Select
                        name={"hash"}
                        label="hash"
                        title="Select hash"
                        withAsterisk
                        key={form.key("hash")}
                        data={
                            Heads.map((item) => {
                                return {
                                    value: item.id,
                                    label: item.id + " " +  item.message + " " + item.author + " " + new Date(item.time * 1000).toISOString()
                                }
                            })
                        }
                        {...form.getInputProps("hash")}
                    />
                    <InputLabel className="w-full">
                        name<a style={{color: 'red'}}> *</a>
                        <Input
                            name="name"
                            placeholder="Enter product name"
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
                            placeholder="Enter product descrition"
                            type="tel"
                            aria-autocomplete={"none"}
                            key={form.key("description")}
                            {...form.getInputProps("description")}
                        />
                    </InputLabel>

                    <InputLabel className="w-full">
                        license<a style={{color: 'red'}}> *</a>
                        <Input
                            name="license"
                            placeholder="Enter product license"
                            type="tel"
                            aria-autocomplete={"none"}
                            key={form.key("license")}
                            {...form.getInputProps("license")}
                        />
                    </InputLabel>
                    <InputLabel className="w-full">
                        price<a style={{color: 'red'}}> *</a>
                        <Input
                            name="price"
                            placeholder="Enter product price"
                            type="number"
                            aria-autocomplete={"none"}
                            key={form.key("price")}
                            {...form.getInputProps("price")}
                        />
                    </InputLabel>
                    <InputLabel className="w-full">
                        type<a style={{color: 'red'}}> *</a>
                        <PillsInput>
                            <PillGroup>
                                {Topics.map((item, index) => (
                                    <Pill key={index}>{item}</Pill>
                                ))}
                                <PillsInputField
                                    value={Topic}
                                    placeholder="Add a Type"
                                    onChange={(e) => {
                                        setTopic(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        e.stopPropagation();
                                        if (e.key === "Enter") {
                                            if (Topic.length > 0) {
                                                setTopics([...Topics, Topic])
                                                setTopic("")
                                            }
                                        }
                                        if (e.key === "Backspace") {
                                            if (Topic.length === 0) {
                                                setTopics(Topics.slice(0, -1))
                                            }
                                        }
                                        if (e.key === "Tab") {
                                            if (Topic.length > 0) {
                                                setTopics([...Topics, Topic])
                                                setTopic("")
                                            }
                                        }
                                    }}
                                />
                            </PillGroup>
                        </PillsInput>
                    </InputLabel>
                    <Divider/>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "1rem",
                        marginRight: "auto"
                    }}>
                        <Button color="green" type="submit" onClick={onSubmit}>
                            Publish
                        </Button>
                    </div>
                </Form>
            </Box>
        </div>
    )

}