export enum TAG {
  Todo = 'Todo',
  Work = 'Work',
  Personal = 'Personal',
  Meeting = 'Meeting',
  Shopping = 'Shopping',
}

export const TAGS_ARRAY = Object.values(TAG);

export const MAX_PAG_COUNT = 6;

export const PAGE_BASE_URL = 'https://notehub-nextjs.vercel.app';

export const OG_IMAGE_URL =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const NOTE_DRAFT_KEY = 'note-draft';

export const PER_PAGE = 12;
