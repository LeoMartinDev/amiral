import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';

import listImages from '../core/api/images/list-images';
import { Image } from '../core/api/images.types';
import ImagesTable from './ImagesTable/ImagesTable';

export default function Images() {
  const [images, setImages] = useState<Image[]>([]);

  const getImages = async () => {
    const images = await listImages();

    setImages(() => images);
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
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
      }}
    >
      <ImagesTable images={images} />
    </Box>
  );
}
