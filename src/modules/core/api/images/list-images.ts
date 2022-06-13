import { invoke } from '@tauri-apps/api/tauri';
import { isEmpty } from 'lodash-es';
import { Image } from '../images.types';

type ListImagesResponse = {
  Id: string;
  Created: number;
  Containers: number;
  Labels: Record<string, string>;
  ParentId: string;
  RepoDigests: string[];
  RepoTags: string[];
  Size: number;
  SharedSize: number;
  VirtualSize: number;
}[];

export default async function listImages(): Promise<Image[]> {
  const imagesResponse: ListImagesResponse = await invoke('list_images');

  return imagesResponse.map((image) => ({
    id: image.Id,
    createdAt: new Date(image.Created * 1000),
    containers: image.Containers > -1 ? image.Containers : undefined,
    labels: image.Labels,
    parentId: isEmpty(image.ParentId) ? undefined : image.ParentId,
    repoDigests: image.RepoDigests,
    repoTags: image.RepoTags,
    size: image.Size > -1 ? image.Size : undefined,
    sharedSize: image.SharedSize > -1 ? image.SharedSize : undefined,
    virtualSize: image.VirtualSize > -1 ? image.VirtualSize : undefined,
  }));
}
