import { NOTE_DRAFT_KEY } from '@/constants';
import { NoteCreatePayload } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
  draft: NoteCreatePayload;
  hasHydrated: boolean;
  setDraft: (newDraft: NoteCreatePayload) => void;
  clearDraft: () => void;
};

const initialDraft: NoteCreatePayload = {
  title: '',
  content: '',
  tag: '',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      hasHydrated: false,
      setDraft: newDraft =>
        set(() => ({
          draft: newDraft,
        })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: NOTE_DRAFT_KEY,
      partialize: state => ({ draft: state.draft }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
