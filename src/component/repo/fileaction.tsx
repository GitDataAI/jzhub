import {Button, HoverCard, HoverCardDropdown, HoverCardTarget, Modal, Select} from "@mantine/core";
import {BranchModel, CommitModel, Repository} from "@/server/types";
import {useDisclosure} from "@mantine/hooks";
import {CloneModel} from "@/component/repo/clone";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";

interface FileActionProps {
    branch: BranchModel[],
    default_branch: BranchModel,
    echange: (branch: BranchModel) => void,
    repo: Repository,
    owner: string,
    head: CommitModel
}

export const FileAction = ({branch, default_branch, echange, repo, owner, head}: FileActionProps) => {
    const [opened, {open, close}] = useDisclosure(false);
    const nav = useRouter().replace;
    const relative_time = () => {
        if (head) {
            const date = new Date(Number(head.time) * 1000);
            const to_now = dayjs().to(dayjs(date));
            return <>{to_now}</>
        } else {
            return <>N/A</>
        }
    }
    return (
        <div className="file-action">
            <div className="file-action-left">
                <Select
                    className="branch-switch"
                    data={
                        branch.map((item) => {
                            return {
                                value: item.name,
                                label: item.name
                            }
                        })
                    }
                    defaultValue={default_branch.name}
                    onChange={(value) => {
                        if (value) {
                            const new_branch = branch.find((item) => {
                                return item.name === value;
                            });
                            if (new_branch) {
                                echange(new_branch);
                            }
                        }
                    }}
                    disabled={branch.length <= 1}
                />
                <HoverCard>
                    <HoverCardTarget>
                        <a style={{
                            whiteSpace: "nowrap"
                        }}>{head.message}</a>
                    </HoverCardTarget>
                    <HoverCardDropdown>
                        <div>
                            <div>
                                {head.author}
                            </div>
                            <div>
                                {relative_time()}
                            </div>
                        </div>
                    </HoverCardDropdown>
                </HoverCard>
            </div>
            <div className="file-action-right">
                <Button onClick={open}>Clone</Button>
                <Button onClick={()=>nav(`/r/${owner}/${repo.name}/post`)}>Publish</Button>
                <div className="cmt">
                    <a>{head.id.substring(0, 7)} {relative_time()}</a>
                    <a>{repo.nums_commit} commits</a>
                </div>
            </div>
            <div style={{
                position: "fixed",
                zIndex: "9999",
            }}>
                <Modal opened={opened} onClose={close} title={"Clone " + repo.name}>
                    <CloneModel repo={repo} owner={owner}/>
                </Modal>
            </div>
        </div>
    )
}