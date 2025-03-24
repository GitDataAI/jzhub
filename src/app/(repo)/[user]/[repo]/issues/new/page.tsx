'use client'

import {Box, Fieldset, Input, InputLabel, Textarea} from "@mantine/core";
import {useState} from "react";
import Markdown from "react-markdown";
import remark_gfm from "remark-gfm";
import remark_breaks from "remark-breaks";

export default function Page() {
    const [Body, setBody]= useState<string>("");
    const [Title, setTitle] = useState<string>("");
    return(
        <div>
            <h1 style={{
                fontSize: "2rem",
                fontWeight: 700
            }}>New Issues</h1>
            <div style={{
                marginTop: "1rem",
                display: "flex",
                gap: "1rem",
                flexDirection: "column"
            }}>
                <InputLabel>
                    <span>Title(required)</span>
                    <Input value={Title} onChange={(e)=>{
                        setTitle(e.target.value)
                    }}/>
                </InputLabel>
                <InputLabel>
                    <span>Description</span>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        minWidth: "60vh",
                    }}>
                        <Fieldset legend="Markdown" className="md" style={{
                            border: "1px #d4d4d4 solid",

                        }}>
                            <Textarea
                                onChange={(e)=>{
                                    setBody(e.target.value)
                                }}
                                autosize
                                minRows={10}
                                value={Body}
                            />
                        </Fieldset>

                        <Fieldset  legend="Preview" className="md" style={{
                            border: "1px #d4d4d4 solid",
                            margin: "0 1rem",
                        }}>
                            <Markdown remarkPlugins={
                                [
                                    remark_gfm,
                                    remark_breaks,
                                ]
                            }>
                                {Body}
                            </Markdown>
                        </Fieldset>
                    </div>
                </InputLabel>
                <Box>
                    <button style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px #d4d4d4 solid",
                        backgroundColor: "#f15108",
                        cursor: "pointer",
                        color: "#fff",
                    }}>
                        Create
                    </button>
                    <button style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        border: "1px #d4d4d4 solid",
                        backgroundColor: "#f0f0f0",
                        cursor: "pointer",
                        marginLeft: "1rem",
                    }}>
                        Cancel
                    </button>
                </Box>
            </div>
        </div>
    )
}