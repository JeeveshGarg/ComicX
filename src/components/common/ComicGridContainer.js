import { AspectRatio, Grid } from "@mui/joy";

const ComicGridContainer = ({ renderGridCells }) => {
  return (
    <AspectRatio
      ratio={2 / 3}
      sx={{
        width: "100%",
        maxWidth: 700,
        margin: "2rem auto",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#fff",
        }}
      >
        {renderGridCells()}
      </Grid>
    </AspectRatio>
  );
};

export default ComicGridContainer;
