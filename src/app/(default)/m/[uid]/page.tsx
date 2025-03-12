'use client'

import usePageContext from "@/store/usePageContext";
import {ProductList} from "@/server/types";
import {useEffect, useState} from "react";
import {Button} from "@mantine/core";
import {RepoApi} from "@/server/RepoApi";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {useRouter} from "next/navigation";
dayjs.extend(relativeTime)
export default function MarketPage() {
    const context = usePageContext();
    const [Product, setProduct] = useState<ProductList | undefined>();
    const [Readme, setReadme] = useState<string>("")
    const repo_api = new RepoApi();
    const nav = useRouter().replace;

    useEffect(() => {
        if (context.productCTX) {
            const ctx = context.productCTX;
            setProduct(ctx);
            repo_api.File(
                ctx.owner.username,
                ctx.repo.name,
                "README.md",
                ctx.data.hash,
            )
                .then(res=>{
                    if (res.status === 200) {
                        setReadme(res.data.toString())
                    }
                })
        }
    }, []);

    return(
        <>
            {
                Product && <div className={'market-page'}>
                    <div className="market-page-title">
                        <div style={{
                            display: "flex"
                        }}>
                            <img src={Product.owner.avatar || ""} alt={Product.data.name}/>
                            <div>
                                <h1>{Product.data.name}</h1>
                                <span>{Product.data.description}</span>
                            </div>
                        </div>


                    </div>
                    <div className={'market-page-body'}>
                        <div className={'market-page-markdown'}>
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    code: ({node, inline, className, children, ...props}) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <div className="code-block">
                                                <code className={className}>{children}</code>
                                            </div>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {Readme}
                            </ReactMarkdown>
                        </div>
                        <div className="market-page-info">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }}>
                                Price: {
                                Product.data.price === 0 ? <a style={{
                                    color: "green"
                                }}>Free</a> : <a style={{
                                    color: "red"
                                }}>{Product.data.price}</a>
                            }
                                <div className="access">
                                    <Button>Get Access</Button>
                                </div>
                            </div>

                            <div>
                                License: {Product.data.license}
                            </div>
                            <div className="hover" onClick={()=>{
                                nav(`/r/${Product?.owner.username}/${Product?.repo.name}?tab=intro`)
                            }}>
                                Repo: {Product.owner.username} / {Product.repo.name}
                            </div>
                            <div className="hover" onClick={()=>{
                                nav(`/u/${Product?.owner.username}`)
                            }}>
                                Owner: {Product.owner.username}
                            </div>
                            <div>
                                Created At: {Product.data.created_at.toString().split(".")[0]}
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '5px'
                            }}>
                                Tags: {
                                Product.data.type.split(",").map((value, index)=>{
                                    return <span style={{
                                        color: "black",
                                        backgroundColor: "orangered",
                                        borderRadius: "5px",
                                        padding: "0 5px",
                                    }} key={index}>{value}</span>
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}