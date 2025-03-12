import {BranchModel, CommitModel, Repository} from "@/server/types";
import {useEffect, useState} from "react";
import {RepoApi} from "@/server/RepoApi";
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import {Button, Input} from "@mantine/core";
import ClipboardJS from "clipboard";
import {notifications} from "@mantine/notifications";
import {FaRegClipboard} from "react-icons/fa";
import usePageContext from "@/store/usePageContext";
import {debounce} from "lodash";

interface RepoIntroProps {
    repo: Repository,
    owner: string,
    branch: BranchModel,
    head: CommitModel,
    empty: boolean
}

export const RepoIntro = ({repo, owner, head}: RepoIntroProps) => {
    const [README, setREADME] = useState<string>();
    const api = new RepoApi();
    const http = "https://" + window.location.host + "/git/" + owner + "/" + repo.name + ".git"
    const ssh = "git@" + window.location.host.split(":")[0] + ":" + owner + "/" + repo.name + ".git";
    const context = usePageContext();
    const Init = debounce(async () => {
        const readme = await api.File(owner, repo.name, "README.md", head.id);
        if (readme.status === 200 && readme.data) {
            const buffer = readme.data;
            setREADME(buffer.toString())
        }
    },300)
    useEffect(() => {
        Init();
    }, []);
    return (
        <div className="repo-intro">
            <div className="repo-readme">
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
                    {README}
                </ReactMarkdown>
            </div>
            <div className="repo-intro-card">
                <div className="repo-intro-card-title">
                    <h1>{repo.name}</h1>
                    <span>{repo.description}</span>
                </div>
                <div className="clone-url">
                    <div>
                        <span>HTTP</span>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "85%"
                                }}
                                disabled value={http} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={() => {
                                ClipboardJS.copy(http);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <span>SSH</span>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "85%"
                                }}
                                disabled value={ssh} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={() => {
                                ClipboardJS.copy(ssh);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="repo-intro-card-list">
                    <div className="repo-intro-card-list-item">
                        <span>
                            Star
                        </span>
                        <a>{repo.nums_star}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Fork
                        </span>
                        <a>{repo.nums_fork}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Watch
                        </span>
                        <a>{repo.nums_watch}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Issue
                        </span>
                        <a>{repo.nums_issue}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Pull Request
                        </span>
                        <a>{repo.nums_pullrequest}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Commit
                        </span>
                        <a>{repo.nums_commit}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Branch
                        </span>
                        <a>{repo.nums_branch}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Tag
                        </span>
                        <a>{repo.nums_tag}</a>
                    </div>
                    <div className="repo-intro-card-list-item">
                        <span>
                            Release
                        </span>
                        <a>{repo.nums_release}</a>
                    </div>
                    {
                        context.repoCtx && (
                            <div className="repo-intro-card-list-item">
                                <span>
                                    Product
                                </span>
                                <a>{context.repoCtx.products.length}</a>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}