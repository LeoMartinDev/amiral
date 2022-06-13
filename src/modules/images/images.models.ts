import { formatDuration, intervalToDuration } from 'date-fns';
import prettyBytes from 'pretty-bytes';

import { Image } from '../core/api/images.types';

function formatCreatedAt(createdAt: Date): string {
  const duration = intervalToDuration({ start: createdAt, end: new Date() });

  return formatDuration(duration);
}

function formatOneImage(image: Image) {
  return {
    name: (image.repoTags[0] || '<none>:<none>').split(':')[0],
    tag: (image.repoTags[0] || '<none>:<none>').split(':')[1],
    created: formatCreatedAt(image.createdAt),
    size: prettyBytes(image.size || image.virtualSize || 0),
  };
}

export function formatImages(images: Image[]) {
  return images.map((image) => formatOneImage(image));
}
