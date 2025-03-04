import {Button, Modal, Select} from "@mantine/core";
import {Branches, Repository} from "@/server/types";
import {useDisclosure} from "@mantine/hooks";
import {CloneModel} from "@/component/repo/clone";

interface FileActionProps {
    branch: Branches[],
    default_branch: Branches,
    echange: (branch: Branches) => void,
    repo: Repository,
    owner: string
}

export const FileAction = ({branch, default_branch, echange, repo, owner}: FileActionProps) => {
    const [opened, {open, close}] = useDisclosure(false);
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
            </div>
            <div className="file-action-right">
                <Button onClick={open}>Clone</Button>
                <Button>Publish</Button>
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