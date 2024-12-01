import {useNavigate, useSearchParams} from "react-router-dom";
import React from "react";

export const Reset = () => {
    const nav = useNavigate();
    const [search] = useSearchParams();
    const token = search.get("token");
    const [Passwd,setPasswd] = React.useState({
        p1: "",
        p2: ""
    })
    const [Email, setEmail] = React.useState("")
    const SubmitPasswd = () => {
        console.table(Passwd)
    }
    const SubmitEmail = () => {
        console.log(Email)
    }
    return (
        <>
            <img src="/gitdata-ai.png" alt="" className="auth-image"/>
            <h1 className="auth-title">
                登录以继续
            </h1>
            <form className="auth-form">
                {
                    token ? (
                        <>
                            <input onChange={(x) => {
                                setPasswd({
                                    ...Passwd,
                                    p1: x.target.value
                                })
                            }} type="password" placeholder="请输入密码"/>
                            <input onChange={(x) => {
                                setPasswd({
                                    ...Passwd,
                                    p2: x.target.value
                                })
                            }} type="password" placeholder="请确认密码"/>
                            <button onClick={SubmitPasswd} type={"button"} className="auth-button">重置密码</button>
                        </>
                    ) : (
                        <>
                            <input onChange={(x) => {
                                setEmail(x.target.value)
                            }} type="email" placeholder="请输入邮箱"/>
                            <button onClick={SubmitEmail} type={"button"} className="auth-button">发送邮件</button>
                        </>
                    )
                }
            </form>
            <div className="auth-link">
                <a href={"#"} onClick={() => {
                    nav("/auth/login")
                }}>登录</a>
                <a href={"#"}> | </a>
                <a href={"#"} onClick={() => {
                    nav("/auth/apply")
                }}>注册</a>
            </div>
            <p className="auth-intro">
                <img src="/gitdata-ai.png" alt="GitDataAi"/>
                <br/>
                GitData.AI 是一个用于数据产品（例如AI模型）的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。
            </p>

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