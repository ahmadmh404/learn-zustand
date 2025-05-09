import { create } from "zustand";

export interface Expence {
  id: number;
  desc: string;
  amount: number;
  isPinned: boolean;
}

interface ExpenceStore {
  expences: Expence[];
  addExpence: (expence: Expence) => void;
  removeExpence: (id: number) => void;
  editExpence: (expence: Expence) => void;
  searchExpences: (search: string) => void;
  pinExpence: (id: number) => void;
}

export const useStore = create<ExpenceStore>((set) => ({
  expences: [],
  addExpence: (expence: Expence) => {
    set((state) => ({ expences: [...state.expences, expence] }));
  },

  removeExpence: (id: number) => {
    set((state) => ({ expences: state.expences.filter((ex) => ex.id !== id) }));
  },

  editExpence: (expence: Expence) => {
    set((state) => ({
      expences: state.expences.map((exp) => {
        return exp.id === expence.id ? expence : exp;
      }),
    }));
  },

  searchExpences: (search: string) => {
    set((state) => ({
      expences: state.expences.filter((exp) => {
        return exp.desc.toLowerCase().includes(search.toLowerCase());
      }),
    }));
  },

  pinExpence: (id: number) => {
    set((state) => ({
      expences: state.expences.map((exp) => {
        return exp.id === id ? { ...exp, isPinned: !exp.isPinned } : exp;
      }),
    }));
  },
}));
