import {
  Box,
  Container,
  Group,
  Header,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

import { sumBy } from 'lodash-es';
import prettyBytes from 'pretty-bytes';
import { Container as ContainerIcon } from 'tabler-icons-react';
import { Image } from '../core/api/images/images.types';
import listImages from '../core/api/images/list-images';
import ImagesTable from './ImagesTable/ImagesTable';

export default function Images() {
  const [images, setImages] = useState<Image[]>([]);
  const [totalImagesSize, setTotalImagesSize] = useState(0);

  const getImages = async () => {
    const images = await listImages();

    setImages(() => images);

    setTotalImagesSize(() => sumBy(images, 'size') / 10);
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

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={(theme) => ({
          height: 70,
          padding: theme.spacing.sm,
          boxSizing: 'border-box',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Group>
          <ThemeIcon color="teal" variant="filled" sx={{ marginLeft: 1 }}>
            <ContainerIcon size={18} />
          </ThemeIcon>
          <Title order={2}>Images</Title>

          <Text>{images.length} images</Text>

          <Text>Total size: {prettyBytes(totalImagesSize)}</Text>
        </Group>
      </Box>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
        }}
        py="xs"
      >
        <ImagesTable images={images} />
      </Container>
    </Box>
  );
}
