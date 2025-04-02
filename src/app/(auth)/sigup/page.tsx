'use client'

import {Form, useForm} from "@mantine/form";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Sign0 from "@/component/auth/sign-0";
import Sign2 from "@/component/auth/sign-2";
import {Button, Divider} from "@mantine/core";
import Sign1 from "@/component/auth/sign-1";
import {notifications} from "@mantine/notifications";

export default function SigUp() {
    const [step, setStep] = useState(0);
    const [Captcha, Set_Captcha] = useState<string | undefined>();
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
                    return (value.length < 6 ? 'username last 6 len' : null);
                }
                return null;
            },
            password0: (value) => {
                if (step === 2) {
                    return (value.length < 6 ? 'password last 6 len' : null);
                }
                return null;
            },
            password1: (value) => {
                if (step === 2) {
                    return (value.length < 6 ? 'password last 6 len' : null);
                }
                return null;
            },
            captcha: (value) => {
                if (step === 2) {
                    return (value.length < 4 ? 'image captcha last 4 len' : null);
                }
                return null;
            },
            email: (value) => {
                if (step === 0) {
                    if (!value.includes('@')) {
                        return 'Email format err';
                    }
                    if (!value.includes('.')) {
                        return 'Email format err';
                    }
                }
                return null;
            },
            code: (value) => {
                if (step === 1) {
                    return (value.length < 6 ? 'Email Captcha code last eq 6 len' : null);
                }
                return null;
            },
        }
    });

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
    const Next = () => {
        if (step === 0) {
            if (form.validate().hasErrors) {
                return;
            }
            const payload = {
                username: form.getValues().username,
                email: form.getValues().email,
            }
            fetch('/api/v1/users/sigck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inner: {
                        username: payload.username,
                        email: payload.email,
                    },
                    unix: parseInt(String(new Date().getTime() / 1000)),
                    device: "N/A",
                }),
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        if (data.code === 0) {
                            fetch('/api/v1/utils/email_captcha_send', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    inner: {
                                        email: payload.email,
                                        code: form.getValues().code,
                                    },
                                    unix: parseInt(String(new Date().getTime() / 1000)),
                                    device: "N/A",
                                }),
                            })
                                .then(res => {
                                    if (res.status === 200) {
                                        res.json().then(data => {
                                            if (data.code === 0) {
                                                notifications.show({
                                                    title: 'Success',
                                                    message: 'Email captcha send successful',
                                                    color: 'green',
                                                });
                                                setStep(1);
                                            } else {
                                                notifications.show({
                                                    title: 'Failed',
                                                    message: data.msg,
                                                    color: 'red',
                                                })
                                            }
                                        })
                                    } else {
                                        notifications.show({
                                            title: 'Failed',
                                            message: 'email captcha send error',
                                            color: 'red',
                                        });
                                    }
                                })
                        } else {
                            notifications.show({
                                title: 'Failed',
                                message: data.msg,
                                color: 'red',
                            });
                        }
                    })
                } else {
                    notifications.show({
                        title: 'Failed',
                        message: 'email captcha send error',
                        color: 'red',
                    });
                }
            })
        }
        if (step === 1) {
            if (form.validate().hasErrors) {
                return;
            }
            const code = form.getValues().code;
            if (code.length !== 6) {
                notifications.show({
                    title: 'Failed',
                    message: 'Email captcha code err',
                    color: 'red',
                });
                return;
            }
            fetch('/api/v1/utils/email_captcha_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inner: {
                        email: form.getValues().email,
                        code: code,
                    },
                    unix: parseInt(String(new Date().getTime() / 1000)),
                    device: "N/A",
                }),
            })
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            if (data.code === 0) {
                                notifications.show({
                                    title: 'Success',
                                    message: 'Captcha Successful',
                                    color: 'green',
                                });
                                setStep(2);
                            } else {
                                notifications.show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                            }
                        })
                    } else {
                        notifications.show({
                            title: 'Failed',
                            message: 'Captcha Err',
                            color: 'red',
                        });
                    }
                })
        }
        if (step === 2) {
            if (form.validate().hasErrors) {
                return;
            }
            const data = form.getValues();
            if (data.password0 !== data.password1) {
                notifications.show({
                    title: 'Failed',
                    message: 'password not is same',
                    color: 'red',
                });
                return;
            }
            fetch('/api/v1/users/sigup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inner: {
                        username: data.username,
                        email: data.email,
                        password: data.password0,
                        captcha: data.captcha,
                    },
                    unix: parseInt(String(new Date().getTime() / 1000)),
                    device: "N/A",
                }),
            })
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            if (data.code === 0) {
                                notifications.show({
                                    title: 'Success',
                                    message: 'Sign up successful',
                                    color: 'green',
                                });
                            } else {
                                notifications.show({
                                    title: 'Failed',
                                    message: data.msg,
                                    color: 'red',
                                });
                            }
                        })
                    } else {
                        notifications.show({
                            title: 'Failed',
                            message: 'Sign up error',
                            color: 'red',
                        });
                    }
                })
        }
    }
    useEffect(() => {
        Fetch_Captcha();
    }, []);
    return (
        <>
            <h1>Sign up</h1>
            <Form form={form} className="form">
                {
                    (step === 0) ? <Sign0 form={form}/> : null
                }
                {
                    (step === 1) ? <Sign1 form={form}/> : null
                }
                {
                    (step === 2) ? <Sign2 form={form} captcha={Captcha} init={Fetch_Captcha}/> : null
                }
                <Button type="button" color="orange" onClick={() => {
                    Next();
                }}>
                    {
                        (step <= 1) ? 'next' : 'submit'
                    }
                </Button>
                <Divider label="aleary has account？go sign in"/>
                <Button type="button" color="dark" onClick={() => {
                    nav('/sigin')
                }}>
                    Sign in
                </Button>
            </Form>
        </>

    );
}