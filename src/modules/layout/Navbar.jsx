import {
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
import { ROUTES } from '../core/Routes';
import convertHexToRGBA from '../utils/convertHexToRGBA';

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
          ? convertHexToRGBA(colorSet.at(7), 0.5)
          : colorSet.at(0),
    },
    buttonHover: {
      ...(!isLightMode && {
        backgroundColor: convertHexToRGBA(colorSet.at(5), 0.9),
      }),
      ...(isLightMode && {
        zIndex: 10,
        minWidth: 170,
        backgroundColor: convertHexToRGBA(colorSet.at(5), 0.9),
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
      <Group sx={{ cursor: 'pointer' }}>
        <ThemeIcon color={color} variant="filled">
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

export default function AppNavbar() {
  const theme = useMantineTheme();
  const isSmAndUp = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  const routes = ROUTES.filter(({ meta }) => !!meta);

  return (
    <Navbar width={{ base: isSmAndUp ? 200 : 70 }} p="xs">
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
    </Navbar>
  );
}
