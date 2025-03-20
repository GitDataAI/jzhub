import {Form, useForm} from "@mantine/form";
import {Box, Button, Divider, Input, InputLabel, Radio, RadioGroup, Textarea} from "@mantine/core";
import {useOs} from "@mantine/hooks";
import {notifications} from "@mantine/notifications";

export const CreateOrg = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            description: "",
            type: "me",
            owner_org: ''
        },
        validate: {
            name: (value) => {
                if (!value) {
                    return "Name is required";
                }
                if (value.length > 100) {
                    return "Name is too long";
                }
                return null;
            },
            description: (value) => {
                if (value.length > 1000) {
                    return "Description is too long";
                }
                return null;
            },
        }
    })
    const os = useOs();
    const Submit = async () => {
        if (form.validate().hasErrors) {
            return;
        }
        let payload = {};
        if (form.getValues().type === "ct") {
            payload = {
                name: form.getValues().name,
                description: form.getValues().description,
                owner_org: form.getValues().owner_org,
            }
        }else {
            payload = {
                name: form.getValues().name,
                description: form.getValues().description,
            }
        }
        console.log(payload)
        const response = await fetch("/api/v1/orgs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inner: payload,
                unix: parseInt(String(new Date().getTime() / 1000)),
                device: os.toString(),
            })
        })
        if (response.status !== 200) {
            notifications
                .show({
                    title: 'Failed',
                    message: "Failed to create group",
                    color: 'red',
                });
            return;
        }
        if (response.status === 200) {
            const data = await response.json();
            notifications
                .show({
                    title: 'Success',
                    message: "Group created",
                    color: 'green',
                });
            setTimeout(() => {
                console.log(data)
            }, 1000);
        } else {
            notifications
                .show({
                    title: 'Failed',
                    message: "Failed to create group",
                    color: 'red',
                });
        }
    }
    return(
        <div className="create-repo" style={{
            marginTop: "2rem",
        }}>
            <h1>Create Group</h1>
            <Divider style={{
                marginTop: "1rem",
                marginBottom: "1rem",
            }}/>
            <Form form={form}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "100%",
                }}>

                    <InputLabel>
                        <h3>Group name</h3>
                        <Input
                            style={{
                                maxWidth: "320px",
                            }}
                            name="name"
                            placeholder="Enter Group name"
                            type="tel"
                            id={"name"}
                            onChange={(e) => {
                                form.setFieldValue("name", e.target.value);
                            }}
                            onBlur={() => {
                                form.validate();
                            }}
                        />
                        <span>
                            Must start with letter, digit, emoji, or underscore. Can also contain periods, dashes, spaces, and parentheses.
                        </span>
                    </InputLabel>
                    <Divider style={{
                        marginTop: "0.125rem",
                        marginBottom: "0.125rem",
                    }}/>
                    <InputLabel>
                        <h3>Group description(optional)</h3>
                        <Textarea
                            style={{
                                maxWidth: "320px",
                            }}
                            name="description"
                            placeholder="Enter Group description"
                            id={"description"}
                            onChange={(e) => {
                                form.setFieldValue("description", e.target.value);
                            }}
                        />
                    </InputLabel>
                    <Divider style={{
                        marginTop: "0.125rem",
                        marginBottom: "0.125rem",
                    }}/>
                    <InputLabel>
                        <h3>Who use?</h3>
                        <RadioGroup
                            name="type"
                            color="success"
                            withAsterisk
                            defaultValue="me"
                            onChange={(value) => {
                                form.setFieldValue("type", value);
                            }}
                        >
                            <Box style={{
                                display: "flex",
                                gap: "2rem",
                                marginTop: "0.5rem"
                            }}>
                                <Radio label="Just me" value="me"/>
                                <Radio label="My company or team" value="ct"/>
                            </Box>
                        </RadioGroup>
                    </InputLabel>
                    {
                        form.getValues().type === "ct" && (
                          <>
                              <Divider style={{
                                  marginTop: "0.125rem",
                                  marginBottom: "0.125rem",
                              }}/>
                              <InputLabel>
                                  <h3>Owner Organization Name</h3>
                                  <Input
                                      style={{
                                          maxWidth: "320px",
                                      }}
                                      name="owner_org"
                                      placeholder="Enter Owner Organization"
                                      type="tel"
                                      id={"owner_org"}
                                      onChange={(e) => {
                                          form.setFieldValue("owner_org", e.target.value);
                                      }}
                                      onBlur={() => {
                                          form.validate();
                                      }}
                                  />
                              </InputLabel>
                          </>
                        )
                    }
                </div>
                <Divider style={{
                    marginTop: "1rem",
                    marginBottom: "2rem",
                }}/>
                <Button
                    onClick={Submit}
                    style={{
                        padding: "0.5rem 1rem",
                        width: "fit-content",
                        height: "fit-content",
                        backgroundColor: "#f15108"
                    }}>
                    <a style={{
                        color: "white"
                    }}>
                        Create Group
                    </a>
                </Button>
            </Form>
        </div>
    )
}