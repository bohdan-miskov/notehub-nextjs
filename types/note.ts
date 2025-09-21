export type Note = {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
