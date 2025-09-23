import { TAG } from '@/constants';

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: TAG;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteCreatePayload = Pick<Note, 'title' | 'content' | 'tag'>;

export type NoteUpdatePayload = Partial<NoteCreatePayload>;
