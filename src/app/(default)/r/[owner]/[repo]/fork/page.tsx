'use client'

import {RepoApi} from "@/server/RepoApi";
import {useEffect, useState} from "react";
import {RepoAccess} from "@/server/types";
import {notifications} from "@mantine/notifications";
import {AppWrite} from "@/server/Client";
import {Form, useForm} from "@mantine/form";
import {Button, Divider, Input, InputLabel, Radio, RadioGroup, Select} from "@mantine/core";

export default function Fork(){

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
    useEffect(() => {
        Init().then().catch().finally()
    }, []);
    return(
        <div className="fork">
            <h1>
                Fork
            </h1>
            <Form
                form={form}
                id="LayoutModelRepositoryFork"
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
                    }/>
                <InputLabel className="w-full">
                    name
                    <Input
                        name="name"
                        placeholder="Enter repository name"
                        type="tel"
                        aria-autocomplete={"none"}
                    />
                </InputLabel>

                <InputLabel className="w-full">
                    description(optional)
                    <Input
                        name="description"
                        placeholder="Enter repository descrition"
                        type="tel"
                    />
                </InputLabel>
                <Divider/>
                <RadioGroup
                    name="visibility"
                    color="success"
                    label="Select the visibility of the repository">
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
                    <Button color="green" type="submit">
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    )
}