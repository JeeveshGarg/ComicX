import { DialogTitle, Divider, ModalClose, Stack } from "@mui/joy";
import useEditStore from "../../store/useEditStore";
import ImageGenerator from "./ImageGenerator";

const EditModalContent = ({ controller }) => {
  const editPanelIdx = useEditStore((state) => state.editPanelIdx) ?? 0;
  return (
    <Stack gap={2}>
      <DialogTitle>Edit panel {editPanelIdx + 1}</DialogTitle>
      <ModalClose />
      <Divider />
      <ImageGenerator controller={controller} />
    </Stack>
  );
};

export default EditModalContent;
