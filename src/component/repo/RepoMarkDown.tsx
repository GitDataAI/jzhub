'use client'
import {useEffect, useState} from "react";
import Markdown from "react-markdown";

import remark_gfm from "remark-gfm";

import remark_breaks from "remark-breaks";

export interface RepoMarkDownProps {
    owner: string,
    repo: string,
    sha: string,
    path: string,
}


export const RepoMarkDown = (props: RepoMarkDownProps) => {
    const [MarkDown, setMarkDown] = useState<string>("");
    useEffect(() => {
        const fetchMarkDown = async () => {
            setMarkDown("")
            const res = await fetch(`/api/v1/repo/${props.owner}/${props.repo}/blob`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inner: {
                        path: props.path,
                        sha: props.sha,
                    },
                    unix: parseInt(String(new Date().getTime() / 1000)),
                    device: "N/A",
                }),
            });
            if (res.status === 200) {
                const buffer = await res.bytes();
                const decoder = new TextDecoder("utf-8");
                setMarkDown(decoder.decode(buffer).toString())
            }
        };
        fetchMarkDown();
    }, [props.sha, props.path]);
    return (
        <div >
            {
                MarkDown !== ""&& (
                    <div className="markdown-card">
                        <div className="markdown-title">
                            {props.path}
                        </div>
                        <div className="md">
                            <Markdown remarkPlugins={
                                [
                                    remark_gfm,
                                    remark_breaks,
                                ]
                            }>
                                {MarkDown}
                            </Markdown>
                        </div>

                    </div>
                )
            }
        </div>
    );
};