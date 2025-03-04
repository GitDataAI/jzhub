import {TextInput} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";

interface Sign0Props {
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
    }>
}

export default function Sign0(props: Sign0Props) {
    return (
        <>
            <TextInput label="用户名" name="username"
                       key={props.form.key('username')} {...props.form.getInputProps('username')}/>
            <TextInput label="邮箱" name="email" key={props.form.key('email')} {...props.form.getInputProps('email')}/>
        </>
    );
}