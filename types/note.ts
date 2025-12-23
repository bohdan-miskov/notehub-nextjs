export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteCreatePayload = Pick<Note, 'title' | 'content' | 'tag' | 'isDone'>;

export type NoteUpdatePayload = NoteCreatePayload;

type SortBy = 'created' | 'updated';

export type NotesSearchParams = {
  search?: string;
  tag?: string;
  page?: number;
  sortBy?: SortBy;
};

export type NoteResponse = {
  data: Note[];
  totalPages: number;
};
