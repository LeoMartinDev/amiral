import { Group, Navbar, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Database,
} from 'tabler-icons-react';

function MenuItem({ icon, color, label }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <GitPullRequest size={16} />, color: 'blue', label: 'Pull Requests' },
  { icon: <AlertCircle size={16} />, color: 'teal', label: 'Open Issues' },
  { icon: <Messages size={16} />, color: 'violet', label: 'Discussions' },
  { icon: <Database size={16} />, color: 'grape', label: 'Databases' },
];

export default function AppNavbar() {
  const isSmAndUp = useMediaQuery('(min-width: 800px)');

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section grow mt="xs">
        <div>
          {data.map((link) => (
            <MenuItem {...link} key={link.label} />
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
