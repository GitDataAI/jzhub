import {Group, HoverCard, HoverCardDropdown, HoverCardTarget} from "@mantine/core";

export const HeaderUnstatus = () => {
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
            <span>
                Pricing
            </span>
        </Group>
    )
}