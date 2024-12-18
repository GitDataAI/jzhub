import React, {useState} from "react";
import VerificationInput from "react-verification-input";
import Countdown from "react-countdown";
import {useNavigate} from "react-router-dom";
import {UserApi} from "@/api/action/User.tsx";
import {EmailApi} from "@/api/action/Email.tsx";
import {toast} from "@pheralb/toast";

export const Apply = () => {
    const nav = useNavigate();
    const [Step, setStep] = React.useState(0);
    const [Value,setValue] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [Passwd,setPasswd] = useState({
        p1: "",
        p2: ""
    })

    const email = new EmailApi();
    const user = new UserApi();
    const SendCaptcha = () => {
        email.CaptchaSend({
            email: Value.email
        })
            .then(res=>{
                if (res.data.code === 200) {
                    toast.success({
                        text: "验证码发送成功",
                        description: "验证码已发送到您的邮箱"
                    })
                    setStep(1);
                }else {
                    toast.error({
                        text: "验证码发送失败",
                        description: "验证码发送失败"
                    })
                }
            })
            .catch(e=>{
                toast.error({
                    text: "验证码发送失败",
                    description: "验证码发送失败"
                })
                console.log(e);
            })
    }
    const CheckCaptcha = (x: string) => {
        email.CaptchaCheck({
            code: x,
            email: Value.email
        })
            .then(res=>{
                if (res.data.code === 200) {
                    toast.success({
                        text: "验证码验证成功",
                        description: "验证码验证成功"
                    })
                    setStep(2);
                }else {
                    toast.error({
                        text: "验证码验证失败",
                        description: "验证码验证失败"
                    })
                    setStep(1);
                }
            })
    }
    const Submit = () => {
        if (Passwd.p1 === Passwd.p2){
            user.Apply({
                email: Value.email,
                password: Passwd.p1,
                username: Value.username
            })
                .then(res=>{
                    if (res.data.code === 200) {
                        toast.success({
                            text: "注册成功",
                            description: "注册成功"
                        })
                        nav("/auth/login");
                    }else {
                        toast.error({
                            text: "注册失败",
                        })
                    }
                })
        }else {
            toast.error({
                text: "两次密码不一致",
            })
        }
    }

    const Next = () => {
        if (Step === 0) {
            SendCaptcha();
        }
        return
    }
    return(
        <>
            <img src="/gitdata-ai.png" alt="" className="auth-image"/>
            <h1 className="auth-title">
                注册以继续
            </h1>
            <form className="auth-form">
                {
                    Step === 0 &&(
                        <>
                            <input onChange={(e)=>{
                                setValue({
                                    ...Value,
                                    email:e.target.value
                                })
                            }} type="email" placeholder="请输入邮箱"/>
                            <input onChange={(x)=>{
                                setValue({
                                    ...Value,
                                    username:x.target.value
                                })
                            }} type="tel" placeholder="请输入用户名"/>
                            <button onClick={()=> Next()} type={"button"} className="auth-button">发送验证码</button>
                        </>
                    )
                }
                {
                    Step === 1 &&(
                        <>
                            <VerificationInput onChange={(x)=>{
                                if(x.length === 6){
                                    CheckCaptcha(x);
                                }
                            }} placeholder="_" />
                            <Countdown
                                date={Date.now() + 60000}
                                autoStart={true}
                                renderer={({ completed, formatted }) => (
                                    <div>
                                        {completed ? (
                                            <button onClick={()=> SendCaptcha()} type={"button"} className="auth-button">发送验证码</button>
                                        ) : (
                                            <button disabled={true} type={"button"} className="auth-button">{formatted.seconds}秒后重试</button>
                                        )}
                                    </div>
                                )}
                            ></Countdown>
                        </>
                    )
                }
                {
                    Step === 2 &&(
                        <>
                            <input onChange={(x)=>{
                                setPasswd({
                                    ...Passwd,
                                    p1:x.target.value
                                })
                            }} type="password" placeholder="请输入密码"/>
                            <input onChange={(x)=>{
                                setPasswd({
                                    ...Passwd,
                                    p2:x.target.value
                                })
                            }} type="password" placeholder="请确认密码"/>
                            <button onClick={Submit} type={"button"} className="auth-button">注册</button>
                        </>
                    )
                }
            </form>
            <div className="auth-link">
                <a href={"#"} onClick={()=> nav("/auth/login")}>已有账号？立即登录</a>
            </div>
            <p className="auth-intro">
                <img src="/gitdata-ai.png" alt="GitDataAi"/>
                <br/>
                GitData.AI 是一个用于数据产品（例如AI模型）的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。</p>

            <div className="auth-footer">
                <br/>
                <a href={"#"}>© 2023 GitData.ai </a>
                <a href={"#"}>隐私政策</a>
                <a href={"#"}> | </a>
                <a href={"#"}>用户协议</a>
            </div>
        </>
    )
}