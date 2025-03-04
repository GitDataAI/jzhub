'use client'

import {useEffect, useState} from "react";
import {Form, useForm} from "@mantine/form";
import Sign0 from "@/component/auth/sign-0";
import {Button, Divider} from "@mantine/core";
import Sign1 from "@/component/auth/sign-1";
import Sign2 from "@/component/auth/sign-2";
import {useRouter} from "next/navigation";
import {notifications} from "@mantine/notifications";
import {AuthApi} from "@/server/AuthApi";
import {AppWrite} from "@/server/Client";

export default function Sign() {
    const api = new AuthApi();
    const [step, setStep] = useState(0);
    const [Captcha, setCaptcha] = useState('');
    const nav = useRouter().replace;
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password0: "",
            password1: "",
            email: "",
            code: "",
            captcha: "",
            agree: false,
        },
        validate: {
            username: (value) => {
                if (step === 0) {
                    return (value.length < 6 ? '用户名至少六位' : null);
                }
                return null;
            },
            password0: (value) => {
                if (step === 2) {
                    return (value.length < 6 ? '密码至少六位' : null);
                }
                return null;
            },
            password1: (value) => {
                if (step === 2) {
                    return (value.length < 6 ? '密码至少六位' : null);
                }
                return null;
            },
            captcha: (value) => {
                if (step === 2) {
                    return (value.length < 4 ? '验证码至少四位' : null);
                }
                return null;
            },
            email: (value) => {
                if (step === 0) {
                    if (!value.includes('@')) {
                        return '邮箱格式错误';
                    }
                    if (!value.includes('.')) {
                        return '邮箱格式错误';
                    }
                }
                return null;
            },
            code: (value) => {
                if (step === 1) {
                    return (value.length < 6 ? '验证码至少六位' : null);
                }
                return null;
            },
        }
    });
    const Init = () => {
        api.Captcha()
            .then(res => {
                if (res.status === 200 && res.data) {
                    setCaptcha(res.data);
                }
            })
    }
    const Submit = () => {
        console.log(form.getValues())
        if (step === 2) {
            api
                .ApplyUser(
                    form.getValues().username,
                    form.getValues().password0,
                    form.getValues().email,
                    form.getValues().captcha
                )
                .then(res => {
                    if (res.status === 200 && res.data) {
                        const json: AppWrite<string> = JSON.parse(res.data);
                        if (json.code === 200) {
                            notifications.show({
                                title: '注册成功',
                                message: "正在跳转",
                                color: 'green',
                            });
                            setTimeout(() => {
                                nav('/login');
                            }, 1000);
                        } else {
                            notifications.show({
                                title: '进行失败',
                                message: json.msg,
                                color: 'red',
                            })
                        }
                    }
                })
        }
    }
    const Next = async () => {
        if (step === 0) {
            if (form.validate().hasErrors) {
                notifications.show({
                    title: '进行失败',
                    message: "用户名或邮箱格式错误",
                    color: 'red',
                });
                console.log(1)
            } else {
                const res = await api.CheckEmailORUsername(form.getValues().email, form.getValues().username);
                if (res.status !== 200) {
                    notifications.show({
                        title: '进行失败',
                        message: res.statusText,
                        color: 'red',
                    });
                } else {
                    const json: AppWrite<boolean> = JSON.parse(res.data);
                    if (json.code !== 200) {
                        notifications.show({
                            title: '进行失败',
                            message: json.msg,
                            color: 'red',
                        });
                    } else {
                        if (json.data) {
                            api.CaptchaEmailSend(form.getValues().email)
                                .then(res => {
                                    if (res.status === 200 && res.data) {
                                        notifications.show({
                                            title: '发送成功',
                                            message: '验证码已发送至邮箱',
                                            color: 'green',
                                        });
                                        setStep(step + 1);
                                    }
                                })
                        } else {
                            notifications.show({
                                title: '进行失败',
                                message: "邮箱或用户名已存在",
                                color: 'red',
                            })
                        }
                    }
                }
            }
            return;
        }
        if (step === 1) {
            if (form.validate().hasErrors) {
                notifications.show({
                    title: '进行失败',
                    message: "验证码格式错误",
                    color: 'red',
                });
            } else {
                const res = await api.CaptchaEmailCheck(form.getValues().email, form.getValues().code);
                if (res.status !== 200) {
                    notifications.show({
                        title: '进行失败',
                        message: res.statusText,
                        color: 'red',
                    });
                    return;
                }
                if (res.data) {
                    const json: AppWrite<boolean> = JSON.parse(res.data);
                    if (json.code !== 200) {
                        notifications.show({
                            title: '进行失败',
                            message: json.msg,
                            color: 'red',
                        });
                        return;
                    }
                }
                notifications.show({
                    title: '验证成功',
                    message: '验证成功',
                    color: 'green',
                });
                setStep(step + 1);
            }
            return;
        }
        if (step === 2) {
            if (form.validate().hasErrors) {
                notifications.show({
                    title: '进行失败',
                    message: "密码格式错误",
                    color: 'red',
                });
            } else {
                Submit();
            }
        }
    }
    useEffect(() => {
        Init();
    }, []);
    return (
        <>
            <h1>注册</h1>
            <Form form={form} className="form">
                {
                    (step === 0) ? <Sign0 form={form}/> : null
                }
                {
                    (step === 1) ? <Sign1 form={form}/> : null
                }
                {
                    (step === 2) ? <Sign2 form={form} captcha={Captcha} init={Init}/> : null
                }
                <Button type="button" color="orange" onClick={Next}>
                    {
                        (step <= 1) ? '下一步' : '完成'
                    }
                </Button>
                <Divider label="已经有账号了？去登陆"/>
                <Button type="button" color="dark" onClick={() => {
                    nav('/login')
                }}>
                    登陆
                </Button>
            </Form>
        </>
    );
}

