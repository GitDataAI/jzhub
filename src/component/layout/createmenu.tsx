import {ActionIcon, Menu, MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTarget} from "@mantine/core";
import {IoIosAdd} from "react-icons/io";
import {useRouter} from "next/navigation";

export const Createmenu = () => {
    const nav = useRouter().replace;
    return (
        <div>
            <Menu shadow={"md"} width={200}>
                <MenuTarget>
                    <ActionIcon variant="filled" aria-label="create" style={{
                        border: "1px #c2c2c2 solid",
                        width: 30,
                        height: 30,
                    }}>
                        <IoIosAdd size={18} color="black"/>
                    </ActionIcon>
                </MenuTarget>
                <MenuDropdown>
                    <MenuDivider/>
                    <MenuLabel>
                        Repository
                    </MenuLabel>
                    <MenuItem onClick={()=>{
                        nav("/r/create");
                    }}>
                        Create Repository
                    </MenuItem>
                    <MenuItem>
                        Import Repository
                    </MenuItem>
                    <MenuDivider/>
                    <MenuLabel>
                        Project
                    </MenuLabel>
                    <MenuItem>
                        Create Project
                    </MenuItem>
                    <MenuDivider/>
                    <MenuLabel>
                        Organization
                    </MenuLabel>
                    <MenuItem>
                        Create Team
                    </MenuItem>
                    <MenuItem>
                        Create Group
                    </MenuItem>
                </MenuDropdown>
            </Menu>
            <div style={{
                position: "fixed",
                zIndex: 9999,
            }}>

            </div>
        </div>
    )
}