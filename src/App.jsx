import './App.css';

import { useEffect, useState } from 'react';
import { MantineProvider, ColorSchemeProvider, AppShell } from '@mantine/core';
import { theme } from './theme';
import { useColorScheme } from '@mantine/hooks';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './modules/layout/Navbar';
import { Routes } from './modules/core/Routes';
import getInfo from './modules/core/api/get-info';

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const [info, setInfo] = useState(null);

  const getInfoData = async () => {
    const info = await getInfo();

    setInfo(() => info);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getInfoData();
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, []);

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
            navbar={
              <Navbar
                toggleColorScheme={toggleColorScheme}
                colorScheme={colorScheme}
              />
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
