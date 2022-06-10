import './App.css';

import { useEffect, useState } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Header,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import { theme } from './theme';
import { useColorScheme } from '@mantine/hooks';
import { MemoryRouter } from 'react-router-dom';
import { Sun, MoonStars } from 'tabler-icons-react';
import Navbar from './modules/layout/Navbar';
import { Routes } from './modules/core/Routes';

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MemoryRouter>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ ...theme, colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppShell
            navbarOffsetBreakpoint="sm"
            padding="md"
            sx={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
            }}
            navbar={<Navbar />}
            header={
              <Header height={60}>
                <Group sx={{ height: '100%' }} px={20} position="apart">
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
                </Group>
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Routes />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </MemoryRouter>
  );
}

export default App;
