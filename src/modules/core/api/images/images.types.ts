export type Image = {
  id: string;
  createdAt: Date;
  containers?: number;
  labels: Record<string, string>;
  parentId?: string;
  repoDigests: string[];
  repoTags: string[];
  size: number;
  sharedSize?: number;
  virtualSize?: number;
};
