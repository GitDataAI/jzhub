import {Button, Input} from "@mantine/core";
import {useNavigate} from "react-router";
import {useState} from "react";
import {EmailApis} from "../../lib/api/EmailApis.tsx";
import {UsersApi} from "../../lib/api/UsersApi.tsx";
import {toast} from "@pheralb/toast";

const Apply = () => {
    const nav = useNavigate();
    const [Step, setStep] = useState(1);
    const [Loading, setLoading ] = useState(false);
    const email = new EmailApis();
    const users = new UsersApi();
    const [Option, setOption] = useState<{
        email: string,
        name: string,
        code: string,
        password: string
        password2: string
    }>({
        email: "",
        name: "",
        code: "",
        password: "",
        password2: ""
    })
    const Next = () => {
        if (Step === 1){
            setLoading(true)
            if (Option.email === "" || Option.name === "") {
                toast.error({
                    text: "邮箱或用户名不能为空"
                })
                setLoading(false)
                return;
            }
            email.SendCaptcha(Option.email).then(() => {
                setStep(2)
                toast.success({
                    text: "验证码已发送，请检查您的邮箱"
                })
                setLoading(false)
                return;
            })
        }else if (Step === 2){
            if (Option.code === "") {
                toast.error({
                    text: "验证码不能为空"
                })
            }
            setLoading(true)
            email.VerifyCaptcha(Option.email, Option.code).then(res => {
                if (res.data.code === 200) {
                    setStep(3)
                    setLoading(false)
                    return;
                }else{
                    toast.error({
                        text: "验证码校验失败，请检查验证码是否正确"
                    })
                    setLoading(false)
                    return;
                }
            })
            setLoading(true)
        }else if (Step === 3){
            if (Option.password === "" || Option.password2 === "") {
                toast.error({
                    text: "密码不能为空"
                })
                setLoading(false)
                return;
            }else if (Option.password !== Option.password2) {
                toast.error({
                    text: "两次密码不一致"
                })
                setLoading(false)
                return;
            }else{
                users.apply({
                    email: Option.email,
                    username: Option.name,
                    password: Option.password
                }).then((res) => {
                    if (res.data.code === 200) {
                        toast.success({
                            text: "注册成功，请登录"
                        })
                        nav("/auth/login")
                    }else{
                        toast.error({
                            text: "注册失败，请检查您的输入"
                        })
                    }
                })
            }
            setLoading(true)
        }
    }
    return (
        <>
            <h1 className="auth-window-header-title">
                登录以继续
            </h1>
            <div className="auth-window-from">
                {
                    Step === 1? (
                        <>
                            <Input.Wrapper label="邮箱" description="">
                                <Input onChange={(x)=>{
                                    setOption({
                                        ...Option,
                                        email: x.target.value
                                    })
                                }} placeholder="请输入您的邮箱"/>
                            </Input.Wrapper>
                            <Input.Wrapper label="用户名" description="">
                                <Input onChange={(x)=>{
                                    setOption({
                                        ...Option,
                                        name: x.target.value
                                    })
                                }} placeholder="请输入您的用户名"/>
                            </Input.Wrapper>
                        </>
                    ):null
                }
                {
                    Step === 2? (
                        <>
                            <Input.Wrapper label="验证码" description="">
                                <Input onChange={(x)=>{
                                    setOption({
                                        ...Option,
                                        code: x.target.value
                                    })
                                }} placeholder="请输入您的验证码"/>
                            </Input.Wrapper>
                        </>
                    ):null
                }
                {
                    Step === 3? (
                        <>
                            <Input.Wrapper label="密码" description="">
                                <Input type="password" onChange={(x)=>{
                                    setOption({
                                        ...Option,
                                        password: x.target.value
                                    })
                                }} placeholder="请输入您的密码"/>
                            </Input.Wrapper>
                            <Input.Wrapper  label="确认密码" description="">
                                <Input type="password" onChange={(x)=>{
                                    setOption({
                                        ...Option,
                                        password2: x.target.value
                                    })
                                }} placeholder="请再次输入您的密码"/>
                            </Input.Wrapper>
                        </>
                    ):null
                }

                <div className="auth-window-from-button" style={{
                    marginTop: "20px"
                }}>
                    <Button
                        variant="gradient"
                        gradient={{from: 'teal', to: 'green', deg: 225}}
                        fullWidth
                        type="button"
                        onClick={Next}
                        justify="center">{
                        Loading ? "加载中..." : (
                            <>
                                {
                                    (Step === 1)||(Step === 2) ? "下一步" : "登录"
                                }
                            </>
                        )
                    }</Button>
                </div>

                <div className="auth-window-from-button">
                    <Button
                        variant="default"
                        fullWidth
                        type="button"
                        justify="center"
                        onClick={() => {
                            nav("/auth/login")
                        }}
                    >返回登录</Button>
                </div>

            </div>
        </>
    )
}

export default Apply