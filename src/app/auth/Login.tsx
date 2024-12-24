import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/store/useUser.tsx";
import { toast } from "@pheralb/toast";
export const Login = () => {
  const nav = useNavigate();
  const [Value, setValue] = React.useState({
    email: "",
    passwd: "",
  });
  const user = useUser();

  const Submit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest("form") as HTMLFormElement; // 获取最近的表单
    if (!form) return;

    const email = (
      form.querySelector('input[type="email"]') as HTMLInputElement
    ).value;
    const passwd = (
      form.querySelector('input[type="password"]') as HTMLInputElement
    ).value;

    user
      .LoginInByEmail({ email, passwd })
      .then((x) => {
        if (x) {
          nav("/");
        } else {
          toast.error({
            text: "登录失败",
            description: "邮箱或密码错误",
          });
        }
      })
      .catch((e) => {
        toast.error({
          text: "登录失败",
          description: "登录请求失败",
        });
        console.error(e);
      });
  };

  return (
    <>
      <img src="/gitdata-ai.png" alt="" className="auth-image" />
      <h1 className="auth-title">登录以继续</h1>
      <form className="auth-form">
        <input
          type="email"
          onChange={(x) => {
            setValue({
              ...Value,
              email: x.target.value,
            });
          }}
          placeholder="请输入邮箱"
        />
        <input
          type="password"
          onChange={(x) => {
            setValue({
              ...Value,
              passwd: x.target.value,
            });
          }}
          placeholder="请输入密码"
        />
        <button type={"button"} onClick={Submit} className="auth-button">
          登录
        </button>
      </form>
      <div className="auth-link">
        <a
          href={"#"}
          onClick={() => {
            nav("/auth/reset");
          }}
        >
          忘记密码
        </a>
        <a href={"#"}> | </a>
        <a
          href={"#"}
          onClick={() => {
            nav("/auth/apply");
          }}
        >
          注册账号
        </a>
      </div>
      <p className="auth-intro">
        <img src="/gitdata-ai.png" alt="GitDataAi" />
        <br />
        GitData.AI
        是一个用于数据产品（例如AI模型）的开发、管理、交易的一站式协作平台，帮助您高效地开发和探索数据产品。
      </p>

      <div className="auth-footer">
        <br />
        <a href={"#"}>© 2023 GitData.ai </a>
        <a href={"#"}>隐私政策</a>
        <a href={"#"}> | </a>
        <a href={"#"}>用户协议</a>
      </div>
    </>
  );
};
