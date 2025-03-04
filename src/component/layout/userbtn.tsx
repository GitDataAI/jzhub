import {Avatar, Group, Text, UnstyledButton} from '@mantine/core';
import {RightArrow} from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";
import {forwardRef} from 'react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({image, name, email, icon, ...others}: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-md)',
                color: 'var(--mantine-color-text)',
                borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl"/>

                <div style={{flex: 1}}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <RightArrow/>}
            </Group>
        </UnstyledButton>
    )
);