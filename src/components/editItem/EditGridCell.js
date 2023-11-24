import { AspectRatio, Box, Chip, Grid, Typography } from "@mui/joy";
import useEditStore from "../../store/useEditStore";
import { IoAddCircleOutline } from "react-icons/io5";

const EditGridCell = ({ xs, ratio, index, panel }) => {
  const setEditPanelIdx = useEditStore((state) => state.setEditPanelIdx);
  const hasImage = Boolean(panel?.image);

  return (
    <Grid xs={xs}>
      <AspectRatio ratio={ratio}>
        <Box
          sx={{
            backgroundColor: "#a0a0a0",
            backgroundImage: hasImage ? `url(${panel.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            cursor: "pointer",
            "&:hover": {
              filter: "brightness(0.8)",
            },
          }}
          onClick={() => setEditPanelIdx(index)}
        >
          {!hasImage && (
            <Typography
              fontSize={{
                xs: "0.7rem",
                sm: "1rem",
              }}
              textAlign="center"
              m={2}
            >
              <IoAddCircleOutline
                style={{ fontSize: "2rem", color: "#e75480" }}
              />
            </Typography>
          )}
        </Box>
      </AspectRatio>
    </Grid>
  );
};

export default EditGridCell;
