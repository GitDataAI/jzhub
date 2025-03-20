import {RepoFileBranch} from "@/component/repo/RepoFile";
import {ActionIcon, Box, Button, Divider, Popover, PopoverDropdown, PopoverTarget, Select} from "@mantine/core";
import {BiGitBranch} from "react-icons/bi";
import {FiGitBranch} from "react-icons/fi";
import {useClipboard} from "@mantine/hooks";
import {MdOutlineContentCopy} from "react-icons/md";
import {FaCheck} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import {useEffect, useState} from "react";

export interface RepoFileHeaderProps {
    branch: RepoFileBranch[],
    current: RepoFileBranch,
    repo_name: string,
    repo_uid: string,
    owner_name: string,
    owner_uid: string,
    ExChange: (branch: RepoFileBranch) => void,
}


export const RepoFileHeader = (props: RepoFileHeaderProps) => {
    const clipboard_http = useClipboard({ timeout: 500 });
    const clipboard_ssh = useClipboard({ timeout: 500 });
    const [Url, setUrl] = useState({
        http: "",
        ssh: ""
    })
    useEffect(() => {
        const local = window.location.hostname;
        setUrl({
            http: `https://${local}/${props.owner_name}/${props.repo_name}.git`,
            ssh: `git@${local}:${props.owner_name}/${props.repo_name}.git`,
        });
    }, []);
    return(
        <div className="repo-file-header">
            <div className="repo-file-header-left">
                <Select
                    leftSection={<BiGitBranch/>}
                    className="repo-file-header-branch"
                    value={props.current.name}
                    onChange={(value) => {
                        if (value) {
                            const branch = props.branch.find((branch) => branch.name === value);
                            if (branch) {
                                props.ExChange(branch);
                            }
                        }
                    }}
                    data={props.branch.map((branch) => ({
                        value: branch.name,
                        label: branch.name,
                    }))}
                    withAsterisk
                />
                <a><FiGitBranch/>{props.branch.length} Branches</a>
            </div>
            <div className="repo-file-header-right">
                <div>
                    {
                        props.current.active && (
                            <div className="lastCommit">
                                {props.current.active.id.slice(0,7)}
                            </div>
                        )
                    }
                </div>
                <Popover position="bottom">
                    <PopoverTarget>
                        <Button style={{
                            padding: "0px 12px",
                            height: "32px",
                            backgroundColor: "#f1520a",
                        }}>Clone<IoIosArrowDown /></Button>
                    </PopoverTarget>
                    <PopoverDropdown>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",

                        }}>
                            <b>Clone with SSH</b>
                            <Box style={{
                                display: "flex",
                                gap: "10px",
                            }}>
                                <div style={{
                                    flex: 1,
                                    backgroundColor: "#f2f2f2",
                                    padding: "2px 1rem",
                                    borderRadius: "5px",
                                }}>
                                    {` git clone ${Url.ssh}`}
                                </div>
                                <ActionIcon style={{
                                    backgroundColor: "#f15108",
                                }} onClick={() => {
                                    clipboard_ssh.copy("git clone git@"+window.location.hostname + `:${props.owner_name}/${props.repo_name}.git`);
                                }}>{
                                    !clipboard_ssh.copied ? <MdOutlineContentCopy/> : <FaCheck/>
                                }</ActionIcon>
                            </Box>
                            <b>Clone with HTTPS</b>
                            <Box style={{
                                display: "flex",
                                gap: "10px",
                            }}>
                                <div style={{
                                    flex: 1,
                                    backgroundColor: "#f2f2f2",
                                    padding: "2px 1rem",
                                    borderRadius: "5px",
                                }}>
                                    {`git clone ${Url.http}`}
                                </div>
                                <ActionIcon style={{
                                    backgroundColor: "#f15108",
                                }} onClick={() => {
                                    clipboard_http.copy("git clone https://"+window.location.hostname + `/${props.owner_name}/${props.repo_name}.git`);
                                }}>{
                                    !clipboard_http.copied ? <MdOutlineContentCopy/> : <FaCheck/>
                                }</ActionIcon>
                            </Box>
                            <Divider/>
                        </div>
                    </PopoverDropdown>
                </Popover>
            </div>
        </div>
    )
}