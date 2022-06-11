import { invoke } from '@tauri-apps/api/tauri';

export type Image = {
  id: string;
  parentId: string;
  repoTags: Record<string, string>;
  repoDigests: Record<string, string>;
  created: number;
  size: number;
  sharedSize: number;
  virtualSize: number;
  labels: Record<string, string>;
  containers: number;
};

type ListImagesResponse = {
  id: string;
  parent_id: string | null;
  repo_tags: Record<string, string>;
  repo_digests: Record<string, string>;
  created: number;
  size: number;
  shared_size: number;
  virtual_size: number;
  labels: Record<string, string>;
  containers: number;
}[];

export default async function listImages() {
  // const imagesResponse: ListImagesResponse = await invoke('list_images');
  const imagesResponse: ListImagesResponse = [
    {
      id: 'test',
      parent_id: null,
      repo_tags: ['test:latest'],
      repo_digests: ['sha:test'],
      created:,
      size:,
      shared_size:,
      virtual_size:,
      labels: ,
      containers:,
    }
  ];

  return imagesResponse.map((image) => ({
    id: image.id,
    parentId: image.parent_id,
    repoTags: image.repo_tags,
    repoDigests: image.repo_digests,
    created: image.created,
    size: image.size,
    sharedSize: image.shared_size,
    virtualSize: image.virtual_size,
    labels: image.labels,
    containers: image.containers,
  }));
}
