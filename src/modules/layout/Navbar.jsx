import {
  ActionIcon,
  Center,
  createStyles,
  Group,
  Navbar,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useHover, useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { MoonStars, Sun } from 'tabler-icons-react';
import { ROUTES } from '../core/Routes';

const useStyles = createStyles((theme, { isLightMode, color }) => {
  const colorSet = theme.colors[color || 'blue'];

  return {
    button: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(colorSet.at(7), 0.5)
          : colorSet.at(0),
    },
    buttonHover: {
      ...(!isLightMode && {
        backgroundColor: theme.fn.rgba(colorSet.at(5), 0.9),
      }),
      ...(isLightMode && {
        zIndex: 10,
        minWidth: 170,
        backgroundColor: colorSet.at(5),
      }),
    },
    text: {
      color: theme.colorScheme === 'dark' ? colorSet.at(2) : colorSet.at(6),
    },
    textHover: {
      color: theme.white,
    },
  };
});

function MenuItem({ meta, path, isLightMode }) {
  const { icon, color, title } = meta;
  const { hovered, ref } = useHover();
  const { classes, cx } = useStyles({ isLightMode, color });

  return (
    <UnstyledButton
      ref={ref}
      component={Link}
      to={path}
      className={cx(classes.button, { [classes.buttonHover]: hovered })}
    >
      <Group
        sx={{
          cursor: 'pointer',
        }}
      >
        <ThemeIcon color={color} variant="filled" sx={{ marginLeft: 1 }}>
          {icon({ size: 16 })}
        </ThemeIcon>

        {(!isLightMode || (isLightMode && hovered)) && (
          <Text
            size="sm"
            className={cx(classes.text, { [classes.textHover]: hovered })}
          >
            {title}
          </Text>
        )}
      </Group>
    </UnstyledButton>
  );
}

export default function AppNavbar({ toggleColorScheme, colorScheme }) {
  const theme = useMantineTheme();
  const isSmAndUp = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  const routes = ROUTES.filter(({ meta }) => !!meta);

  return (
    <Navbar width={{ base: isSmAndUp ? 200 : 70 }} height="100%" p="xs">
      <Navbar.Section grow mt="xs">
        <Stack spacing="xs">
          {routes.map((route) => (
            <MenuItem
              {...route}
              isLightMode={!isSmAndUp}
              key={route.meta.title}
            />
          ))}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Center>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
}
