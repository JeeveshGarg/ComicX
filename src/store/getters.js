export const getPanelDataFromStore = (state) => {
  if (state.editPanelIdx === null) return null;
  if (state.panels.length === 0) return null;
  return state.panels[state.editPanelIdx];
};
