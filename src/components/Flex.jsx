import { Box } from "@mui/material";
import React from "react";

const Flex = ({ children, ...other }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" {...other}>
      {children}
    </Box>
  );
};

export default Flex;
