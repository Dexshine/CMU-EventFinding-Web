import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const TagCard = ({ title, imageSrc }) => {
  return (
    <Card
      sx={{
        width: "200px",
      }}
    >
      <CardMedia
        component={"img"}
        src={imageSrc}
        sx={{
          height: "140px",
        }}
      />
      <CardContent>
        <Typography variant="body1">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TagCard;
