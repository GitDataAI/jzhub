'use client'

import useUserContext from "@/store/useUserContext";
import {
    Avatar,
    Button,
    Divider,
    Indicator,
    Input,
    InputLabel,
    Pill,
    PillGroup,
    PillsInput, PillsInputField,
    Textarea, useCombobox
} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {useState} from "react";
import {notifications} from "@mantine/notifications";

export default function SettingProfile() {
    const user = useUserContext();
    const dash = user.getDashBored();
    const form = useForm({
        initialValues: {
            name: dash?.user.name || "",
            email: dash?.user.email || "",
            description: dash?.user.description || "",
            location: dash?.user.location || "",
            website: dash?.user.website || "",
            language: dash?.user.language || "",
            timezone: dash?.user.timezone || "",
        },
    })
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const [Topics,setTopics] = useState<string[]>(dash?.user.topic || []);
    const [Topic,setTopic] = useState<string>("");
    const Submit = () => {
        const value = form.getValues();
        if (value.name.length < 3){
            notifications.show({
                title: '用户名太短',
                message: "用户名至少三个字符",
                color: 'red',
            });
            return;
        }
        if (value.email.length < 3){
            notifications.show({
                title: '邮箱太短',
                message: "邮箱至少三个字符",
                color: 'red',
            });
            return;
        }
        if (!value.email.includes("@") || !value.email.includes(".")){
            notifications.show({
                title: '邮箱格式错误',
                message: "邮箱格式错误",
                color: 'red',
            });
            return;
        }
        if (value.description.length > 100){
            notifications.show({
                title: '描述过长',
                message: "描述不能超过100个字符",
                color: 'red',
            });
            return;
        }
        if (value.location.length > 100){
            notifications.show({
                title: '位置过长',
                message: "位置不能超过100个字符",
                color: 'red',
            });
            return;
        }
        if (value.website.length > 100){
            notifications.show({
                title: '网站过长',
                message: "网站不能超过100个字符",
                color: 'red',
            });
            return;
        }
        if (value.language.length > 100){
            notifications.show({
                title: '语言过长',
                message: "语言不能超过100个字符",
                color: 'red',
            });
            return;
        }
        if (value.timezone.length > 100){
            notifications.show({
                title: '时区过长',
                message: "时区不能超过100个字符",
                color: 'red',
            });
            return;
        }

        const payload = {
            name: value.name,
            email: value.email,
            description: value.description,
            location: value.location,
            website: value.website,
            language: value.language,
            timezone: value.timezone,
            topic: Topics,
        };
        console.log(payload);
    }
    return(
        <div className="user-setting-profile">
            {
                dash && (
                    <>
                        <h1>
                            Profile
                        </h1>
                        <Divider/>
                        <input
                            id="upload-avatar"
                            type="file"
                            accept="image/*"
                            style={{
                                display: "none"
                            }}
                            onChange={(e)=>{
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const  form = new FormData();
                                    form.append("file", file);
                                    const xhr = new XMLHttpRequest();
                                    xhr.open("post", "/api/v1/static/upload_avatar", true);
                                    xhr.onload = function () {
                                        notifications
                                            .show({
                                            title: "Upload Success",
                                            message: "Upload Success",
                                            icon: <i className="iconfont icon-success"></i>,
                                            color: "green",
                                        });
                                        setTimeout(()=>{
                                            // window.location.reload()
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
                            }}/>
                        <Form form={form} className="profile-form">
                            <Indicator
                                inline
                                position="bottom-start"
                                withBorder
                                offset={20}
                                label={
                                    <Button onClick={()=>{
                                        const input = document.getElementById("upload-avatar") as HTMLInputElement;
                                        input.click();
                                    }} size="xs">Upload</Button>
                                }>
                                <Avatar
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                    }}
                                    src={dash.user.avatar || ""}
                                />
                            </Indicator>
                            <InputLabel>
                                <label>Name</label>
                                <Input
                                    key={form.key("name")}
                                    {...form.getInputProps("name")}
                                />
                                <span>
                                    Changing this name will not have any impact on your repository.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>email</label>
                                <Input
                                    key={form.key("email")}
                                    {...form.getInputProps("email")}
                                />
                                <span>
                                    This is the email that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>description</label>
                                <Textarea
                                    key={form.key("description")}
                                    {...form.getInputProps("description")}
                                />
                                <span>
                                    This is the description that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>location</label>
                                <Input
                                    key={form.key("location")}
                                    {...form.getInputProps("location")}
                                />
                                <span>
                                    This is the location that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>website</label>
                                <Input
                                    key={form.key("website")}
                                    {...form.getInputProps("website")}
                                />
                                <span>
                                    This is the website that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>language</label>
                                <Input
                                    key={form.key("language")}
                                    {...form.getInputProps("language")}
                                />
                                <span>
                                    This is the language that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>timezone</label>
                                <Input
                                    key={form.key("timezone")}
                                    {...form.getInputProps("timezone")}
                                />
                                <span>
                                    This is the timezone that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <InputLabel>
                                <label>topic</label>
                                <PillsInput>
                                    <PillGroup>
                                        {Topics.map((item, index) => (
                                            <Pill key={index}>{item}</Pill>
                                        ))}
                                        <PillsInputField
                                            value={Topic}
                                            placeholder="Add a topic"
                                            onChange={(e) => {
                                                setTopic(e.target.value)
                                            }}
                                            onKeyDown={(e) => {
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
                                <span>
                                    This is the topic that will be displayed on your profile.
                                </span>
                            </InputLabel>
                            <Button onClick={Submit}>Submit</Button>
                        </Form>
                    </>
                )
            }
        </div>
    )
}