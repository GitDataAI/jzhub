import {Button, PinInput} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";

interface Sign1Props {
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

export default function Sign1({form}: Sign1Props) {
    return (
        <div className="email-captcha">
            <PinInput length={6} name="code" className="w-full" key={form.key('code')} {...form.getInputProps('code')}/>
            <Button color="green">Send</Button>
        </div>
    );
}