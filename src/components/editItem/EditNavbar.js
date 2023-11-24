import { Button, IconButton, Menu, MenuItem, Stack, Typography,} from "@mui/joy";
import useEditStore from "../../store/useEditStore";
import { MdSave } from "react-icons/md";
import { useState } from "react";
import NavModal from "./NavModal";
import Navbar from "../common/Navbar";
import { useSaveComic } from "../../lib/utils";
import { Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
  
const getStoreData = (state) => ({
  title: state.metadata.title,
  shareToken: state.metadata.shareToken,
});
  
const EditNavbar = () => {
    const { title, shareToken } = useEditStore(getStoreData);

    const [showEditModal, setShowEditModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const isMobMenuOpen = Boolean(menuAnchorEl);
  
    const toggleMobMenu = (event) => {
      if (isMobMenuOpen) {
        setMenuAnchorEl(null);
      } else {
        setMenuAnchorEl(event.currentTarget);
      }
    };
  
    const toggleEditModal = () => {
      setShowEditModal(!showEditModal);
    };
  
    const onSave = useSaveComic();
    const handleSave = async () => {
      setIsSaving(true);
      await onSave();
      setIsSaving(false);
    };
  
    const previewLink = `${window.location.origin}/view/${shareToken}`;
    const handlePreview = () => {
      window.open(previewLink, "_blank", "noopener noreferrer");
    };

    return (
      <>
        <Navbar>
          <Stack
            direction="row"
            gap={2}
            ml="auto"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Button
                variant="soft"
                size="sm"
                onClick={handlePreview}
            >
                Preview
            </Button>
            <Button
                variant="outlined"
                endDecorator={<MdEdit />}
                size="sm"
                onClick={toggleEditModal}
            >
                Edit
            </Button>
            <Button
              variant="solid"
              startDecorator={<MdSave />}
              onClick={handleSave}
              loading={isSaving}
              disabled={isSaving}
            >
              Save
            </Button>
          </Stack>
        </Navbar>
        <NavModal open={showEditModal} onClose={toggleEditModal} />
        <Stack
          direction="row"
          mx={2}
          my={3}
          gap={2}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}
        >
          <Button
            variant="solid"
            onClick={handleSave}
            sx={{
              ml: "auto",
            }}
          >
            Save
          </Button>
          <IconButton
            color="primary"
            variant="outlined"
            aria-controls={isMobMenuOpen ? "mob-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMobMenuOpen ? "true" : undefined}
            onClick={toggleMobMenu}
          >
            <CgMenu />
          </IconButton>
        </Stack>
        <Menu
          id="mob-menu"
          anchorEl={menuAnchorEl}
          open={isMobMenuOpen}
          onClose={toggleMobMenu}
        >
          <MenuItem onClick={toggleEditModal}>Edit Comic Info</MenuItem>
          <MenuItem onClick={handlePreview}>Visit Preview</MenuItem>
        </Menu>
      </>
    );
  };
  
export default EditNavbar;
  