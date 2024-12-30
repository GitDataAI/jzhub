import React, {forwardRef} from "react";
import {Avatar, Group, Text, UnstyledButton} from "@mantine/core";
import {FaAngleRight} from "react-icons/fa";

interface UserAvatarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    hasAvatar: boolean,
    icon?: React.ReactNode;
}

const UserAvatarButton = forwardRef<HTMLButtonElement, UserAvatarButtonProps>(
    ({ image, name, email, icon, hasAvatar,...others }: UserAvatarButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            {...others}
        >
            <Group>
                {
                    hasAvatar ? (
                        <Avatar src={image} radius="xl" />
                    ): (
                        <Avatar color="gray" radius="xl">
                            {image}
                        </Avatar>
                    )
                }
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <FaAngleRight /> }
            </Group>
        </UnstyledButton>
    )
);

export default UserAvatarButton;
export type {UserAvatarButtonProps};