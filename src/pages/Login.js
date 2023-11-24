import { Stack, Typography, Box } from "@mui/joy";
import useSignIn from "../auth/useSignIn";
import { Navigate } from "react-router-dom";
import { useGetUser } from "../lib/utils";
import GoogleButton from "react-google-button";
import Loader from "../components/common/Loader";

const Login = () => {
  const handleSignin = useSignIn();
  const { user, authLoading } = useGetUser();

  if (authLoading) {
    return <Loader />;
  }

  if (Boolean(user)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack flexDirection="row" width="100vw" height="100vh">
      <Stack
        justifyContent="space-between"
        flexGrow={1}
        px={{
          xs: 4,
          md: 8,
        }}
        py={8}
      >
        <Box>
          <Typography level="h3">
            Welcome to Comic<span style={{ color: "#e75480" }}>X</span>
          </Typography>
          <Typography level="body-sm" mb={4} mt={2}>
            Log in and embark on a laugh-filled journey to unleash your inner
            comic genius! 🚀😄
          </Typography>
          <GoogleButton
            onClick={() => {
              handleSignin();
            }}
            style={{
              background: "#000",
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
