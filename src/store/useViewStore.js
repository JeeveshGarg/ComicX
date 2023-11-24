import { create } from "zustand";

const initialState = {
  metadata: null,
  panels: null,
  loading: true,
};

const useViewStore = create((set) => ({
  ...initialState,
  setViewStore: ({ metadata, panels }) => set({ metadata, panels }),
  setLoading: (loading) => set({ loading }),
  resetViewStore: () => set(initialState),
}));

export default useViewStore;
