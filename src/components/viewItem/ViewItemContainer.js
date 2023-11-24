import { Stack, Typography } from "@mui/joy";
import useViewStore from "../../store/useViewStore";
import ViewItemGrid from "./ViewItemGrid";

const ViewItemContainer = () => {
  const { title, lastEditedOn, description } = useViewStore(
    (state) => state.metadata
  );

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: 720,
        margin: "2rem auto",
      }}
      gap={2}
      p={2}
    >
      <ViewItemGrid />
    </Stack>
  );
};

export default ViewItemContainer;
