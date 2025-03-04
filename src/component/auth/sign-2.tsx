import {PasswordInput, Radio, TextInput} from "@mantine/core";
import {useState} from "react";
import {UseFormReturnType} from "@mantine/form";

interface Sign2Props {
    form: UseFormReturnType<{
        username: string;
        password0: string;
        password1: string;
        email: string;
        code: string;
        captcha: string;
        agree: boolean
    }, (values: {
        username: string;
        password0: string;
        password1: string;
        email: string;
        code: string;
        captcha: string;
        agree: boolean
    }) => {
        username: string;
        password0: string;
        password1: string;
        email: string;
        code: string;
        captcha: string;
        agree: boolean
    }>,
    captcha: string,
    init: () => void
}

export default function Sign2(props: Sign2Props) {
    const [Allow, setAllow] = useState(false);
    return (
        <>
            <PasswordInput placeholder="请输入你的密码" label="请输入你的密码" name="password0"
                           key={props.form.key('password0')} {...props.form.getInputProps('password0')}/>
            <PasswordInput placeholder="请再次输入你的密码" label="请确认你的密码" name="password1"
                           key={props.form.key('password1')} {...props.form.getInputProps('password1')}/>
            <div className="email-captcha">
                <TextInput placeholder="请输入图片验证码" name="captcha"
                           key={props.form.key('captcha')} {...props.form.getInputProps('captcha')}/>
                <img src={props.captcha} alt={"captcha"} width={160} height={35} onClick={props.init}/>
            </div>
            <Radio
                checked={Allow}
                onClick={() => {
                    setAllow((pre) => !pre);
                    props.form.setFieldValue('agree', !Allow);
                }}
                iconColor="dark.8"
                color="lime.4"
                label={
                    <div>
                        我已阅读并同意
                        <a href={"#"}>《用户服务协议》</a>
                        和
                        <a href={"#"}>《隐私政策》</a>
                    </div>
                }
                name="agree"
            />
        </>
    );
}