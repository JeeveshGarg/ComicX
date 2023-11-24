import { AspectRatio, Box, Grid } from "@mui/joy";

const ViewGridCell = ({ xs, ratio, panel }) => {
  const hasImage = Boolean(panel?.image);
  const hasText = Boolean(panel?.text);

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
          }}
        >
        </Box>
      </AspectRatio>
    </Grid>
  );
};

export default ViewGridCell;
