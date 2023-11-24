import { AspectRatio, Box, Button, Textarea, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { GoCommandPalette } from "react-icons/go";
import getImagefromPrompt from "../../lib/apis/getImagefromPrompt";
import useEditStore from "../../store/useEditStore";
import { getPanelDataFromStore } from "../../store/getters";
import uploadImageToGcs from "../../lib/apis/uploadImageToGcs";
import { toast } from "react-toastify";

const ImageGenerator = ({ controller }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const panelData = useEditStore(getPanelDataFromStore);
  const comicId = useEditStore((state) => state.metadata.id);
  const panelIndex = useEditStore((state) => state.editPanelIdx);
  const updatePanel = useEditStore((state) => state.updateCurrentPanel);

  const handleChangePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const generateImage = async () => {
    setLoading(true);
    try {
      const imageBlob = await getImagefromPrompt(
        prompt,
        text,
        controller.signal
      );
      if (!imageBlob) {
        toast.error("Unable to generate image");
        return;
      }
      const imageUrl = await uploadImageToGcs(imageBlob, comicId, panelIndex);
      updatePanel({
        ...panelData,
        image: imageUrl,
        prompt,
        text,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Unable to generate image");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (panelData?.prompt) {
      setPrompt(panelData.prompt);
      setText(panelData.text);
    }
    return () => {
      setPrompt("");
      setText("");
      setLoading(false);
    };
  }, [panelData]);

  const hasImage = Boolean(panelData?.image);

  return (
    <>
      <Typography>Customise Image</Typography>
      <AspectRatio
        ratio={1}
        sx={{
          width: "20vw",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#4c4c4c",
            backgroundImage: hasImage ? `url(${panelData.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            cursor: "pointer",
            "&:hover": {
              filter: "brightness(0.8)",
            },
          }}
        >
        </Box>
      </AspectRatio>
      <Textarea
        placeholder="Enter prompt to generate image"
        maxRows={4}
        value={prompt}
        onChange={handleChangePrompt}
      />
      <Textarea
        placeholder="Enter bubble text"
        maxRows={4}
        value={text}
        onChange={handleChangeText}
      />
      <Button
        startDecorator={<GoCommandPalette />}
        sx={{
          width: {
            xs: "100%",
            sm: "auto",
          },
          ml: "auto",
        }}
        onClick={generateImage}
        loading={loading}
        disabled={loading || !prompt}
      >
        {panelData?.image ? "Regenerate" : "Generate"}
      </Button>
    </>
  );
};

export default ImageGenerator;
