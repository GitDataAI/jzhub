import {Group, HoverCard, HoverCardDropdown, HoverCardTarget} from "@mantine/core";
import {useRouter} from "next/navigation";

export const HeaderUnstatus = () => {
    const nav = useRouter().replace;
    return (
        <Group className="header-menu">
            <HoverCard width={280} shadow="md" closeDelay={300}>
                <HoverCardTarget>
                    <span>Product</span>
                </HoverCardTarget>
                <HoverCardDropdown>

                </HoverCardDropdown>
            </HoverCard>
            <HoverCard width={280} shadow="md" closeDelay={300}>
                <HoverCardTarget>
                    <span>Solutions</span>
                </HoverCardTarget>
                <HoverCardDropdown>

                </HoverCardDropdown>
            </HoverCard>
            <HoverCard width={280} shadow="md" closeDelay={300}>
                <HoverCardTarget>
                    <span>Resources</span>
                </HoverCardTarget>
                <HoverCardDropdown>
                </HoverCardDropdown>
            </HoverCard>
            <HoverCard width={280} shadow="md" closeDelay={300}>
                <HoverCardTarget>
                    <span>Enterprise</span>
                </HoverCardTarget>
                <HoverCardDropdown>
                </HoverCardDropdown>
            </HoverCard>
            <span onClick={() => nav("/pre/markplace")}>
                MarketPlace
            </span>
            <span onClick={() => nav("/explore")}>
                Explore
            </span>
            <span>
                Pricing
            </span>
        </Group>
    )
}