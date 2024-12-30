import {Button, Input} from "@mantine/core";
import {useNavigate} from "react-router";
import {useState} from "react";
import {UsersApi} from "../../lib/api/UsersApi.tsx";
import {toast} from "@pheralb/toast";

const Login = () => {
    const nav = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [Option,setOption] = useState({
        username: "",
        password: ""
    })
    const users = new UsersApi();
    const Login = () => {
        if (Loading) return;
        if (Option.username === "" || Option.password === "") {
            toast.error({
                text: "账号或密码不能为空"
            })
            setLoading(false)
            return;
        }
        setLoading(true)
        users.login({
            username: Option.username,
            password: Option.password
        }).then(res=>{
            if (res.data.code === 200) {
                toast.success({
                    text: "登录成功"
                })
                nav("/")
            }else{
                toast.error({
                    text: "登录失败，请检查您的输入"
                })
                setLoading(false)
            }
        }).catch(()=>{
            toast.error({
                text: "登录失败，请检查您的输入"
            })
            setLoading(false)
        })
    }
    return(
        <>
            <h1 className="auth-window-header-title">
                登录以继续
            </h1>
            <div className="auth-window-from">
                <Input.Wrapper label="账号" description="">
                    <Input onChange={(x)=>{
                        setOption({
                            ...Option,
                            username: x.target.value
                        })
                    }} placeholder="请输入您的邮箱或者用户名"/>
                </Input.Wrapper>
                <Input.Wrapper label="密码" description="">
                    <Input onChange={(x)=>{
                        setOption({
                            ...Option,
                            password: x.target.value
                        })
                    }} type="password" placeholder="请输入你的密码"/>
                </Input.Wrapper>
                <a className="auth-window-from-forget">
                    忘记密码？
                </a>
                <div className="auth-window-from-button" style={{
                    marginTop: "5px"
                }}>
                    <Button
                        variant="gradient"
                        gradient={{from: 'teal', to: 'green', deg: 225}}
                        fullWidth
                        type="button"
                        onClick={Login}
                        justify="center">
                        {
                            Loading ? "登录中..." : "登录"
                        }
                    </Button>
                </div>

                <div className="auth-window-from-button">
                    <Button
                        variant="default"
                        fullWidth
                        type="button"
                        justify="center"
                        onClick={()=>{nav("/auth/apply")}}
                    >注册</Button>
                </div>

            </div>
        </>
    )
}

export default Login