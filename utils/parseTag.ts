import { TAG, TAGS_ARRAY } from '@/constants';

export function parseTagFromArray(slug: string[]) {
  return TAGS_ARRAY.includes(slug[0] as TAG) ? (slug[0] as TAG) : undefined;
}
