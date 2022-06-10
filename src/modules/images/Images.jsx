import { createStyles, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function Images() {
  const getImages = async () => {
    // const images = await invoke('list_images');
    // console.log(images);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getImages();
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, []);

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // const rows = data.map((row) => (
  //   <tr key={row.name}>
  //     <td>{row.name}</td>
  //     <td>{row.email}</td>
  //     <td>{row.company}</td>
  //   </tr>
  // ));

  return (
    <ScrollArea
      sx={{ flex: 1, height: '100%' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        {/* <tbody>{rows}</tbody> */}
      </Table>
    </ScrollArea>
  );
}