'use client'

import {Button, Divider, PasswordInput, Skeleton, TextInput} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import useUserContext from "@/store/useUserContext";
import {parseInt} from "lodash";

export default function Sigin() {
    const nav = useRouter().replace;
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
                if (value.length !== 4) {
                    return '验证码为4位';
                }
            },
        },
    });

    const [Captcha, Set_Captcha] = useState<string | undefined>();
    const Fetch_Captcha = async () => {
        const res = await fetch('/api/v1/utils/base64_captcha');
        const data: { code: number, data: { captcha: string } } | { code: number, msg: string } = await res.json();
        if (data.code === 0) {
            const base64 = data as { code: number, data: { captcha: string } };
            Set_Captcha(base64.data.captcha);
        } else {
            notifications.show({
                title: 'Failed',
                message: (data as { code: number, msg: string }).msg,
                color: 'red',
            });
        }
    }
    const user = useUserContext();
    const Submit = async () => {
        const res = await fetch('/api/v1/users/sigin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inner: {
                    username: form.getValues().username,
                    password: form.getValues().password,
                    captcha: form.getValues().captcha,
                },
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: "N/A",
            }),
        });
        if (res.status !== 200) {
            notifications.show({
                title: 'Failed',
                message: '登陆失败',
                color: 'red',
            });
            return;
        }
        const json: { code: number, data: { uid: string, username: string, email: string, avatar: string } } | {
            code: number,
            msg: string
        } = await res.json();
        if (json.code === 0) {
            notifications.show({
                title: '登陆成功',
                message: '正在跳转',
                color: 'green',
            });
            user.setUser((json as {
                code: number,
                data: { uid: string, username: string, email: string, avatar: string }
            }).data)
            user.setLogin(true)
            setTimeout(() => {
                window.location.href = '/';
            }, 1000)
        } else {
            notifications.show({
                title: 'Failed',
                message: (json as { code: number, msg: string }).msg,
                color: 'red',
            });
        }
    }
    useEffect(() => {
        Fetch_Captcha();
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
                        {
                            Captcha ? (
                                <Image src={Captcha} alt={"captcha"} onClick={Fetch_Captcha} width={160} height={35}/>
                            ) : (
                                <Skeleton width={160} height={35}/>
                            )
                        }
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
                    nav('/sigup')
                }}>注册</Button>
            </Form>
        </>

    );
}