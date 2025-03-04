'use client'

import {Button, Divider, PasswordInput, TextInput} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {useRouter} from "next/navigation";
import {notifications} from "@mantine/notifications";
import React, {useEffect, useState} from "react";
import {AuthApi} from "@/server/AuthApi";
import Image from "next/image";
import {AppWrite} from "@/server/Client";
import useUserContext from "@/store/useUserContext";
import {UserModel} from "@/server/types";


export default function Login() {
    const api = new AuthApi();
    const nav = useRouter().replace;
    const context = useUserContext();
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
            captcha: "",
        },
        validate: {
            username: (value) => {
                if (value.length < 4) {
                    return '用户名至少四位';
                }
                return null;
            },
            password: (value) => {
                if (value.length < 6) {

                    return '密码至少六位';
                }
                return null;
            },
            captcha: (value) => {
                if (value.length < 5) {
                    return '验证码至少五位';
                }
            },
        },
    });
    const [Captcha, setCaptcha] = useState('');
    const Submit = () => {
        api.LoginPasswd(form.getValues().username, form.getValues().password, form.getValues().captcha)
            .then(res => {
                if (res.status === 200 && res.data) {
                    const json: AppWrite<UserModel> = JSON.parse(res.data);
                    if (json.code === 200) {
                        notifications.show({
                            title: '登陆成功',
                            message: "正在跳转",
                            color: 'green',
                        });
                        context.syncData();
                        setTimeout(() => {
                            nav('/');
                        }, 1000);
                    } else {
                        notifications.show({
                            title: '登陆失败',
                            message: json.msg,
                            color: 'red',
                        });
                    }
                }
            })
    }
    const Init = () => {
        api.Captcha()
            .then(res => {
                if (res.status === 200 && res.data) {
                    setCaptcha(res.data);
                }
            })
    }
    useEffect(() => {
        Init();
    }, []);
    return (
        <>
            <h1>登陆</h1>
            <Form form={form} className="form">
                <div>
                    <TextInput label="账号" placeholder="请输入你的用户名或邮箱"
                               key={form.key('username')} {...form.getInputProps('username')}/>
                    <PasswordInput label="密码" placeholder="请输入你的密码"
                                   key={form.key('password')} {...form.getInputProps('password')}/>
                    <div className="email-captcha">
                        <TextInput placeholder="请输入图片验证码" name="captcha"
                                   key={form.key('captcha')} {...form.getInputProps('captcha')} />
                        <Image src={Captcha} alt={"captcha"} onClick={Init} width={160} height={35}/>
                    </div>
                </div>
                <Button type="button" color="orange" onClick={() => {
                    const validate = form.validate();
                    if (validate.hasErrors) {
                        notifications.show({
                            title: '登陆失败',
                            message: "用户名或密码格式错误",
                            color: 'red',
                        });
                        return;
                    }
                    Submit();
                }}>登陆</Button>
                <Divider label="还没有账号？"/>
                <Button type="button" color="dark" onClick={() => {
                    nav('/sign')
                }}>注册</Button>
            </Form>
        </>
    )
}