import { create } from "zustand";

export interface Reciepe {
  id: number;
  name: string;
  ingrediants: string[];
  instructions: string;
}

interface ReciepesStore {
  reciepes: Reciepe[];
  addReciepe: (reciepe: Reciepe) => void;
  removeReciepe: (id: number) => void;
  editReciepe: (reciepe: Reciepe) => void;
}

export const useReciepe = create<ReciepesStore>((set) => ({
  reciepes: [],
  addReciepe: (reciepe: Reciepe) => {
    set((state) => ({ reciepes: [...state.reciepes, reciepe] }));
  },

  removeReciepe: (id: number) => {
    set((state) => ({ reciepes: state.reciepes.filter((r) => r.id !== id) }));
  },

  editReciepe: (reciepe: Reciepe) => {
    set((state) => ({
      reciepes: state.reciepes.map((rec) => {
        return rec.id === reciepe.id ? reciepe : rec;
      }),
    }));
  },
}));
