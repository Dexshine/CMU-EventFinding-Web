import * as React from "react";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CMU_OAUTH_URL } from "../../config/config-variable";
import { Google } from "@mui/icons-material";
// preview-start
const providers = [{ id: "google", name: "Google" }];

// preview-end

export default function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();

  // const signIn = async (provider) => {
  //   const promise = new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log(`Sign in with ${provider.id}`);
  //       login();
  //       resolve();
  //     }, 500);
  //   });
  //   return promise;
  // };

  const signIn = async () => {
    const promise = await new Promise((resolve) => {
      setTimeout(() => {
        login();

        resolve();
      }, 500);
    });

    toast.success("เข้าสู่ระบบเรียบร้อยแล้ว");

    // return promise;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: "400px",

          height: "100%",
          maxHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Typography textAlign="center" variant="h5">
            CMU | EVENT FINDING
          </Typography>
          <Button
            sx={{ width: "400px" }}
            variant="contained"
            onClick={() => (window.location.href = CMU_OAUTH_URL)}
          >
            CMU Login
          </Button>
          <Button
            sx={{ width: "400px" }}
            startIcon={<Google />}
            variant="outlined"
            onClick={signIn}
          >
            Google Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
