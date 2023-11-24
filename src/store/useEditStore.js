import { create } from "zustand";

export const defaultPanel = {
  image: null,
  prompt: "",
  text: "",
};

const initialState = {
  metadata: {
    title: "",
    description: "",
    lastEditedOn: "",
    author: "",
    shareToken: "",
    id: "",
  },
  panels: Array(10).fill(defaultPanel),
  showEditDrawer: false,
  editPanelIdx: null,
};

const useEditStore = create((set) => ({
  ...initialState,
  setEditStore: ({ metadata, panels }) => set({ metadata, panels }),
  resetEditStore: () => set(initialState),

  updateMetadata: (metadata) => set({ metadata }),

  updateCurrentPanel: (panel) =>
    set((state) => {
      const panels = [...state.panels];
      panels[state.editPanelIdx] = panel;
      return { panels };
    }),

  setEditPanelIdx: (idx) => set({ editPanelIdx: idx, showEditDrawer: true }),
  resetEditPanelIdx: () => set({ editPanelIdx: null, showEditDrawer: false }),
}));

export default useEditStore;
