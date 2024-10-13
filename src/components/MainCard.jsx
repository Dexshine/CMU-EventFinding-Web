import { Card, CardContent, CardHeader, useTheme } from "@mui/material";
import React from "react";

const MainCard = ({ children, title }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MainCard;
