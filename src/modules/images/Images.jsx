import { Text } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect } from 'react';

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

  return <Text>Images</Text>;
}
