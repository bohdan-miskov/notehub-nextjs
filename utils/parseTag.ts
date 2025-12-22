export function parseTagFromArray(tags: string[], slug: string[]) {
  return tags.includes(slug[0]) ? slug[0] : undefined;
}
