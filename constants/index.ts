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

export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const ERROR_MESSAGES = {
  400: 'Your data is invalid',
  401: 'Authentication failed. Please try again later.',
  404: 'Not found',
  422: 'Validation error. Please check your input data.',
  500: 'Server error. Please try again later.',
};

export type ERROR_CODES = keyof typeof ERROR_MESSAGES;

export const DEFAULT_ERROR = 'Something was wrong!';
