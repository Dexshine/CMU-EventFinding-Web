import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  const image = "/assets/images/banner.jpeg";

  return (
    <Box
      sx={{
        position: "absolute",
        height: "460px",
        width: "100%",
        backgroundImage: `linear-gradient(to top, #e9e9e8, transparent), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "0% 100%",
        zIndex: -1,
      }}
    >
      <Container>
        <Typography variant="h2" color="white" fontWeight={600} pt={10}>
          ข่าวสารกิจกรรม
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
