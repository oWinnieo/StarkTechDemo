import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

export type SearchState = {
  token: string | undefined;
  group: string | undefined;
  catg: string | undefined;
  setToken: (token: string | undefined) => void;
  setGroup: (token: string | undefined) => void;
  setCatg: (token: string | undefined) => void;
  mode: ThemeMode;
  toggleMode: () => void;
};

const store = create<SearchState>((set, get) => ({
  token: undefined,
  group: undefined,
  catg: undefined,
  setToken: (token) => set({ token }),
  setGroup: (group) => set({ group }),
  setCatg: (catg) => set({ catg }),
  mode: 'light',
  toggleMode: () =>
    set({
      mode: get().mode === 'light' ? 'dark' : 'light',
    }),
}));

export const useStore = <T>(selector: (state: SearchState) => T): T => store(selector);



