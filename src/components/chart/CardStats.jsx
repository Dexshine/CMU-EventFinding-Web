import React from "react";
import MainCard from "../MainCard";
import { CardContent, Typography, Box } from "@mui/material";

const CardStats = ({ label, value, icon }) => {
  return (
    <MainCard>
      <Box display="flex" alignItems="center">
        {icon && <Box mr={2}>{icon}</Box>}
        <CardContent>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography color="textSecondary">{label}</Typography>
        </CardContent>
      </Box>
    </MainCard>
  );
};

export default CardStats;
