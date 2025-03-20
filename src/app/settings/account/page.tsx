'use client'

import {Alert, Button, Input, InputLabel} from "@mantine/core";

export default function Page() {
    return (
        <div className="profile">
            <section>
                <h1>
                    Password
                </h1>
                <span>
                   Change your password.
                </span>
                <br/>
                <br/>
                <InputLabel>
                    Old Password
                    <Input
                        name="password"
                        style={{width: "450px"}}
                        placeholder="Enter Old password"
                        type="password"
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </InputLabel>
                <br/>
                <br/>
                <InputLabel>
                    New Password
                    <Input
                        style={{width: "450px"}}
                        name="password"
                        placeholder="Enter New password"
                        type="password"
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </InputLabel>
                <br/>
                <br/>
                <InputLabel>
                    Confirm new password again
                    <Input
                        style={{width: "450px"}}
                        name="password"
                        placeholder="Confirm new password again"
                        type="password"
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </InputLabel>
                <br/>
                <br/>
                <div className="save">
                    <Button>
                        <span>Save</span>
                    </Button>
                </div>
            </section>
            <hr/>
            <section>
                <h1>
                    UserName
                </h1>
                <span>
                    Change your username.
                </span>
                <br/>
                <br/>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    alignItems: "center"
                }}>
                    <InputLabel>
                        New Username
                        <Input
                            style={{width: "450px"}}
                            name="username"
                            placeholder="Enter New username"
                            type="text"
                            onChange={(e) => {
                                console.log(e.target.value);
                            }}
                        />
                    </InputLabel>
                    <Alert variant="light" color="red" title={<a style={{color: "red"}}>Warn</a>} >
                        Changing the username will change all git addresses, external link addresses, etc.
                    </Alert>
                </div>
                <br/>
                <div className="save">
                    <Button>
                        <span>Save</span>
                    </Button>
                </div>
            </section>
            <hr/>
            <section>
                <h1>
                    Email
                </h1>
                <span>
                    Change your email.
                </span>
                <br/>
                <br/>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    alignItems: "center"
                }}>
                    <InputLabel>
                        New Email
                        <Input
                            style={{width: "450px"}}
                            name="username"
                            placeholder="Enter New Email"
                            type="text"
                            onChange={(e) => {
                                console.log(e.target.value);
                            }}
                        />
                    </InputLabel>
                    <Alert variant="light" color="red" title={<a style={{color: "red"}}>Warn</a>} >
                        Changing the email address will invalidate the current login status until the next time you activate the email address
                    </Alert>
                </div>
                <br/>
                <div className="save">
                    <Button>
                        <span>Save</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}