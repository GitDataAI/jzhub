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
                    return 'UserName last has 4 len';
                }
                return null;
            },
            password: (value) => {
                if (value.length < 6) {

                    return 'Password last has 6 len';
                }
                return null;
            },
            captcha: (value) => {
                if (value.length !== 4) {
                    return 'Captcha is 4 len';
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
                message: 'Login Err',
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
                title: 'Login Success',
                message: 'wait',
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
                    <TextInput label="Account" placeholder="Please input you username or email"
                               key={form.key('username')} {...form.getInputProps('username')}/>
                    <PasswordInput label="Password" placeholder="Please input you password"
                                   key={form.key('password')} {...form.getInputProps('password')}/>
                    <div className="email-captcha">
                        <TextInput placeholder="Please input Captcha for right image" name="captcha"
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
                            title: 'Login Error',
                            message: "Please check username or password error",
                            color: 'red',
                        });
                        return;
                    }
                    Submit();
                }}>Login</Button>
                <Divider label="Not Account？"/>
                <Button type="button" color="dark" onClick={() => {
                    nav('/sigup')
                }}>Sign up</Button>
            </Form>
        </>

    );
}