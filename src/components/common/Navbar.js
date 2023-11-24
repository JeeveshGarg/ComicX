import {
  Avatar,
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import useLogout from "../../auth/useLogout";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/index";
import { MdOutlinePerson2 } from "react-icons/md";

const Navbar = ({ children }) => {
  const onLogout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  const isLoggedOut = !auth?.currentUser;
  const { displayName: username, photoURL: userImg } = auth?.currentUser ?? {};

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Stack
          direction="row"
          gap={3}
          px={3}
          py={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            level="title-lg"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Comic<span style={{ color: "#e75480" }}>X</span>
          </Typography>
          <Typography
            level="body-lg"
            sx={{ mr: "auto", cursor: "pointer" }}
            fontSize={{
              xs: "0.8rem",
              md: "1rem",
            }}
            fontWeight={600}
            onClick={() => navigate("/comics")}
          >
            Items
          </Typography>
          {children}
          {isLoggedOut ? (
            <Button
              variant="outlined"
              startDecorator={<MdOutlinePerson2 />}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          ) : (
            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral" } }}
                sx={{ borderRadius: "100%" }}
              >
                <Avatar src={userImg}>{username}</Avatar>
              </MenuButton>
              <Menu placement="bottom-end" variant="soft">
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Dropdown>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Navbar;
