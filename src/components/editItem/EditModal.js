import React from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import useEditStore from "../../store/useEditStore";
import EditModalContent from "./EditModalContent";

const EditModal = () => {
  const showModal = useEditStore((state) => state.showEditDrawer);
  const resetEditPanelIdx = useEditStore((state) => state.resetEditPanelIdx);
  const controller = new AbortController();

  const handleDialogClose = () => {
    resetEditPanelIdx();
    controller.abort(); // abort any pending image generation
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleDialogClose}
      TransitionComponent={Slide}
      keepMounted
      fullWidth
      maxWidth="sm"
    >
      <DialogContent sx={{ p: 3, bgcolor: "transparent", overflow: "hidden" }}>
        <EditModalContent controller={controller} />
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
